[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Components/Layout](../README-1.md) / MainLayout

# Variable: MainLayout

> `const` **MainLayout**: `React.FC`

Defined in: [src/ui/companents/layout/MainLayout.tsx:39](https://github.com/yourusername/webshop_asztali/blob/6cd6b8ff5f7d5531f80a92ddbde9cd7ab8ecd569/src/ui/companents/layout/MainLayout.tsx#L39)

Main layout component that wraps all application pages

## Component

## Returns

A layout with sidebar, header, and main content area

## Example

```ts
// In router configuration
<Route element={<MainLayout />}>
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
</Route>
```
