import { ReactNode, useEffect, useState } from 'react'
import { TdProps } from '../components/Td'
import { ThProps } from '../components/Th'

export type Subscriber = (props: ThProps | TdProps) => void
export type AddSubscriber = (subscriber: Subscriber) => void

/**
 * This hook was necessary because I wanted to render the TD directly inside
 * TR for promoted TDs (so the TD component in itself would just return null,
 * and the TR outputs the TD props.children).
 *
 * The issue, was that nothing would rerender when the content of the TD
 * changed. By letting the TR subscribe for rerenders (by simply udpating
 * its state for the promoted cells), I could sew it all together again.
 *
 */
export function useSubscribeForRender(props: ThProps | TdProps): AddSubscriber {
  const [subscriber, setSubscriber] = useState<Subscriber>(
    () => (_element: ReactNode) => {}
  )

  useEffect(
    function () {
      subscriber(props)
    },
    [props, subscriber]
  )

  function addSubscriber(fn: Subscriber) {
    setSubscriber(() => fn)
  }

  return addSubscriber
}
