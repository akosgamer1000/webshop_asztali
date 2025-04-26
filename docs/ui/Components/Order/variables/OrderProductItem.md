[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Components/Order](../README.md) / OrderProductItem

# Variable: OrderProductItem

> `const` **OrderProductItem**: `React.FC`\<`OrderProductItemProps`\>

Defined in: [src/ui/companents/order/OrderProductItem.tsx:49](https://github.com/yourusername/webshop_asztali/blob/6cd6b8ff5f7d5531f80a92ddbde9cd7ab8ecd569/src/ui/companents/order/OrderProductItem.tsx#L49)

Component that renders a product item within an order

## Component

## Param

Component properties

## Returns

A product item with name and quantity

## Example

```ts
<OrderProductItem 
  productId={123}
  quantity={2}
  onProductClick={(id) => navigate(`/products/${id}`)}
/>
```
