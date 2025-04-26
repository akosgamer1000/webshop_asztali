[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Components/Layout](../README.md) / Header

# Variable: Header

> `const` **Header**: `React.FC`\<\{ `toggleSidebar`: () => `void`; \}\>

Defined in: [src/ui/companents/header.tsx:35](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/companents/header.tsx#L35)

Header Component

## Component

## Description

A functional component that renders the top header bar of the application.
Includes a hamburger menu button for mobile navigation and the application title.

## Param

Component properties

## Param

Callback function to toggle the sidebar visibility

## Returns

A header component with navigation controls

## Example

```ts
<Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
```
