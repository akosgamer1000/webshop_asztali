[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Components/User](../README-2.md) / UserContent

# Variable: UserContent

> `const` **UserContent**: `React.FC`

Defined in: [src/ui/companents/user/usercontent.tsx:55](https://github.com/yourusername/webshop_asztali/blob/db527a672c3f1c86910ae6dbab32f3919e7d7093/src/ui/companents/user/usercontent.tsx#L55)

User Content Component

## Component

## Description

This component renders a data table containing user information and provides
navigation to user details and user creation.

The component uses:
- useUsers hook for fetching user data
- DataTable component for displaying users
- React Router for navigation

## Returns

The rendered user content component

## Example

```ts
<Route path="/users" element={<UserContent />} />
```
