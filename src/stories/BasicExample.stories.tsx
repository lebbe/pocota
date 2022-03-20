import React, { useState } from 'react'
import { Table, Tbody, Td, Th, Thead, Tr } from '../'
import { ContactsTable } from './ContactsTable'

export default {
  title: 'Examples/Basics',
}

import './table.css'

export function SimpleTableExample() {
  return (
    <>
      <h2>Desktop version</h2>
      <ContactsTable mobile={false} />
      <h2>Rotated version</h2>
      <ContactsTable mobile={true} />
      <h3>Code</h3>
      <pre>
        {`<Table className={className} rotate={mobile}>
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
    </Table>`}
      </pre>
    </>
  )
}

export function ToggledExample() {
  const [rotate, setRotate] = useState(false)
  const [rowsQuantity, setRowsQuantity] = useState(10)
  const [frontRow, setFrontRow] = useState('7')
  const rows = new Array(rowsQuantity).fill(true)

  return (
    <>
      <button onClick={() => setRotate(!rotate)}>Toggle</button>
      <input
        type="number"
        value={rowsQuantity}
        max="5000"
        min="1"
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          setRowsQuantity(parseInt(e.target.value, 10))
        }
      ></input>
      <select
        value={frontRow}
        onInput={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setFrontRow(e.target.value)
        }
      >
        <option value="">Choose front column</option>
        <option value="1">Front promote column 1</option>
        <option value="2">Front promote column 2</option>
        <option value="3">Front promote column 3</option>
        <option value="4">Front promote column 4</option>
        <option value="5">Front promote column 5</option>
        <option value="6">Front promote column 6</option>
        <option value="7">Front promote column 7</option>
        <option value="8">Front promote column 8</option>
      </select>
      <Table rotate={rotate}>
        <Thead>
          <Tr>
            <Th front={frontRow === '1'}>Head 1</Th>
            <Th front={frontRow === '2'}>Head 2</Th>
            <Th front={frontRow === '3'}>Head 3</Th>
            <Th front={frontRow === '4'}>Head 4</Th>
            <Th front={frontRow === '5'}>Head 5</Th>
            <Th front={frontRow === '6'}>Head 6</Th>
            <Th front={frontRow === '7'}>Head 7</Th>
            <Th front={frontRow === '8'}>Head 8</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((_, i) => (
            <Tr key={i}>
              <Td>Cell 1, row {i + 1}</Td>
              <Td>Cell 2</Td>
              <Td>Cell 3</Td>
              <Td>Cell 4</Td>
              <Td>Cell 5</Td>
              <Td>Cell 6</Td>
              <Td>Cell 7</Td>
              <Td>Cell 8</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  )
}
