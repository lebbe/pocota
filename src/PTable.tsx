import React, { useContext, useRef, ReactNode } from 'react'
import { getPTableJanitor } from './janitor'

import {
  TableProps,
  TbodyProps,
  TdProps,
  TheadProps,
  ThProps,
  TrProps,
} from './Ptable.dt'
import { useComponentId } from './utilHooks'

export type Header = {
  content: ReactNode
}

type TableContextType = {
  mobile: boolean
  tableId: number
  numberOfHeads: number
}

const TableContext = React.createContext<TableContextType>({
  mobile: false,
  tableId: -1,
  numberOfHeads: 0,
})

export function Table(props: TableProps & { mobile: boolean }) {
  const { mobile, ...rest } = props
  const tableId = useComponentId()

  return (
    <TableContext.Provider
      value={{
        mobile,
        tableId,
        numberOfHeads: 0,
      }}
    >
      <table {...rest} />
    </TableContext.Provider>
  )
}

export function Thead(props: TheadProps) {
  const context = useContext(TableContext)
  const janitor = getPTableJanitor(context.tableId)

  janitor.insideHead = true
  return <thead {...props} />
}

export function Th(props: ThProps) {
  const context = useContext(TableContext)
  const janitor = getPTableJanitor(context.tableId)

  janitor.headers.push({
    content: props.children,
  })

  return !context.mobile ? <th {...props} /> : null
}

export function Tbody(props: TbodyProps) {
  const context = useContext(TableContext)
  const janitor = getPTableJanitor(context.tableId)
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
  const janitor = getPTableJanitor(context.tableId)

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
  const janitor = getPTableJanitor(context.tableId)
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
