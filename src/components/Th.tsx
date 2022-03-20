import React, { useContext, useLayoutEffect } from 'react'

import { useSubscribeForRender } from '../useSubscribeForRender'
import { TableContext } from './Table'

type ThProps = React.DetailedHTMLProps<
  React.ThHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>

export function Th({
  front,
  back,
  ...rest
}: ThProps & { front?: boolean; back?: boolean }) {
  const context = useContext(TableContext)
  if (!context.rotate) return <th {...rest} />

  const janitor = context.janitor.current
  const addSubscriber = useSubscribeForRender(rest.children)
  useLayoutEffect(function () {
    janitor.headers.push({
      content: rest.children,
      frontPromoted: front,
      backPromoted: back,
      addSubscriber: addSubscriber,
    })
  }, [])

  return null
}
