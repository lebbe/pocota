import { Header } from './PTable'

/**
 * We need to maintain information across the currently rendered table.
 * I initially tried to use context, but since we are both updating and
 * reading during the render, across tags/components, this failed hard due
 * to rerender.
 *
 * Basically, I need to keep a record on all the table heads and column data.
 * The ptable janitor
 */

export type PTableJanitor = {
  headers: Header[]
  insideHead: boolean
  currentIndex: number
}

declare global {
  var PTABLE_JANITORS: any
}

window.PTABLE_JANITORS = window.PTABLE_JANITORS || {}

export function getPTableJanitor(ptableId: number): PTableJanitor {
  const ptableFields = window.PTABLE_JANITORS

  if (ptableFields['janitor' + ptableId] === undefined) {
    ptableFields['janitor' + ptableId] = {
      headers: [],
      insideHead: false,
      currentIndex: -1,
    }
  }

  return ptableFields['janitor' + ptableId]
}
