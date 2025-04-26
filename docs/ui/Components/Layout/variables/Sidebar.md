[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Components/Layout](../README-2.md) / Sidebar

# Variable: Sidebar

> `const` **Sidebar**: `React.FC`\<\{ `toggleSidebar`: () => `void`; `isOpen`: `boolean`; \}\>

Defined in: [src/ui/companents/sidebar.tsx:45](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/companents/sidebar.tsx#L45)

Sidebar Component

## Component

## Description

A functional component that renders a responsive navigation sidebar.
Displays different navigation options based on user authentication status.
Collapses on mobile and remains fixed on desktop screens.

## Param

Component properties

## Param

Callback function to toggle sidebar visibility

## Param

Current state of sidebar visibility (true = visible, false = hidden)

## Returns

A navigation sidebar component

## Example

```ts
<Sidebar toggleSidebar={() => setIsOpen(!isOpen)} isOpen={isOpen} />
```
