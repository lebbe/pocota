import React, { useState } from 'react'
import { fireEvent, logRoles, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Table, Thead, Th, Tbody, Td, Tr } from '..'

function ThisIsAComponent(props: { test: React.ReactNode; rotated: boolean }) {
  const [rotate, setRotate] = useState(props.rotated)

  return (
    <>
      <button onClick={() => setRotate(!rotate)}>Rotate!</button>
      <Table rotate={rotate} detailsTitle={props.test}>
        <Thead>
          <Tr>
            <Th>Test</Th>
            <Th>Test 2</Th>
            <Th>Test 3</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td data-testid="cell1">Test cell 1</Td>
            <Td data-testid="cell2">Test cell 2</Td>
            <Td data-testid="cell3">Test cell 3</Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  )
}

test('Test rendering of title as text in rotated table', async () => {
  render(<ThisIsAComponent rotated={true} test="Hello world!" />)

  const title = screen.getByText('Hello world!')
  expect(title).toBeInTheDocument()

  fireEvent.click(screen.getByText('Rotate!'))

  expect(title).not.toBeInTheDocument()

  fireEvent.click(screen.getByText('Rotate!'))

  expect(screen.getByText('Hello world!')).toBeInTheDocument()
})

test('Test rendering title as React node in rotated table', async () => {
  render(<ThisIsAComponent rotated={true} test={<div>Hello React</div>} />)

  const title = screen.getByText('Hello React')
  expect(title).toBeInTheDocument()

  fireEvent.click(screen.getByText('Rotate!'))

  expect(title).not.toBeInTheDocument()

  fireEvent.click(screen.getByText('Rotate!'))

  expect(screen.getByText('Hello React')).toBeInTheDocument()
})
