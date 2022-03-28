import React, { useState } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from '../';
import { ContactsTable } from './ContactsTable';
export default {
    title: 'Examples/Basics',
};
import './table.css';
export function SimpleTableExample() {
    return (React.createElement(React.Fragment, null,
        React.createElement("h2", null, "Desktop version"),
        React.createElement(ContactsTable, { mobile: false }),
        React.createElement("h2", null, "Rotated version"),
        React.createElement(ContactsTable, { mobile: true }),
        React.createElement("h3", null, "Code"),
        React.createElement("pre", null, `<Table className={className} rotate={mobile}>
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
              <span className="icon">✏️</span>
              <span className="icon">🗑️</span>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>`)));
}
export function ToggledExample() {
    const [rotate, setRotate] = useState(false);
    const [rowsQuantity, setRowsQuantity] = useState(10);
    const [frontRow, setFrontRow] = useState('7');
    const rows = new Array(rowsQuantity).fill(true);
    return (React.createElement(React.Fragment, null,
        React.createElement("button", { onClick: () => setRotate(!rotate) }, "Toggle"),
        React.createElement("input", { type: "number", value: rowsQuantity, max: "5000", min: "1", onInput: (e) => setRowsQuantity(parseInt(e.target.value, 10)) }),
        React.createElement("select", { value: frontRow, onInput: (e) => setFrontRow(e.target.value) },
            React.createElement("option", { value: "" }, "Choose front column"),
            React.createElement("option", { value: "1" }, "Front promote column 1"),
            React.createElement("option", { value: "2" }, "Front promote column 2"),
            React.createElement("option", { value: "3" }, "Front promote column 3"),
            React.createElement("option", { value: "4" }, "Front promote column 4"),
            React.createElement("option", { value: "5" }, "Front promote column 5"),
            React.createElement("option", { value: "6" }, "Front promote column 6"),
            React.createElement("option", { value: "7" }, "Front promote column 7"),
            React.createElement("option", { value: "8" }, "Front promote column 8")),
        React.createElement(Table, { rotate: rotate },
            React.createElement(Thead, null,
                React.createElement(Tr, null,
                    React.createElement(Th, { front: frontRow === '1' }, "Head 1"),
                    React.createElement(Th, { front: frontRow === '2' }, "Head 2"),
                    React.createElement(Th, { front: frontRow === '3' }, "Head 3"),
                    React.createElement(Th, { front: frontRow === '4' }, "Head 4"),
                    React.createElement(Th, { front: frontRow === '5' }, "Head 5"),
                    React.createElement(Th, { front: frontRow === '6' }, "Head 6"),
                    React.createElement(Th, { front: frontRow === '7' }, "Head 7"),
                    React.createElement(Th, { front: frontRow === '8' }, "Head 8"))),
            React.createElement(Tbody, null, rows.map((_, i) => (React.createElement(Tr, { key: i },
                React.createElement(Td, null,
                    "Cell 1, row ",
                    i + 1),
                React.createElement(Td, null, "Cell 2"),
                React.createElement(Td, null, "Cell 3"),
                React.createElement(Td, null, "Cell 4"),
                React.createElement(Td, null, "Cell 5"),
                React.createElement(Td, null, "Cell 6"),
                React.createElement(Td, null, "Cell 7"),
                React.createElement(Td, null, "Cell 8"))))))));
}
