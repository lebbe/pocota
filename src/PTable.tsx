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
  insideHead: boolean
  currentIndex: number
  // Used temporarily for each row
  frontElement?: ReactNode
  addFrontCellSubscriber?: AddSubscriber
  backElements: ReactNode[]
  addBackCellSubscribers: AddSubscriber[]
}

type TableContextType = {
  mobile: boolean
  janitor: React.MutableRefObject<PTableJanitor>
}

const TableContext = React.createContext<TableContextType>({
  mobile: false,
  // @ts-expect-error cannot initialize with useRef outside of hooks/component
  janitor: undefined,
})

export function Table({ mobile, ...props }: TableProps & { mobile: boolean }) {
  return (
    <TableContext.Provider
      value={{
        mobile,

        janitor: useRef<PTableJanitor>({
          currentIndex: 0,
          headers: [],
          insideHead: false,
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

  janitor.insideHead = true
  janitor.headers = []
  return <thead {...props} />
}

export function Tbody(props: TbodyProps) {
  const context = useContext(TableContext)
  const janitor = context.janitor.current
  const ref = useRef(null)
  janitor.insideHead = false

  return <tbody ref={ref} {...props} />
}

export function Tr(props: TrProps) {
  const context = useContext(TableContext)
  const janitor = context.janitor.current
  const [front, setFront] = useState<ReactNode>(null)
  const [back, setBack] = useState<ReactNode[]>([])
  const [inHead, setInHead] = useState(janitor.insideHead)

  useLayoutEffect(function () {
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

  if (context.mobile) {
    if (inHead) {
      // Not actually rendering anything, just gathering intel on heads
      return <tr>{props.children}</tr>
    }
    return (
      <tr {...props}>
        {front != null && <td>{front}</td>}
        <td>
          <table>
            <tbody>{props.children}</tbody>
          </table>
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

  useLayoutEffect(function () {
    janitor.headers.push({
      content: rest.children,
      frontPromoted: front,
      backPromoted: back,
    })
  }, [])

  if (context.mobile) {
    if (front) {
      return (
        <>
          <th>{rest.children}</th>
          <th>Details</th>
        </>
      )
    } else if (back) {
      return <th>{rest.children}</th>
    }

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

  if (context.mobile) {
    if (promoted) {
      return null
    }
    return (
      <tr>
        <td>{headerElement}</td>
        <td {...props} />
      </tr>
    )
  }

  return <td {...props} />
}
