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

export function Example() {
  const { transactions, loadMoreRef, fill, isLoading } = useInfiniteScroll()

  return (
    <Table rotate={false}>
      <Thead>
        <Tr>
          <Th>Account name</Th>
          <Th>Acct number</Th>
          <Th>Transaction type</Th>
          <Th style={{ textAlign: 'right' }}>Amount</Th>
        </Tr>
      </Thead>
      <Tbody>
        {transactions.map((transaction) => (
          <Tr>
            <Td>{transaction.name}</Td>
            <Td>{transaction.account}</Td>
            <Td>{transaction.type}</Td>
            <Td style={{ textAlign: 'right' }}>{transaction.amount}</Td>
          </Tr>
        ))}
        <Tr>
          <Td>
            <button ref={loadMoreRef} onClick={fill}>
              {isLoading ? 'Loading more...' : 'Load more'}
            </button>
          </Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
        </Tr>
      </Tbody>
    </Table>
  )
}
