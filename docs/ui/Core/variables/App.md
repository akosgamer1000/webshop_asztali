[**WebShop Asztali Documentation v0.0.0**](../../../README.md)

***

[WebShop Asztali Documentation](../../../modules.md) / [UI/Core](../README.md) / App

# Variable: App

> `const` **App**: `React.FC`

Defined in: [src/ui/App.tsx:38](https://github.com/yourusername/webshop_asztali/blob/db527a672c3f1c86910ae6dbab32f3919e7d7093/src/ui/App.tsx#L38)

Root component that sets up the application's core infrastructure

## Component

## Returns

The configured application with all providers

## Example

```ts
// In main.tsx
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
