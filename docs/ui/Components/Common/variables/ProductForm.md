[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Components/Common](../README-2.md) / ProductForm

# Variable: ProductForm

> `const` **ProductForm**: `React.FC`\<`ProductFormProps`\>

Defined in: [src/ui/companents/common/ProductForm.tsx:98](https://github.com/yourusername/webshop_asztali/blob/db527a672c3f1c86910ae6dbab32f3919e7d7093/src/ui/companents/common/ProductForm.tsx#L98)

Product form component for creating and editing products

## Component

## Param

Component properties

## Param

Form title displayed at the top

## Param

Array of field configurations

## Param

Type of product being created/edited

## Param

Handler for form submission

## Param

Whether the form is in a loading state

## Param

Error message to display if any

## Returns

A form with dynamic fields based on configuration

## Example

```ts
<ProductForm
  title="Add Laptop"
  fields={[
    { name: 'brand', label: 'Brand', type: 'text', required: true },
    { name: 'model', label: 'Model', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true, min: 0 },
    { name: 'inStock', label: 'In Stock', type: 'checkbox', defaultValue: true }
  ]}
  productType="laptop"
  onSubmit={handleSubmit}
/>
```
