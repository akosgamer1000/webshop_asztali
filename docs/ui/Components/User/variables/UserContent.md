[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Components/User](../README-2.md) / UserContent

# Variable: UserContent

> `const` **UserContent**: `React.FC`

Defined in: [src/ui/companents/user/usercontent.tsx:55](https://github.com/yourusername/webshop_asztali/blob/6cd6b8ff5f7d5531f80a92ddbde9cd7ab8ecd569/src/ui/companents/user/usercontent.tsx#L55)

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
