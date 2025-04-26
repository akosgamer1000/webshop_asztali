[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Hooks/User](../README-2.md) / useDeleteUser

# Function: useDeleteUser()

> **useDeleteUser**(): `object`

Defined in: [src/ui/hooks/user/useDeleteuser.tsx:54](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/hooks/user/useDeleteuser.tsx#L54)

Custom hook for deleting users

 useDeleteUser

## Returns

Object containing user deletion function and state

### deleteUser()

> **deleteUser**: (`userId`) => `Promise`\<`boolean`\>

Delete a user

This function handles the API call to delete a user and manages
loading states, error handling, and success feedback.

#### Parameters

##### userId

`number`

ID of the user to delete

#### Returns

`Promise`\<`boolean`\>

True if deletion was successful, false otherwise

Error handling includes:
- Network errors
- Authentication errors (401)
- Not found errors (404)
- Server errors (500)
- Other unexpected errors

### loading

> **loading**: `boolean`

### error

> **error**: `null` \| `string`

### success

> **success**: `boolean`

## Description

This hook provides functionality for deleting users and managing
the deletion process state, including loading, error, and success states.

## Example

```ts
const { deleteUser, loading, error, success } = useDeleteUser();

// Delete a user
const handleDelete = async (userId) => {
  const result = await deleteUser(userId);
  if (result) {
    // User deleted successfully
  }
};
```
