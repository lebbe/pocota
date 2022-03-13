import { useState } from 'react'
import './App.css'
import { Table, Tbody, Td, Th, Thead, Tr } from './PTable'

function ExampleTable(props: { mobile: boolean }) {
  return (
    <Table rotate={props.mobile}>
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

function ContactsTable({ mobile }: { mobile: boolean }) {
  const [selected, setSelected] = useState([!1, !1, !1, !1, !1, !1])
  return (
    <Table rotate={mobile}>
      <Thead>
        <Tr>
          <Th back>
            <input
              type="checkbox"
              checked={!selected.some((a) => !a)}
              onChange={(e) => {
                const isChecked = e.target.checked
                const newSelected = new Array(selected.length).fill(isChecked)
                setSelected(newSelected)
              }}
            />
          </Th>
          <Th>Name</Th>
          <Th>Surname</Th>
          <Th>Phone number</Th>
          <Th>E-mail</Th>
          <Th>Tags</Th>
          <Th front>Edit</Th>
        </Tr>
      </Thead>
      <Tbody>
        {selected.map((e, a) => (
          <Tr key={a}>
            <Td>
              <input
                type="checkbox"
                checked={selected[a]}
                onChange={(e) => {
                  const isChecked = e.target.checked
                  const newSelected = [...selected]
                  newSelected[a] = isChecked
                  setSelected(newSelected)
                }}
              />
            </Td>
            <Td>Wan</Td>
            <Td>Gengsin</Td>
            <Td>834-434-3534</Td>
            <Td>wan.gengsin@gmail.com</Td>
            <Td>
              <span>Friend</span>
            </Td>
            <Td>
              <span className="material-icons">mode_edit</span>
              <span className="material-icons">delete</span>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

function App() {
  return (
    <div className="App">
      <ContactsTable mobile={true}></ContactsTable>
      <p />
      {
        //
      }
    </div>
  )
}

export default App
