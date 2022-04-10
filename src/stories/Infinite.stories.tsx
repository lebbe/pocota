import { Table, Tbody, Td, Th, Thead, Tr } from '../'

import { PersonCard, useFetchPeople } from './hooks/useFetchPeople'
import { useSorter } from '../hooks/useSorter'
import React, { useEffect, useRef, useState } from 'react'
import faker from '@faker-js/faker'
import { Transaction } from '@faker-js/faker/helpers'
import { useInfiniteScroll } from './hooks/useInfiniteScroll'

export default {
  title: 'Examples/Infinite',
}

function Example({ rotated }: { rotated: boolean }) {
  const { transactions, Button } = useInfiniteScroll()

  return (
    <Table rotate={rotated}>
      <Thead>
        <Tr>
          <Th>Account name</Th>
          <Th>Acct number</Th>
          <Th>Transaction type</Th>
          <Th style={{ textAlign: 'right' }} back>
            Amount
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {transactions.map((transaction) => (
          <Tr key={transaction.account}>
            <Td>{transaction.name}</Td>
            <Td>{transaction.account}</Td>
            <Td>{transaction.type}</Td>
            <Td style={{ textAlign: 'right' }}>{transaction.amount}</Td>
          </Tr>
        ))}
        <Tr>
          <Td colSpan={4}>{Button}</Td>
        </Tr>
      </Tbody>
    </Table>
  )
}

export function Desktop() {
  return <Example rotated={false}></Example>
}
export function Mobile() {
  return <Example rotated={true}></Example>
}
