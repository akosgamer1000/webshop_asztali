[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Components/Common](../README-1.md) / Column

# Interface: Column\<T\>

Defined in: [src/ui/companents/common/DataTable.tsx:37](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/companents/common/DataTable.tsx#L37)

Column configuration interface
 Column

## Type Parameters

### T

`T`

Type of the data items

## Properties

### header

> **header**: `string`

Defined in: [src/ui/companents/common/DataTable.tsx:38](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/companents/common/DataTable.tsx#L38)

The text to display in the column header

***

### accessor

> **accessor**: keyof `T` \| (`item`) => `ReactNode`

Defined in: [src/ui/companents/common/DataTable.tsx:39](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/companents/common/DataTable.tsx#L39)

Function to access the data or key to access the property

***

### width?

> `optional` **width**: `string`

Defined in: [src/ui/companents/common/DataTable.tsx:40](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/companents/common/DataTable.tsx#L40)

Optional width for the column
