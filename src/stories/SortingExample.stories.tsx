import { Table, Tbody, Td, Th, Thead, Tr } from '../'

import { PersonCard, useFetchPeople } from './hooks/useFetchPeople'
import { useSorter } from '../hooks/useSorter'
import React, { useState } from 'react'

export default {
  title: 'Examples/Sorting',
}

import './stories.css'

function Spinner({ isLoading }: { isLoading: boolean }) {
  return (
    <div className={'spinner' + (isLoading ? ' isLoading' : '')}>
      <span className="material-icons spinner-icon">autorenew</span>
    </div>
  )
}

function Sorting({ rotated }: { rotated: boolean }) {
  const [rotate, setRotate] = useState(rotated)
  const people = useFetchPeople()
  const {
    sorted: sortedPeople,
    SortButton,
    isSorting,
  } = useSorter<PersonCard>(people, {
    defaultSortBy: 'name',
  })

  if (sortedPeople === null) return <div>Loading...</div>

  console.log(sortedPeople.length, SortButton)
  return (
    <>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      {
        // Not supported yet (due to a bug...)
        // <button onClick={() => setRotate(!rotate)}>Flip rotation</button>-->
      }
      <Spinner isLoading={isSorting} />
      <Table rotate={rotate}>
        <Thead>
          <Tr>
            <Th front>
              Name
              <SortButton.name />
            </Th>
            <Th>
              E-mail
              {!rotate && <SortButton.email />}
            </Th>
            <Th>
              Phone
              {!rotate && <SortButton.phone />}
            </Th>
            <Th>
              City
              {!rotate && <SortButton.city />}
            </Th>
            <Th>
              Company
              {!rotate && <SortButton.company />}
            </Th>
            <Th>
              Username
              {!rotate && <SortButton.username />}
            </Th>
            <Th>
              Website
              {!rotate && <SortButton.website />}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedPeople.map((person) => (
            <Tr key={(person.name + person.email).replace(/ /g, '')}>
              <Td>{person.name}</Td>
              <Td>{person.email}</Td>
              <Td>{person.phone}</Td>
              <Td>{person.city}</Td>
              <Td>{person.company}</Td>
              <Td>{person.username}</Td>
              <Td>{person.website}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  )
}
export function Sorted() {
  return <Sorting rotated={false}></Sorting>
}

export function SortedRotated() {
  return <Sorting rotated={true}></Sorting>
}
