import React, { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Table, Thead, Th, Tbody, Td, Tr } from '..'

function ThisIsAComponent(props: { test: string }) {
  const [iterator, setIterator] = useState(0)
  const [rotated, setRotated] = useState(false)
  return (
    <>
      <button onClick={() => setIterator(iterator + 1)}>Iterate cell 3!</button>
      <button onClick={() => setRotated(true)}>Rotate table</button>
      <button onClick={() => setRotated(true)}>Normalize table</button>
      <Table rotate={rotated}>
        <Thead>
          <Tr>
            <Th front>{iterator}</Th>
            <Th>{iterator}</Th>
            <Th>{iterator}</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td data-testid="cell1">{props.test}</Td>
            <Td data-testid="cell2">Test cell 2</Td>
            <Td data-testid="cell3">{iterator} cell3</Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  )
}

test('Test that content cell updates in both rotated and non-rotated modus', async () => {
  render(<ThisIsAComponent test="Hello world!" />)
  const ITERATE_CELL = 'Iterate cell 3!'
  const ROTATE = 'Rotate table'
  const UNROTATE = 'Normalize table'

  expect(screen.getByTestId('cell3')).toHaveTextContent('0')

  fireEvent.click(screen.getByText(ITERATE_CELL))

  expect(screen.getByTestId('cell3')).toHaveTextContent('1')

  fireEvent.click(screen.getByText(ROTATE))

  expect(screen.getByTestId('cell3')).toHaveTextContent('1')

  fireEvent.click(screen.getByText(ITERATE_CELL))
  fireEvent.click(screen.getByText(ITERATE_CELL))

  expect(screen.getByTestId('cell3')).toHaveTextContent('3')

  fireEvent.click(screen.getByText(UNROTATE))

  expect(screen.getByTestId('cell3')).toHaveTextContent('3')
})
