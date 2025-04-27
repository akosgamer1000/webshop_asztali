[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Hooks/User](../README-3.md) / usePatchUser

# Function: usePatchUser()

> **usePatchUser**(): `object`

Defined in: [src/ui/hooks/user/usePatchuser.tsx:79](https://github.com/yourusername/webshop_asztali/blob/db527a672c3f1c86910ae6dbab32f3919e7d7093/src/ui/hooks/user/usePatchuser.tsx#L79)

Custom hook for updating user information

 usePatchUser

## Returns

Object containing update function and state

### updateUser()

> **updateUser**: (`userId`, `userData`) => `Promise`\<`UpdateUserResult`\>

Update user information

This function handles the API call to update user information and manages
loading states, error handling, and success feedback.

#### Parameters

##### userId

`number`

ID of the user to update

##### userData

`UserUpdateData`

Data to update for the user

#### Returns

`Promise`\<`UpdateUserResult`\>

Result of the update operation

Error handling includes:
- Network errors
- Authentication errors (401)
- Not found errors (404)
- Validation errors (400)
- Server errors (500)
- Other unexpected errors

### loading

> **loading**: `boolean`

### error

> **error**: `null` \| `string`

### success

> **success**: `boolean`

## Example

```ts
const { updateUser, loading, error, success } = usePatchUser();

// Update user information
const handleUpdate = async (userId, userData) => {
  const result = await updateUser(userId, userData);
  if (result.success) {
    // User updated successfully
  }
};
```
