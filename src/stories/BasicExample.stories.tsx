import React, { useState } from 'react'
import { Table, Tbody, Td, Th, Thead, Tr, Tfoot } from '../'
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

function PromotedBackHelper({ rotated }: { rotated: boolean }) {
  const transactions: {
    date: string
    merchant: string
    category: string
    accountType: string
    amount: number
    id: number
  }[] = [
    {
      date: '02.01-2020',
      merchant: 'Taxi',
      category: 'Auto/transport',
      accountType: 'Checking',
      amount: -5.4,
      id: 1,
    },
    {
      date: '02.01-2020',
      merchant: 'Adatum Fitness',
      category: 'Fitness',
      accountType: 'Credit Card',
      amount: -53.7,
      id: 2,
    },
    {
      date: '03.01-2020',
      merchant: 'Fourth Coffee',
      category: 'Restaurant/Dining',
      accountType: 'Checking',
      amount: -1.9,
      id: 3,
    },
    {
      date: '03.01-2020',
      merchant: 'Taxi',
      category: 'Auto/Transport',
      accountType: 'Checking',
      amount: -6.8,
      id: 4,
    },
    {
      date: '06.01-2020',
      merchant: 'Telltale Toys',
      category: 'Shopping',
      accountType: 'Checking',
      amount: -29.9,
      id: 5,
    },
    {
      date: '06.01-2020',
      merchant: 'Airline',
      category: 'Travel',
      accountType: 'Credit Card',
      amount: -324,
      id: 6,
    },
  ]

  return (
    <Table rotate={rotated} detailsTitle="Payments">
      <caption>List of payments made this month</caption>
      <Thead>
        <Tr>
          <Th>Date</Th>
          <Th>Merchant</Th>
          <Th>Category</Th>
          <Th>Account type</Th>
          <Th back>Amount</Th>
        </Tr>
      </Thead>
      <Tbody>
        {transactions.map((transaction) => (
          <Tr key={transaction.id}>
            <Td>{transaction.date}</Td>
            <Td>{transaction.merchant}</Td>
            <Td>{transaction.category}</Td>
            <Td>{transaction.accountType}</Td>
            <Td
              style={{
                textAlign: 'right',
                verticalAlign: 'bottom',
                paddingBottom: rotated ? '16px' : 'initial',
              }}
            >
              {transaction.amount}
            </Td>
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Td colSpan={4} noHeader>
            <b>Sum</b>
          </Td>
          <Td
            style={{
              textAlign: 'right',
            }}
          >
            <b>{transactions.map((t) => t.amount).reduce((a, b) => a + b)}</b>
          </Td>
        </Tr>
      </Tfoot>
    </Table>
  )
}

export function PromotedBack() {
  return (
    <>
      <p style={{ maxWidth: 600 }}>
        Here we see the same table rendered for desktop and mobile. The last
        column is promoted to the back, which means that on mobile it will still
        be shown as an ordinary column. This way, we can give the table some
        extra focus on perhaps the most important figure in the data, the
        amount, and the sum at the bottom.
      </p>

      <p style={{ maxWidth: 600 }}>
        There is three special attributes used to get the mobile version of this
        table perfect: <code>detailsTitle</code> used on the Table-tag,{' '}
        <code>back</code>, used in the table header and <code>noHeader</code>,
        used in the last row, for the sum. See example code at the bottom.
      </p>
      <h3>Desktop render</h3>
      <PromotedBackHelper rotated={false} />
      <h3>Mobile render</h3>
      <PromotedBackHelper rotated={true} />
      <pre>
        <code>
          {`
<Table rotate={rotate} `}
          <span style={{ color: 'red' }}>detailsTitle</span>=
          <span style={{ color: 'green' }}>"Payments"</span>
          {`>
  <caption>List of payments made this month</caption>
  <Thead>
    <Tr>
      <Th>Date</Th>
      <Th>Merchant</Th>
      <Th>Category</Th>
      <Th>Account type</Th>
      <Th`}{' '}
          <span style={{ color: 'red' }}>back</span>
          {`>Amount</Th>
    </Tr>
  </Thead>
  <Tbody>
    {transactions.map((transaction) => (
      <Tr key={transaction.id}>
        <Td>{transaction.date}</Td>
        <Td>{transaction.merchant}</Td>
        <Td>{transaction.category}</Td>
        <Td>{transaction.accountType}</Td>
        <Td>{transaction.amount}</Td>
      </Tr>
    ))}
  </Tbody>
  <Tfoot>
    <Tr>
      <Td colSpan={4} `}
          <span style={{ color: 'red' }}>noHeader</span>
          {`>
        <b>Sum</b>
      </Td>
      <Td>
        <b>{SUM}</b>
      </Td>
    </Tr>
  </Tfoot>
</Table>`}
        </code>
      </pre>

      <p>
        <b>
          <code>detailsTitle</code>
        </b>{' '}
        is the column header for the roated ("summary") column.
      </p>

      <p>
        <b>
          <code>back</code>
        </b>{' '}
        promotes the column so it has its own column when table is rotated.
      </p>

      <p>
        <b>
          <code>noHeader</code>
        </b>{' '}
        removes the header from the summary cell, because sometimes - like here
        - the cell is used for something else than the table column.
      </p>
    </>
  )
}
