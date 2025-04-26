[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Hooks/Order](../README-1.md) / useOrders

# Function: useOrders()

> **useOrders**(): `object`

Defined in: [src/ui/hooks/order/useOrders.tsx:72](https://github.com/yourusername/webshop_asztali/blob/6cd6b8ff5f7d5531f80a92ddbde9cd7ab8ecd569/src/ui/hooks/order/useOrders.tsx#L72)

Custom hook for fetching and managing orders

 useOrders

## Returns

`object`

Object containing orders data and management functions

### orders

> **orders**: `OrderData`[]

### loading

> **loading**: `boolean`

### error

> **error**: `null` \| `string`

### refetch()

> **refetch**: () => `Promise`\<`void`\> = `fetchOrders`

#### Returns

`Promise`\<`void`\>

## Example

```ts
const { orders, loading, error, refetch } = useOrders();

if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>{error}</div>;
}

return (
  <OrderList 
    orders={orders} 
    onRefresh={refetch} 
  />
);
```
