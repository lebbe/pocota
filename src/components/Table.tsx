import React, { ReactNode, useRef } from 'react'
import { AddSubscriber } from '../hooks/useSubscribeForRender'

type TableProps = React.DetailedHTMLProps<
  React.TableHTMLAttributes<HTMLTableElement>,
  HTMLTableElement
>

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

export const TableContext = React.createContext<TableContextType>({
  rotate: false,
  // @ts-expect-error cannot initialize with useRef outside of hooks/component
  janitor: undefined,
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
