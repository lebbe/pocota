import React, { useContext, useRef, ReactNode } from 'react'

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
}

type TableContextType = {
  mobile: boolean
  numberOfHeads: number
  janitor: React.MutableRefObject<PTableJanitor>
}

const TableContext = React.createContext<TableContextType>({
  mobile: false,
  numberOfHeads: 0,
  // @ts-expect-error cannot initialize with useRef outside of hooks/component
  janitor: undefined,
})

export function Table(props: TableProps & { mobile: boolean }) {
  const { mobile, ...rest } = props

  return (
    <TableContext.Provider
      value={{
        mobile,
        numberOfHeads: 0,
        janitor: useRef<PTableJanitor>({
          currentIndex: -1,
          headers: [],
          insideHead: false,
        }),
      }}
    >
      <table {...rest} />
    </TableContext.Provider>
  )
}

export function Thead(props: TheadProps) {
  const context = useContext(TableContext)
  const janitor = context.janitor.current

  janitor.insideHead = true
  return <thead {...props} />
}

export function Th(props: ThProps) {
  const context = useContext(TableContext)
  const janitor = context.janitor.current

  janitor.headers.push({
    content: props.children,
  })

  return !context.mobile ? <th {...props} /> : null
}

export function Tbody(props: TbodyProps) {
  const context = useContext(TableContext)
  const janitor = context.janitor.current
  const ref = useRef(null)
  context.numberOfHeads = janitor.headers.length
  janitor.insideHead = false

  if (context.mobile) {
    return <>{props.children}</>
  }
  return <tbody ref={ref} {...props} />
}

export function Tr(props: TrProps) {
  const context = useContext(TableContext)
  const janitor = context.janitor.current

  janitor.currentIndex = 0

  if (context.mobile) {
    if (janitor.insideHead) {
      // Not actually rendering anything, just gathering intel on heads
      return <>{props.children}</>
    }
    return <tbody>{props.children}</tbody>
  }
  return <tr {...props} />
}

export function Td(props: TdProps) {
  const context = useContext(TableContext)
  const janitor = context.janitor.current
  const currentIndex = janitor.currentIndex++
  const { content } = janitor.headers[currentIndex]

  if (context.mobile) {
    return (
      <tr>
        <td>{content}</td>
        <td {...props} />
      </tr>
    )
  }

  return <td {...props} />
}
