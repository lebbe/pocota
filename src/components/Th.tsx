import React, { useContext, useLayoutEffect } from 'react'

import { useSubscribeForRender } from '../hooks/useSubscribeForRender'
import { TableContext } from './Table'

type ThProps = React.DetailedHTMLProps<
  React.ThHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>

function ThRotated({
  front,
  back,
  ...props
}: ThProps & { front?: boolean; back?: boolean }) {
  const context = useContext(TableContext)
  const janitor = context.janitor.current
  const addSubscriber = useSubscribeForRender(props.children)

  useLayoutEffect(function () {
    janitor.headers.push({
      content: props.children,
      frontPromoted: front,
      backPromoted: back,
      addSubscriber: addSubscriber,
    })

    return function () {
      janitor.headers = []
    }
  }, [])

  return null
}

export function Th({
  front,
  back,
  ...props
}: ThProps & { front?: boolean; back?: boolean }) {
  const context = useContext(TableContext)
  if (context.rotate) return <ThRotated front={front} back={back} {...props} />
  return <th {...props} />
}
