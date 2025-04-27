[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Hooks/Order](../README.md) / useGetOrderById

# Function: useGetOrderById()

> **useGetOrderById**(`orderId`): `object`

Defined in: [src/ui/hooks/order/useGetOrderById.tsx:79](https://github.com/yourusername/webshop_asztali/blob/db527a672c3f1c86910ae6dbab32f3919e7d7093/src/ui/hooks/order/useGetOrderById.tsx#L79)

Custom hook for fetching order details by ID

 useGetOrderById

## Parameters

### orderId

`number`

ID of the order to fetch

## Returns

`object`

Object containing order data and state

### order

> **order**: `null` \| `OrderData`

### loading

> **loading**: `boolean`

### error

> **error**: `null` \| `string`

## Example

```ts
const { order, loading, error } = useGetOrderById(123);

if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>{error}</div>;
}

return <OrderDetails order={order} />;
```
