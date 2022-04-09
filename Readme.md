# Pocota tables: Polymorphic Compositional Tables

[![Tests](https://github.com/lebbe/pocota/actions/workflows/node.js.yml/badge.svg)](https://github.com/lebbe/pocota/actions/workflows/node.js.yml)

Pocota tables is a React 18 responsive table component, that supports a native HTML like experience when creating tables. The output is a simple pure HTML table, that you can style to your own likings.

Pocota can be combined with all sorts of React tools for supporting infinite scroll, sorting, customizable theming, etc. But this library doesn't provide any of this in itself, it provides a simple and straight forward way of making HTML tables, for people who prefer to write their markups as markup, and not as an entangled mess of data-structures.

See examples [here](https://lebbe.github.io/pocota/).

## Polymorphic

These tables conveniently rotate, so they can fit smaller screens. All table rows are reduced to a single one, containing labels and values, giving a perfect overview of the same data on handheld devices. There is an added possibility of keeping some of the rows as well, via a few attributes on the table headers.

## Compositional

It is hard to find any table component for React similar to this one. Instead of relying on datastructures, such as multi-dimensional arrays, Pocota is just plain HTML syntax, identical to the native HTML `<table>`-tag.

This means that you dont have to know advanced programming concepts to start using Pocota. You write the table out plain and regular, and we take care of the polymorphism behind the scenes. Everything you need to remember, is to start the tag name with a big letter (except for the cases where you want a table caption):

```
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td  } from 'pocota'

function ExampleTable() {
  const transactions = useFetchTransactions()

  return (
    <Table rotate={window.width < 500} detailsTitle="Payments">
      <caption>List of payments made this month</caption>
      <Thead>
        <Tr>
          <Th>Date</Th>
          <Th>Merchant</Th>
          <Th>Category</Th>
          <Th>Account type</Th>
          <Th back>Amount</Th>
        </Tr>
      </Thead>
      <Tbody>
        {transactions.map((transaction) => (
          <Tr key={transaction.id}>
            <Td>{transaction.date}</Td>
            <Td>{transaction.merchant}</Td>
            <Td>{transaction.category}</Td>
            <Td>{transaction.accountType}</Td>
            <Td>{transaction.amount}</Td>
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Td colSpan={4} noHeader>
            <em>Sum</em>
          </Td>
          <Td>
            <em>{transactions.map((t) => t.amount).reduce((a, b) => a + b)}</em>
          </Td>
        </Tr>
      </Tfoot>
    </Table>
  )
}
```

As you would expect, this would render something like this on wide screens:

| Date       | Merchant       | Category          | Account type | Amount     |
| ---------- | -------------- | ----------------- | ------------ | ---------- |
| 02.01-2020 | Taxi           | Auto/transport    | Checking     | -5.4       |
| 02.01-2020 | Adatum Fitness | Fitness           | Credit Card  | -53.7      |
| 03.01-2020 | Fourth Coffee  | Restaurant/Dining | Checking     | -1.9       |
| 03.01-2020 | Taxi           | Auto/Transport    | Checking     | -6.8       |
| 06.01-2020 | Telltale Toys  | Shopping          | Checking     | -29.9      |
| 06.01-2020 | Airline        | Travel            | Credit Card  | -324       |
| **Sum**    |                |                   |              | **-421.7** |

And something like this on narrow screens:

<table>
<thead>
<th>Payments</th>
<th>Amount</th>
</thead>
<tbody>
<tr>
	<td>
	<b>Date</b><br>02.01-2020<br>
	<b>Merchant</b><br>Taxi<br>
	<b>Category</b><br>Auto/transport<br>
	<b>Account type</b><br>Checking<br>
	</td>
	<td>-5.4</td>
</tr>
<tr>
	<td>
	<b>Date</b><br>02.01-2020<br>
	<b>Merchant</b><br>Adatum Fitness<br>
	<b>Category</b><br>Fitness<br>
	<b>Account type</b><br>Credit Card<br>
	</td>
	<td>-5.4</td>
</tr>
<tr>
	<td>
	<b>Date</b><br>03.01-2020<br>
	<b>Merchant</b><br>Fourth Coffee<br>
	<b>Category</b><br>Restaurant/Dining<br>
	<b>Account type</b><br>Checking<br>
	</td>
	<td>-1.9</td>
</tr>
<tr>
	<td>
	<b>Date</b><br>03.01-2020<br>
	<b>Merchant</b><br>Taxi<br>
	<b>Category</b><br>Auto/transport<br>
	<b>Account type</b><br>Checking<br>
	</td>
	<td>-6.8</td>
</tr>
<tr>
	<td>
	<b>Date</b><br>06.01-2020<br>
	<b>Merchant</b><br>Telltale Toys<br>
	<b>Category</b><br>Shopping<br>
	<b>Account type</b><br>Checking<br>
	</td>
	<td>-29.9</td>
</tr>
<tr>
	<td>
	<b>Date</b><br>06.01-2020<br>
	<b>Merchant</b><br>Airline<br>
	<b>Category</b><br>Travel<br>
	<b>Account type</b><br>Credit Card<br>
	</td>
	<td>-324</td>
</tr>
<tr>
<td><b>Sum</b></td>
<td><b>-421.7</b></td>
</tr>
</tbody>
</table>
