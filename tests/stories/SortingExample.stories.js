import { Table, Tbody, Td, Th, Thead, Tr } from '../';
import { useFetchPeople } from './hooks/useFetchPeople';
import { useSorter } from '../hooks/useSorter';
import React, { useState } from 'react';
export default {
    title: 'Examples/Sorting',
};
import './stories.css';
function Spinner({ isLoading }) {
    return (React.createElement("div", { className: 'spinner' + (isLoading ? ' isLoading' : '') },
        React.createElement("span", { className: "material-icons spinner-icon" }, "autorenew")));
}
function Sorting({ rotated }) {
    const [rotate, setRotate] = useState(rotated);
    const people = useFetchPeople();
    const { sorted: sortedPeople, SortButton, isSorting, } = useSorter(people, {
        defaultSortBy: 'name',
    });
    if (sortedPeople === null || SortButton === null)
        return React.createElement("div", null, "Loading...");
    console.log(sortedPeople.length, SortButton);
    return (React.createElement(React.Fragment, null,
        React.createElement("link", { href: "https://fonts.googleapis.com/icon?family=Material+Icons", rel: "stylesheet" }),
        React.createElement(Spinner, { isLoading: isSorting }),
        React.createElement(Table, { rotate: rotate },
            React.createElement(Thead, null,
                React.createElement(Tr, null,
                    React.createElement(Th, { front: true },
                        "Name",
                        React.createElement(SortButton.name, null)),
                    React.createElement(Th, null,
                        "E-mail",
                        !rotate && React.createElement(SortButton.email, null)),
                    React.createElement(Th, null,
                        "Phone",
                        !rotate && React.createElement(SortButton.phone, null)),
                    React.createElement(Th, null,
                        "City",
                        !rotate && React.createElement(SortButton.city, null)),
                    React.createElement(Th, null,
                        "Company",
                        !rotate && React.createElement(SortButton.company, null)),
                    React.createElement(Th, null,
                        "Username",
                        !rotate && React.createElement(SortButton.username, null)),
                    React.createElement(Th, null,
                        "Website",
                        !rotate && React.createElement(SortButton.website, null)))),
            React.createElement(Tbody, null, sortedPeople.map((person) => (React.createElement(Tr, { key: (person.name + person.email).replace(/ /g, '') },
                React.createElement(Td, null, person.name),
                React.createElement(Td, null, person.email),
                React.createElement(Td, null, person.phone),
                React.createElement(Td, null, person.city),
                React.createElement(Td, null, person.company),
                React.createElement(Td, null, person.username),
                React.createElement(Td, null, person.website))))))));
}
export function Sorted() {
    return React.createElement(Sorting, { rotated: false });
}
export function SortedRotated() {
    return React.createElement(Sorting, { rotated: true });
}
