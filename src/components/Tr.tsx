import React, { ReactNode, useContext, useLayoutEffect, useState } from 'react'

import { TableContext } from './Table'
import { HeaderContext } from './Thead'

type TrProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
>

export function Tr(props: TrProps) {
  const context = useContext(TableContext)
  if (!context.rotate) return <tr {...props} />
  const inHead = useContext(HeaderContext).insideHeader
  const [front, setFront] = useState<ReactNode>(null)
  const [back, setBack] = useState<ReactNode[]>([])

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

  if (context.rotate) {
    if (inHead) {
      // Not actually rendering anything, just gathering intel on heads
      return <>{props.children}</>
    }
    return (
      <tr {...props}>
        {front != null && <td>{front}</td>}
        <td>
          <dl>{props.children}</dl>
        </td>
        {back.map((content, i) => (
          <td key={i}>{content}</td>
        ))}
      </tr>
    )
  }
  return <tr {...props} />
}
