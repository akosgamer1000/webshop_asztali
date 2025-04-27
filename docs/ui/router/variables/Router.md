[**WebShop Asztali Documentation v0.0.0**](../../../README.md)

***

[WebShop Asztali Documentation](../../../modules.md) / [UI/Router](../README.md) / Router

# Variable: Router

> `const` **Router**: `React.FC`

Defined in: [src/ui/router/index.tsx:125](https://github.com/yourusername/webshop_asztali/blob/db527a672c3f1c86910ae6dbab32f3919e7d7093/src/ui/router/index.tsx#L125)

Main Router Component

## Component

## Description

Configures all application routes and handles authentication state.
Includes automatic login from localStorage on initial load.

## Returns

The complete routing configuration for the application

## Example

```ts
<Provider store={store}>
  <HashRouter>
    <Router />
  </HashRouter>
</Provider>
```
