import React, { useContext, useLayoutEffect, useState } from 'react'

import { useSubscribeForRender } from '../hooks/useSubscribeForRender'
import { TableContext } from './Table'
import { ThProps } from './Th'

export type TdProps = Omit<
  React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >,
  'rowSpan'
> & { noHeader?: boolean }

function TdRotated({ noHeader, colSpan, ...props }: TdProps) {
  const context = useContext(TableContext)
  const [headerElement, setHeaderElement] = useState<ThProps>({})
  const [promoted, setPromoted] = useState(false)

  const addSubscriber = useSubscribeForRender(props)

  useLayoutEffect(function () {
    const janitor = context.janitor.current
    const header = janitor.headers[janitor.currentIndex++]
    setHeaderElement(header.props)

    if (colSpan && colSpan > 1) {
      janitor.currentIndex = janitor.currentIndex + colSpan - 1
    }

    if (header.backPromoted) {
      if (header.frontPromoted) {
        throw 'A column can only be in the front or in the back, not both.'
      }

      setPromoted(true)
      janitor.addBackCellSubscribers.push(addSubscriber)
      janitor.backElements.push(props)
    }

    if (header.frontPromoted) {
      /*
      TODO this sanity check should be put back into place again...
      if (
        janitor.frontElement !== {} &&
        janitor.frontElement !== props.children
      ) {
        throw 'You can only promote one column to the front.'
      }*/
      janitor.frontElement = props
      janitor.addFrontCellSubscriber = addSubscriber
      setPromoted(true)
    }

    if (janitor.currentIndex === janitor.headers.length) {
      janitor.currentIndex = 0
    }
  }, [])

  if (promoted) {
    return null
  }
  if (noHeader) {
    return <div {...props} />
  }
  return (
    <div>
      <dt {...headerElement}></dt>
      <dd {...props} />
    </div>
  )
}

export function Td(props: TdProps) {
  const context = useContext(TableContext)
  if (context.rotate) return <TdRotated {...props} />
  return <td {...props} />
}
