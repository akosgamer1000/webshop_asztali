[**WebShop Asztali Documentation v0.0.0**](../../../README.md)

***

[WebShop Asztali Documentation](../../../modules.md) / [UI/Router](../README.md) / Router

# Variable: Router

> `const` **Router**: `React.FC`

Defined in: [src/ui/router/index.tsx:87](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/router/index.tsx#L87)

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
