import React, { ReactNode, useContext, useLayoutEffect, useState } from 'react'

import { TableContext } from './Table'
import { TdProps } from './Td'
import { HeaderContext } from './Thead'

type TrProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
>

function TrRotated(props: TrProps) {
  const context = useContext(TableContext)
  const inHead = useContext(HeaderContext).insideHeader
  const [front, setFront] = useState<TdProps | undefined>(undefined)
  const [back, setBack] = useState<TdProps[]>([])

  useLayoutEffect(function () {
    const janitor = context.janitor.current
    if (janitor.addFrontCellSubscriber) {
      setFront(janitor.frontElement)

      janitor.addFrontCellSubscriber(function (front: TdProps) {
        setFront(front)
      })
    }

    if (janitor.backElements.length > 0) {
      setBack(janitor.backElements)
      for (let i = 0; i < janitor.backElements.length; i++) {
        janitor.addBackCellSubscribers[i](function (td: TdProps) {
          setBack(function (oldBack) {
            const newBack = [...oldBack]
            newBack[i] = td
            return newBack
          })
        })
      }
    }

    janitor.frontElement = {}
    janitor.backElements = []
    janitor.addFrontCellSubscriber = undefined
    janitor.addBackCellSubscribers = []
  }, [])

  if (inHead) {
    // Not actually rendering anything, just gathering intel on heads
    return <>{props.children}</>
  }
  return (
    <tr {...props}>
      {front != null && <td {...front}></td>}
      <td>
        <dl>{props.children}</dl>
      </td>
      {back.map((props, i) => (
        <td key={i} {...props}></td>
      ))}
    </tr>
  )
}

export function Tr(props: TrProps) {
  const context = useContext(TableContext)
  if (context.rotate) return <TrRotated {...props} />
  return <tr {...props} />
}
