import React from 'react'

type TbodyProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>

export function Tbody(props: TbodyProps) {
  return <tbody {...props} />
}
