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

  if (sortedPeople === null || SortButton === null) return <div>Loading...</div>

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
              <SortButton.name className="sorter-button" />
            </Th>
            <Th>
              E-mail
              {!rotate && <SortButton.email className="sorter-button" />}
            </Th>
            <Th>
              Phone
              {!rotate && <SortButton.phone className="sorter-button" />}
            </Th>
            <Th>
              City
              {!rotate && <SortButton.city className="sorter-button" />}
            </Th>
            <Th>
              Company
              {!rotate && <SortButton.company className="sorter-button" />}
            </Th>
            <Th>
              Username
              {!rotate && <SortButton.username className="sorter-button" />}
            </Th>
            <Th>
              Website
              {!rotate && <SortButton.website className="sorter-button" />}
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
