[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Components/Common](../README-1.md) / DataTable

# Function: DataTable()

> **DataTable**\<`T`\>(`props`): `Element`

Defined in: [src/ui/companents/common/DataTable.tsx:100](https://github.com/yourusername/webshop_asztali/blob/6cd6b8ff5f7d5531f80a92ddbde9cd7ab8ecd569/src/ui/companents/common/DataTable.tsx#L100)

Generic data table component for displaying and managing tabular data

## Type Parameters

### T

`T`

Type of the data items

## Parameters

### props

`DataTableProps`\<`T`\>

Component properties

## Returns

`Element`

A data table with pagination and search

## Component

## Example

```ts
<DataTable
  data={users}
  columns={[
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Actions', accessor: (user) => (
      <button onClick={() => handleEdit(user)}>Edit</button>
    )}
  ]}
  keyField="id"
  searchFields={['name', 'email']}
  onRowClick={handleRowClick}
/>
```
