[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Components/User](../README-3.md) / ProfileContent

# Variable: ProfileContent

> `const` **ProfileContent**: `React.FC`

Defined in: [src/ui/companents/user/userwiew.tsx:50](https://github.com/yourusername/webshop_asztali/blob/db527a672c3f1c86910ae6dbab32f3919e7d7093/src/ui/companents/user/userwiew.tsx#L50)

User View Component

## Component

## Description

This component displays detailed information about a specific user and provides
functionality to delete the user (except for the user's own profile).

The component uses:
- useGetUserById hook for fetching user data
- useDeleteUser hook for user deletion
- Redux for accessing the logged-in user's ID
- React Router for navigation and parameter handling

## Returns

The rendered user view component

## Example

```ts
<Route path="/user/:id" element={<UserView />} />
```
