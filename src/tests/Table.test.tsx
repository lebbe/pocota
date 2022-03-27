import React, { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Table, Thead, Th, Tbody, Td, Tr } from '..'

function ThisIsAComponent(props: { test: string; rotated: boolean }) {
  const [iterator, setIterator] = useState(0)
  return (
    <>
      <button onClick={() => setIterator(iterator + 1)}>Iterate cell 3!</button>
      <Table rotate={props.rotated}>
        <Thead>
          <Tr>
            <Th>Test</Th>
            <Th>Test 2</Th>
            <Th>Test 3</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td data-testid="cell1">{props.test}</Td>
            <Td data-testid="cell2">Test cell 2</Td>
            <Td data-testid="cell3">{iterator}</Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  )
}

test('Test a simple render of pocota', async () => {
  render(<ThisIsAComponent rotated={false} test="Hello world!" />)

  expect(screen.getByTestId('cell1')).toHaveTextContent('Hello world!')
  expect(screen.getByTestId('cell2')).toHaveTextContent('Test cell 2')
})

test('Test a simple rotated of pocota', async () => {
  render(<ThisIsAComponent rotated={true} test="Hello world!" />)

  expect(screen.getByTestId('cell1')).toHaveTextContent('Hello world!')
  expect(screen.getByTestId('cell2')).toHaveTextContent('Test cell 2')
})

test('Test a rerender of rotated of pocota', async () => {
  render(<ThisIsAComponent rotated={true} test="Hello world!" />)

  expect(screen.getByTestId('cell1')).toHaveTextContent('Hello world!')
  expect(screen.getByTestId('cell2')).toHaveTextContent('Test cell 2')
  expect(screen.getByTestId('cell3')).toHaveTextContent('0')

  fireEvent.click(screen.getByText('Iterate cell 3!'))
  expect(screen.getByTestId('cell3')).toHaveTextContent('1')
  fireEvent.click(screen.getByText('Iterate cell 3!'))
  expect(screen.getByTestId('cell3')).toHaveTextContent('2')
})
