[**WebShop Asztali Documentation v0.0.0**](../../../../../README.md)

***

[WebShop Asztali Documentation](../../../../../modules.md) / [ui/hooks/order/usePatchOrder](../README.md) / default

# Function: default()

> **default**(): `object`

Defined in: [src/ui/hooks/order/usePatchOrder.tsx:40](https://github.com/akosgamer1000/webshop_asztali/blob/694dfb5919995863486557fe9c75abb7edf40a6c/src/ui/hooks/order/usePatchOrder.tsx#L40)

## Returns

Object containing update function and state

### error

> **error**: `null` \| `string`

### loading

> **loading**: `boolean`

### success

> **success**: `boolean`

### updateOrder()

> **updateOrder**: (`orderId`, `orderData`) => `Promise`\<`any`\>

Update order information

This function handles the API call to update an order and manages
loading states and error handling. It automatically logs out
the user if an authentication error occurs.

#### Parameters

##### orderId

`number`

ID of the order to update

##### orderData

`OrderUpdateData`

Data to update for the order

#### Returns

`Promise`\<`any`\>

Updated order data or null if update failed

Error handling includes:
- Network errors
- Authentication errors (401)
- Not found errors (404)
- Invalid data errors (400)
- Server errors (500)
- Other unexpected errors
