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
  frontElement?: ReactNode
  backElements: ReactNode[]
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
  const [front, setFront] = useState<ReactNode>([])
  const [back, setBack] = useState<ReactNode[]>([])
  const [inHead, setInHead] = useState(janitor.insideHead)

  useLayoutEffect(function () {
    const janitor = context.janitor.current
    setFront(janitor.frontElement)
    setBack(janitor.backElements)
    janitor.frontElement = null
    janitor.backElements = []
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
    }
    if (back) {
      return <th>{rest.children}</th>
    }
  }

  return !context.mobile ? <th {...rest} /> : null
}
export function Td(props: TdProps) {
  const context = useContext(TableContext)
  const [headerElement, setHeaderElement] = useState<ReactNode>(null)
  const [promoted, setPromoted] = useState(false)

  useLayoutEffect(function () {
    const janitor = context.janitor.current
    const header = janitor.headers[janitor.currentIndex++]
    setHeaderElement(header.content)

    if (header.backPromoted) {
      janitor.backElements.push(props.children)
      setPromoted(true)
    }

    if (header.frontPromoted) {
      if (janitor.frontElement !== null) {
        throw 'You can only promote one column to the front.'
      }
      janitor.frontElement = props.children
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
