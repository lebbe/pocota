import React, { useContext, useLayoutEffect } from 'react'

import { useSubscribeForRender } from '../hooks/useSubscribeForRender'
import { TableContext } from './Table'

export type ThProps = React.DetailedHTMLProps<
  React.ThHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>

export type ThRotatedProps = ThProps & { front?: boolean; back?: boolean }

function ThRotated({ front, back, ...props }: ThRotatedProps) {
  const context = useContext(TableContext)
  const janitor = context.janitor.current
  const addSubscriber = useSubscribeForRender(props)

  useLayoutEffect(function () {
    janitor.headers.push({
      props,
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

export function Th({ front, back, ...props }: ThRotatedProps) {
  const context = useContext(TableContext)
  if (context.rotate) return <ThRotated front={front} back={back} {...props} />
  return <th {...props} />
}
