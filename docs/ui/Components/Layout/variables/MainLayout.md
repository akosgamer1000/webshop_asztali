[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Components/Layout](../README-1.md) / MainLayout

# Variable: MainLayout

> `const` **MainLayout**: `React.FC`

Defined in: [src/ui/companents/layout/MainLayout.tsx:39](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/companents/layout/MainLayout.tsx#L39)

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
