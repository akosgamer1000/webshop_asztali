[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Components/Order](../README.md) / OrderProductItem

# Variable: OrderProductItem

> `const` **OrderProductItem**: `React.FC`\<`OrderProductItemProps`\>

Defined in: [src/ui/companents/order/OrderProductItem.tsx:49](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/companents/order/OrderProductItem.tsx#L49)

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
