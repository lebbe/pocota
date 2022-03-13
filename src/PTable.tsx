import React, {
  useContext,
  useRef,
  ReactNode,
  useLayoutEffect,
  useState,
} from 'react'

import {
  TableProps,
  TbodyProps,
  TdProps,
  TheadProps,
  ThProps,
  TrProps,
} from './Ptable.dt'
import { AddSubscriber, useSubscribeForRender } from './useSubscribeForRender'

export type Header = {
  content: ReactNode
  frontPromoted?: boolean
  backPromoted?: boolean
  addSubscriber: AddSubscriber
}

/**
 * We need to maintain information across the currently rendered table.
 * I initially tried to use context, but since we are both updating and
 * reading during the render, across tags/components, this failed hard due
 * to rerender.
 *
 * Basically, I need to keep a record on all the table heads and column data,
 * without triggering a rerender. And I guess a ref does this.
 */
export type PTableJanitor = {
  headers: Header[]
  currentIndex: number
  // Used temporarily for each row
  frontElement?: ReactNode
  addFrontCellSubscriber?: AddSubscriber
  backElements: ReactNode[]
  addBackCellSubscribers: AddSubscriber[]
}

type TableContextType = {
  rotate: boolean
  janitor: React.MutableRefObject<PTableJanitor>
}

const TableContext = React.createContext<TableContextType>({
  rotate: false,
  // @ts-expect-error cannot initialize with useRef outside of hooks/component
  janitor: undefined,
})

type HeaderContextType = {
  insideHeader: boolean
}

const HeaderContext = React.createContext<HeaderContextType>({
  insideHeader: false,
})

export function Table({ rotate, ...props }: TableProps & { rotate: boolean }) {
  return (
    <TableContext.Provider
      value={{
        rotate,

        janitor: useRef<PTableJanitor>({
          currentIndex: 0,
          headers: [],
          frontElement: null,
          backElements: [],
          addFrontCellSubscriber: undefined,
          addBackCellSubscribers: [],
        }),
      }}
    >
      <table {...props} />
    </TableContext.Provider>
  )
}

export function Thead(props: TheadProps) {
  const context = useContext(TableContext)
  const janitor = context.janitor.current
  const [headers, setHeaders] = useState<Header[]>([])

  janitor.headers = []
  useLayoutEffect(function () {
    if (!context.rotate) return

    setHeaders(janitor.headers)
    for (let i = 0; i < janitor.headers.length; i++) {
      janitor.headers[i].addSubscriber(function (th: ReactNode) {
        setHeaders(function (oldHeaders) {
          const newHeaders = [...oldHeaders]
          newHeaders[i].content = th
          return newHeaders
        })
      })
    }
  }, [])

  if (context.rotate) {
    const frontHead = headers.find((a) => a.frontPromoted)
    return (
      <>
        <HeaderContext.Provider value={{ insideHeader: true }}>
          {props.children}
        </HeaderContext.Provider>
        <thead>
          <tr>
            {frontHead && <th>{frontHead.content}</th>}
            <th>Details</th>
            {headers
              .filter((a) => a.backPromoted)
              .map((a, i) => (
                <th key={i}>{a.content}</th>
              ))}
          </tr>
        </thead>
      </>
    )
  }
  return <thead {...props} />
}

export function Tbody(props: TbodyProps) {
  return <tbody {...props} />
}

export function Tr(props: TrProps) {
  const context = useContext(TableContext)
  const inHead = useContext(HeaderContext).insideHeader
  const [front, setFront] = useState<ReactNode>(null)
  const [back, setBack] = useState<ReactNode[]>([])

  useLayoutEffect(function () {
    if (!context.rotate) return

    const janitor = context.janitor.current
    if (janitor.addFrontCellSubscriber) {
      setFront(janitor.frontElement)

      janitor.addFrontCellSubscriber(function (front: ReactNode) {
        setFront(front)
      })
    }

    if (janitor.backElements.length > 0) {
      setBack(janitor.backElements)
      for (let i = 0; i < janitor.backElements.length; i++) {
        janitor.addBackCellSubscribers[i](function (td: ReactNode) {
          setBack(function (oldBack) {
            const newBack = [...oldBack]
            newBack[i] = td
            return newBack
          })
        })
      }
    }

    janitor.frontElement = null
    janitor.backElements = []
    janitor.addFrontCellSubscriber = undefined
    janitor.addBackCellSubscribers = []
  }, [])

  if (context.rotate) {
    if (inHead) {
      // Not actually rendering anything, just gathering intel on heads
      return <>{props.children}</>
    }
    return (
      <tr {...props}>
        {front != null && <td>{front}</td>}
        <td>
          <dl>{props.children}</dl>
        </td>
        {back.map((content, i) => (
          <td key={i}>{content}</td>
        ))}
      </tr>
    )
  }
  return <tr {...props} />
}

export function Th({
  front,
  back,
  ...rest
}: ThProps & { front?: boolean; back?: boolean }) {
  const context = useContext(TableContext)
  const janitor = context.janitor.current
  const addSubscriber = useSubscribeForRender(rest.children)
  useLayoutEffect(function () {
    if (!context.rotate) return
    janitor.headers.push({
      content: rest.children,
      frontPromoted: front,
      backPromoted: back,
      addSubscriber: addSubscriber,
    })
  }, [])

  if (context.rotate) {
    return null
  }

  return <th {...rest} />
}

export function Td(props: TdProps) {
  const context = useContext(TableContext)
  const [headerElement, setHeaderElement] = useState<ReactNode>(null)
  const [promoted, setPromoted] = useState(false)

  const addSubscriber = useSubscribeForRender(props.children)

  useLayoutEffect(function () {
    if (!context.rotate) return
    const janitor = context.janitor.current
    const header = janitor.headers[janitor.currentIndex++]
    setHeaderElement(header.content)

    if (header.backPromoted) {
      if (header.frontPromoted) {
        throw 'A column can only be in the front or in the back, not both.'
      }

      setPromoted(true)
      janitor.addBackCellSubscribers.push(addSubscriber)
      janitor.backElements.push(props.children)
    }

    if (header.frontPromoted) {
      if (janitor.frontElement !== null) {
        throw 'You can only promote one column to the front.'
      }
      janitor.frontElement = props.children
      janitor.addFrontCellSubscriber = addSubscriber
      setPromoted(true)
    }

    if (janitor.currentIndex === janitor.headers.length) {
      janitor.currentIndex = 0
    }
  }, [])

  if (context.rotate) {
    if (promoted) {
      return null
    }
    return (
      <div>
        <dt>{headerElement}</dt>
        <dd {...props} />
      </div>
    )
  }

  return <td {...props} />
}
