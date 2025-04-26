[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Hooks/Order](../README-2.md) / usePatchOrder

# Function: usePatchOrder()

> **usePatchOrder**(): `object`

Defined in: [src/ui/hooks/order/usePatchOrder.tsx:60](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/hooks/order/usePatchOrder.tsx#L60)

Custom hook for updating order information

 usePatchOrder

## Returns

Object containing update function and state

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

### loading

> **loading**: `boolean`

### error

> **error**: `null` \| `string`

### success

> **success**: `boolean`

## Example

```ts
const { updateOrder, loading, error, success } = usePatchOrder();

// Update an order's status
const handleStatusChange = async (orderId, newStatus) => {
  await updateOrder(orderId, { status: newStatus });
  if (success) {
    // Order updated successfully
  }
};
```
