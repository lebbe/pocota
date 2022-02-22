import { useState } from 'react'
import './App.css'
import { Table, Tbody, Td, Th, Thead, Tr } from './PTable'

function ExampleTable(props: { mobile: boolean }) {
  return (
    <Table mobile={props.mobile}>
      <caption>Table caption</caption>
      <Thead>
        <Tr>
          <Th>CODE {props.mobile + ''}</Th>
          <Th>JEG SKAL FREM</Th>
          <Th>GJEM MEG</Th>
          <Th>INCH</Th>
          <Th>BOX TYPE</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>CES-9000</Td>
          <Td>50mt</Td>
          <Td>1/2"</Td>
          <Td>asdf</Td>
          <Td>Kangal / Coil</Td>
        </Tr>
        <Tr>
          <Td>CES-9000</Td>
          <Td>50mt</Td>
          <Td>1/2"</Td>
          <Td>asdf</Td>
          <Td>Kangal / Coil</Td>
        </Tr>
      </Tbody>
    </Table>
  )
}

function App() {
  return (
    <div className="App">
      <ExampleTable mobile={true}></ExampleTable>
      <p />
      <ExampleTable mobile={false}></ExampleTable>
    </div>
  )
}

export default App
