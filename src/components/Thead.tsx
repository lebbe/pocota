import React, { ReactNode, useContext, useLayoutEffect, useState } from 'react'
import { Header, TableContext } from './Table'

type TheadProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>

type HeaderContextType = {
  insideHeader: boolean
}

export const HeaderContext = React.createContext<HeaderContextType>({
  insideHeader: false,
})

export function Thead(props: TheadProps) {
  const context = useContext(TableContext)
  if (!context.rotate) return <thead {...props} />
  const janitor = context.janitor.current
  const [headers, setHeaders] = useState<Header[]>([])

  useLayoutEffect(function () {
    setHeaders(janitor.headers)
    for (let i = 0; i < janitor.headers.length; i++) {
      janitor.headers[i].addSubscriber(function (th: ReactNode) {
        setHeaders(function (oldHeaders) {
          const newHeaders = [...oldHeaders]
          newHeaders[i].content = th
          return newHeaders
        })
      })
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
          {frontHead && <th>{frontHead.content}</th>}
          <th>Details</th>
          {headers
            .filter((a) => a.backPromoted)
            .map((a, i) => (
              <th key={i}>{a.content}</th>
            ))}
        </tr>
      </thead>
    </>
  )
}
