[**WebShop Asztali Documentation v0.0.0**](../../../../../README.md)

***

[WebShop Asztali Documentation](../../../../../modules.md) / [ui/companents/common/DataTable](../README.md) / Column

# Interface: Column\<T\>

Defined in: [src/ui/companents/common/DataTable.tsx:23](https://github.com/akosgamer1000/webshop_asztali/blob/694dfb5919995863486557fe9c75abb7edf40a6c/src/ui/companents/common/DataTable.tsx#L23)

Column configuration interface

## Type Parameters

### T

`T`

Type of the data items

## Properties

### accessor

> **accessor**: keyof `T` \| (`item`) => `ReactNode`

Defined in: [src/ui/companents/common/DataTable.tsx:25](https://github.com/akosgamer1000/webshop_asztali/blob/694dfb5919995863486557fe9c75abb7edf40a6c/src/ui/companents/common/DataTable.tsx#L25)

Function to access the data or key to access the property

***

### header

> **header**: `string`

Defined in: [src/ui/companents/common/DataTable.tsx:24](https://github.com/akosgamer1000/webshop_asztali/blob/694dfb5919995863486557fe9c75abb7edf40a6c/src/ui/companents/common/DataTable.tsx#L24)

The text to display in the column header

***

### width?

> `optional` **width**: `string`

Defined in: [src/ui/companents/common/DataTable.tsx:26](https://github.com/akosgamer1000/webshop_asztali/blob/694dfb5919995863486557fe9c75abb7edf40a6c/src/ui/companents/common/DataTable.tsx#L26)

Optional width for the column
