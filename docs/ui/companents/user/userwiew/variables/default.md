[**WebShop Asztali Documentation v0.0.0**](../../../../../README.md)

***

[WebShop Asztali Documentation](../../../../../modules.md) / [ui/companents/user/userwiew](../README.md) / default

# Variable: default

> `const` **default**: `React.FC`

Defined in: [src/ui/companents/user/userwiew.tsx:36](https://github.com/akosgamer1000/webshop_asztali/blob/694dfb5919995863486557fe9c75abb7edf40a6c/src/ui/companents/user/userwiew.tsx#L36)

User View Component

This component displays detailed information about a specific user and provides
functionality to delete the user (except for the user's own profile).

The component uses:
- useGetUserById hook for fetching user data
- useDeleteUser hook for user deletion
- Redux for accessing the logged-in user's ID
- React Router for navigation and parameter handling

## Returns

The rendered user view component
