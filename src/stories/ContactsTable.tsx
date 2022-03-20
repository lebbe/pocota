import { useState } from 'react'
import { Table, Tbody, Td, Th, Thead, Tr } from '../'

import './table.css'

export function ContactsTable({ mobile }: { mobile: boolean }) {
  const [selected, setSelected] = useState([!1, !1, !1, !1, !1, !1])

  const className = mobile ? 'rotated' : 'ordinary'

  return (
    <Table className={className} rotate={mobile}>
      <Thead>
        <Tr>
          <Th back>
            <input
              type="checkbox"
              checked={!selected.some((a) => !a)}
              onChange={(e) => {
                const isChecked = e.target.checked
                const newSelected = new Array(selected.length).fill(isChecked)
                setSelected(newSelected)
              }}
            />
          </Th>
          <Th>Name</Th>
          <Th>Surname</Th>
          <Th>Phone number</Th>
          <Th>E-mail</Th>
          <Th>Tags</Th>
          <Th front>Edit</Th>
        </Tr>
      </Thead>
      <Tbody>
        {selected.map((e, a) => (
          <Tr key={a}>
            <Td>
              <input
                type="checkbox"
                checked={selected[a]}
                onChange={(e) => {
                  const isChecked = e.target.checked
                  const newSelected = [...selected]
                  newSelected[a] = isChecked
                  setSelected(newSelected)
                }}
              />
            </Td>
            <Td>Wan</Td>
            <Td>Gengsin</Td>
            <Td>834-434-3534</Td>
            <Td>wan.gengsin@gmail.com</Td>
            <Td>
              <span>Friend</span>
            </Td>
            <Td>
              <span className="icon">✏️</span>
              <span className="icon">🗑️</span>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
