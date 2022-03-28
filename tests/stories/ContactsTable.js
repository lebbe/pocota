import React, { useState } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from '../';
import './table.css';
export function ContactsTable({ mobile }) {
    const [selected, setSelected] = useState([!1, !1, !1, !1, !1, !1]);
    const className = mobile ? 'rotated' : 'ordinary';
    return (React.createElement(Table, { className: className, rotate: mobile },
        React.createElement(Thead, null,
            React.createElement(Tr, null,
                React.createElement(Th, { back: true },
                    React.createElement("input", { type: "checkbox", checked: !selected.some((a) => !a), onChange: (e) => {
                            const isChecked = e.target.checked;
                            const newSelected = new Array(selected.length).fill(isChecked);
                            setSelected(newSelected);
                        } })),
                React.createElement(Th, null, "Name"),
                React.createElement(Th, null, "Surname"),
                React.createElement(Th, null, "Phone number"),
                React.createElement(Th, null, "E-mail"),
                React.createElement(Th, null, "Tags"),
                React.createElement(Th, { front: true }, "Edit"))),
        React.createElement(Tbody, null, selected.map((e, a) => (React.createElement(Tr, { key: a },
            React.createElement(Td, null,
                React.createElement("input", { type: "checkbox", checked: selected[a], onChange: (e) => {
                        const isChecked = e.target.checked;
                        const newSelected = [...selected];
                        newSelected[a] = isChecked;
                        setSelected(newSelected);
                    } })),
            React.createElement(Td, null, "Wan"),
            React.createElement(Td, null, "Gengsin"),
            React.createElement(Td, null, "834-434-3534"),
            React.createElement(Td, null, "wan.gengsin@gmail.com"),
            React.createElement(Td, null,
                React.createElement("span", null, "Friend")),
            React.createElement(Td, null,
                React.createElement("span", { className: "icon" }, "\u270F\uFE0F"),
                React.createElement("span", { className: "icon" }, "\uD83D\uDDD1\uFE0F"))))))));
}
