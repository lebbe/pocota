import React, { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Table, Thead, Th, Tbody, Td, Tr } from '..'

function ThisIsAComponent() {
  const [iterator, setIterator] = useState(0)
  const [rotate, setRotate] = useState(true)
  return (
    <>
      <button onClick={() => setIterator(iterator + 1)}>Iterate</button>
      <button onClick={() => setRotate(!rotate)}>Rotate</button>
      <Table rotate={rotate}>
        <Thead>
          <Tr>
            <Th data-testid="header1" front>
              Head 1 {iterator}
            </Th>
            <Th data-testid="header2">Head 2 {iterator}</Th>
            <Th data-testid="header3" back>
              Head 3 {iterator}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td data-testid="cell1">Cell 1 {iterator}</Td>
            <Td data-testid="cell2">Cell 2 {iterator}</Td>
            <Td data-testid="cell3">Cell 3 {iterator}</Td>
          </Tr>
          <Tr>
            <Td data-testid="cell4">Cell 4 {iterator}</Td>
            <Td data-testid="cell5">Cell 5 {iterator}</Td>
            <Td data-testid="cell6">Cell 6 {iterator}</Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  )
}

test('Test that cell content in rotated table is updated', async () => {
  render(<ThisIsAComponent />)

  const rotate = () => fireEvent.click(screen.getByText('Rotate'))
  const iterate = () => fireEvent.click(screen.getByText('Iterate'))

  let iter = 0
  expect(screen.getByTestId('header1')).toHaveTextContent('Head 1 ' + iter)
  expect(screen.getByTestId('header3')).toHaveTextContent('Head 3 ' + iter)

  expect(screen.getByTestId('cell1')).toHaveTextContent('Cell 1 ' + iter)
  expect(screen.getByTestId('cell2')).toHaveTextContent('Cell 2 ' + iter)
  expect(screen.getByTestId('cell3')).toHaveTextContent('Cell 3 ' + iter)
  expect(screen.getByTestId('cell4')).toHaveTextContent('Cell 4 ' + iter)
  expect(screen.getByTestId('cell5')).toHaveTextContent('Cell 5 ' + iter)
  expect(screen.getByTestId('cell6')).toHaveTextContent('Cell 6 ' + iter)

  iterate()
  iter = 1
  expect(screen.getByTestId('header1')).toHaveTextContent('Head 1 ' + iter)
  expect(screen.getByTestId('header3')).toHaveTextContent('Head 3 ' + iter)

  expect(screen.getByTestId('cell1')).toHaveTextContent('Cell 1 ' + iter)
  expect(screen.getByTestId('cell2')).toHaveTextContent('Cell 2 ' + iter)
  expect(screen.getByTestId('cell3')).toHaveTextContent('Cell 3 ' + iter)
  expect(screen.getByTestId('cell4')).toHaveTextContent('Cell 4 ' + iter)
  expect(screen.getByTestId('cell5')).toHaveTextContent('Cell 5 ' + iter)
  expect(screen.getByTestId('cell6')).toHaveTextContent('Cell 6 ' + iter)

  rotate()
  iterate()
  iter = 2
  expect(screen.getByTestId('header1')).toHaveTextContent('Head 1 ' + iter)
  expect(screen.getByTestId('header2')).toHaveTextContent('Head 2 ' + iter)
  expect(screen.getByTestId('header3')).toHaveTextContent('Head 3 ' + iter)

  expect(screen.getByTestId('cell1')).toHaveTextContent('Cell 1 ' + iter)
  expect(screen.getByTestId('cell2')).toHaveTextContent('Cell 2 ' + iter)
  expect(screen.getByTestId('cell3')).toHaveTextContent('Cell 3 ' + iter)
  expect(screen.getByTestId('cell4')).toHaveTextContent('Cell 4 ' + iter)
  expect(screen.getByTestId('cell5')).toHaveTextContent('Cell 5 ' + iter)
  expect(screen.getByTestId('cell6')).toHaveTextContent('Cell 6 ' + iter)

  rotate()
  iterate()
  iter = 3
  expect(screen.getByTestId('header1')).toHaveTextContent('Head 1 ' + iter)
  expect(screen.getByTestId('header3')).toHaveTextContent('Head 3 ' + iter)

  expect(screen.getByTestId('cell1')).toHaveTextContent('Cell 1 ' + iter)
  expect(screen.getByTestId('cell2')).toHaveTextContent('Cell 2 ' + iter)
  expect(screen.getByTestId('cell3')).toHaveTextContent('Cell 3 ' + iter)
  expect(screen.getByTestId('cell4')).toHaveTextContent('Cell 4 ' + iter)
  expect(screen.getByTestId('cell5')).toHaveTextContent('Cell 5 ' + iter)
  expect(screen.getByTestId('cell6')).toHaveTextContent('Cell 6 ' + iter)
})
