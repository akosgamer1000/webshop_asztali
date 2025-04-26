[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Components/Common](../README-2.md) / FormField

# Interface: FormField

Defined in: [src/ui/companents/common/ProductForm.tsx:43](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/companents/common/ProductForm.tsx#L43)

Configuration interface for form fields
Defines the structure and validation rules for each form field
 FormField

## Properties

### name

> **name**: `string`

Defined in: [src/ui/companents/common/ProductForm.tsx:44](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/companents/common/ProductForm.tsx#L44)

Unique identifier for the field

***

### label

> **label**: `string`

Defined in: [src/ui/companents/common/ProductForm.tsx:45](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/companents/common/ProductForm.tsx#L45)

Display label for the field

***

### type

> **type**: `"number"` \| `"text"` \| `"checkbox"` \| `"select"`

Defined in: [src/ui/companents/common/ProductForm.tsx:46](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/companents/common/ProductForm.tsx#L46)

Type of input field

***

### required?

> `optional` **required**: `boolean`

Defined in: [src/ui/companents/common/ProductForm.tsx:47](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/companents/common/ProductForm.tsx#L47)

Whether the field is required

***

### min?

> `optional` **min**: `number`

Defined in: [src/ui/companents/common/ProductForm.tsx:48](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/companents/common/ProductForm.tsx#L48)

Minimum value for number fields

***

### max?

> `optional` **max**: `number`

Defined in: [src/ui/companents/common/ProductForm.tsx:49](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/companents/common/ProductForm.tsx#L49)

Maximum value for number fields

***

### step?

> `optional` **step**: `string`

Defined in: [src/ui/companents/common/ProductForm.tsx:50](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/companents/common/ProductForm.tsx#L50)

Step value for number fields

***

### options?

> `optional` **options**: `object`[]

Defined in: [src/ui/companents/common/ProductForm.tsx:51](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/companents/common/ProductForm.tsx#L51)

Options for select fields

#### value

> **value**: `string`

#### label

> **label**: `string`

***

### defaultValue?

> `optional` **defaultValue**: `string` \| `number` \| `boolean`

Defined in: [src/ui/companents/common/ProductForm.tsx:52](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/companents/common/ProductForm.tsx#L52)

Default value for the field
