import React, { ReactNode, useContext, useLayoutEffect, useState } from 'react'
import { Header, TableContext } from './Table'
import { ThProps, ThRotatedProps } from './Th'

export type TheadProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>

type HeaderContextType = {
  insideHeader: boolean
}

export const HeaderContext = React.createContext<HeaderContextType>({
  insideHeader: false,
})

function TheadRotated(props: TheadProps) {
  const context = useContext(TableContext)
  const janitor = context.janitor.current
  const [headers, setHeaders] = useState<Header[]>([])

  useLayoutEffect(function () {
    setHeaders(janitor.headers)
    for (let i = 0; i < janitor.headers.length; i++) {
      janitor.headers[i].addSubscriber(function (thProps: ThProps) {
        setHeaders(function (oldHeaders) {
          const newHeaders = [...oldHeaders]
          newHeaders[i].props = thProps
          return newHeaders
        })
      })
    }

    return function () {
      setHeaders([])
    }
  }, [])

  const frontHead = headers.find((a) => a.frontPromoted)

  return (
    <>
      <HeaderContext.Provider value={{ insideHeader: true }}>
        {props.children}
      </HeaderContext.Provider>
      <thead>
        <tr>
          {frontHead && <th {...frontHead.props} />}
          <th>{context.detailsTitle}</th>
          {headers
            .filter((a) => a.backPromoted)
            .map((a, i) => (
              <th key={i} {...a.props} />
            ))}
        </tr>
      </thead>
    </>
  )
}

export function Thead(props: TheadProps) {
  const context = useContext(TableContext)
  if (context.rotate) return <TheadRotated {...props} />

  return <thead {...props} />
}
