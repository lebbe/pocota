import React, { useState } from 'react'
import {
  fireEvent,
  getByTestId,
  prettyDOM,
  render,
  screen,
} from '@testing-library/react'
import '@testing-library/jest-dom'

import { Table, Thead, Th, Tbody, Td, Tr } from '..'

function TableWithSomeColspan({
  promotedFront,
  promotedBack,
}: {
  promotedFront?: boolean
  promotedBack?: boolean
}) {
  return (
    <>
      <Table data-testid="table" rotate={true} detailsTitle="Details">
        <Thead>
          <Tr>
            <Th front={!!promotedFront}>Header 1</Th>
            <Th>Header 2</Th>
            <Th>Header 3</Th>
            <Th back={!!promotedBack}>Header 4</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Test cell 1</Td>
            <Td colSpan={2}>Test cell 2 and 3</Td>
            <Td data-testid="row1cell4">Row 1 cell 4</Td>
          </Tr>
          <Tr data-testid="row2">
            <Td colSpan={4}>Row 2 cell 1</Td>
          </Tr>
          <Tr data-testid="row3">
            <Td>Test cell 1</Td>
            <Td>Test cell 2</Td>
            <Td data-testid="row1cell4" colSpan={2}>
              Row 3 cell 3 and 4
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  )
}

test('Test colspan', async () => {
  render(<TableWithSomeColspan />)

  const cell = screen.getByText('Row 1 cell 4')

  expect(cell.parentElement).not.toBeNull()

  expect(cell.parentElement!.children[0].textContent).toBe('Header 4')
  expect(cell.parentElement!.children[1].textContent).toBe('Row 1 cell 4')

  const row2 = screen.getByTestId('row2')

  expect(row2.children.length).toBe(1)
  expect(row2.children[0].nodeName).toBe('TD')
  const div = row2.children[0].children[0].children[0]
  expect(div.nodeName).toBe('DIV')

  expect(div.children[0].textContent).toBe('Header 1')
  expect(div.children[1].textContent).toBe('Row 2 cell 1')
})

test('Test colspan with front promoted first row', async () => {
  render(<TableWithSomeColspan promotedFront={true} />)

  const cell = screen.getByText('Row 1 cell 4')

  expect(cell.parentElement).not.toBeNull()

  expect(cell.parentElement!.children[0].textContent).toBe('Header 4')
  expect(cell.parentElement!.children[1].textContent).toBe('Row 1 cell 4')

  const row2 = screen.getByTestId('row2')
  expect(row2.children.length).toBe(2)
  expect(row2.children[0].nodeName).toBe('TD')
  expect(row2.children[1].nodeName).toBe('TD')
})

test('Test colspan with backpromoted last column', async () => {
  render(<TableWithSomeColspan promotedBack={true} />)

  const cell = screen.getByText('Row 1 cell 4')

  expect(cell.parentElement).not.toBeNull()
  expect(cell.parentElement!.children[0].nodeName).toBe('TD')
  expect(cell.parentElement!.children[1].nodeName).toBe('TD')

  const row2 = screen.getByTestId('row2')

  expect(row2.children.length).toBe(1)
  expect(row2.children[0].nodeName).toBe('TD')
  const div = row2.children[0].children[0].children[0]
  expect(div.nodeName).toBe('DIV')

  expect(div.children[0].textContent).toBe('Header 1')
  expect(div.children[1].textContent).toBe('Row 2 cell 1')
})
