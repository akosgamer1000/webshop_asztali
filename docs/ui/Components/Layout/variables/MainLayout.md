[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Components/Layout](../README-1.md) / MainLayout

# Variable: MainLayout

> `const` **MainLayout**: `React.FC`

Defined in: [src/ui/companents/layout/MainLayout.tsx:37](https://github.com/yourusername/webshop_asztali/blob/db527a672c3f1c86910ae6dbab32f3919e7d7093/src/ui/companents/layout/MainLayout.tsx#L37)

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
