[**WebShop Asztali Documentation v0.0.0**](../../../../../README.md)

***

[WebShop Asztali Documentation](../../../../../modules.md) / [ui/hooks/prod/useCreateProduct](../README.md) / default

# Function: default()

> **default**(): `object`

Defined in: [src/ui/hooks/prod/useCreateProduct.tsx:183](https://github.com/akosgamer1000/webshop_asztali/blob/694dfb5919995863486557fe9c75abb7edf40a6c/src/ui/hooks/prod/useCreateProduct.tsx#L183)

## Returns

Object containing creation function and state

### createProduct()

> **createProduct**: (`productData`) => `Promise`\<`any`\>

Create a new product

This function handles the API call to create a new product and manages
loading states and error handling. It automatically logs out
the user if an authentication error occurs.

#### Parameters

##### productData

`ProductType`

The product data to create

#### Returns

`Promise`\<`any`\>

Created product data

#### Throws

If product creation fails

Error handling includes:
- Network errors
- Authentication errors (401)
- Invalid data errors (400)
- Server errors (500)
- Other unexpected errors

### error

> **error**: `null` \| `string`

### loading

> **loading**: `boolean`
