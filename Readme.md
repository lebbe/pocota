# Pocota tables: Polymorphic Compositional Tables

[![Node.js CI](https://github.com/lebbe/pocota/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/lebbe/pocota/actions/workflows/node.js.yml)

Pocota tables is a React 17 responsive table component, that supports a native HTML like experience when creating tables. The output is a simple pure HTML table, that you can style to your own likings.

Pocota can be combined with all sorts of React tools for supporting infinite scroll, sorting, customizable theming, etc. But this library doesn't provide any of this in itself, it provides a simple and straight forward way of making HTML tables, for people who prefer to write their markups as markup, and not as an entangled mess of data-structures.

See examples [here](https://lebbe.github.io/pocota/).

## Polymorphic

These tables conveniently rotate, so they can fit smaller screens. All table rows are reduced to a single one, containing labels and values, giving a perfect overview of the same data on handheld devices. There is an added possibility of keeping some of the rows as well, via a few attributes on the table headers.

## Compositional

It is hard to find any table component for React similar to this one. Instead of relying on datastructures, such as multi-dimensional arrays, Pocota is just plain HTML syntax, identical to the native HTML `<table>`-tag.

This means that you dont have to know advanced programming concepts to start using Pocota. You write the table out plain and regular, and we take care of the polymorphism behind the scenes. Everything you need to remember, is to start the tag name with a big letter (except for the cases where you want a table caption):

```
import { Table, Thead, Th, Tbody, Td, Tr } from 'pocota'

<Table rotate={window.innerWidth < 800>}>
  <caption>This is a simple table</caption>
  <Thead>
    <Tr>
      <Th>Name</Th>
	  <Th>Age</Th>
	  <Th>Speciality</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
	  <Td>John Joe</Td>
	  <Td>54</Td>
	  <Td>Writing HTML</Td>
    </Tr>
	<Tr>
	  <Td>Susy Joe</Td>
	  <Td>48</Td>
	  <Td>Writing React</Td>
	</Tr>
  </Tbody>
</Table>
```
