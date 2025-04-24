[**WebShop Asztali Documentation v0.0.0**](../../../../../README.md)

***

[WebShop Asztali Documentation](../../../../../modules.md) / [ui/hooks/user/useDeleteuser](../README.md) / default

# Function: default()

> **default**(): `object`

Defined in: [src/ui/hooks/user/useDeleteuser.tsx:34](https://github.com/akosgamer1000/webshop_asztali/blob/694dfb5919995863486557fe9c75abb7edf40a6c/src/ui/hooks/user/useDeleteuser.tsx#L34)

Custom hook for deleting users

This hook provides functionality for deleting users and managing
the deletion process state, including loading, error, and success states.

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

### error

> **error**: `null` \| `string`

### loading

> **loading**: `boolean`

### success

> **success**: `boolean`
