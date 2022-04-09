import React from 'react'

type TbodyProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>

export function Tfoot(props: TbodyProps) {
  return <tfoot {...props} />
}
