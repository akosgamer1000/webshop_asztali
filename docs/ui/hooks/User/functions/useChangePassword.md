[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Hooks/User](../README.md) / useChangePassword

# Function: useChangePassword()

> **useChangePassword**(): `object`

Defined in: [src/ui/hooks/user/useChangePassword.tsx:64](https://github.com/yourusername/webshop_asztali/blob/6cd6b8ff5f7d5531f80a92ddbde9cd7ab8ecd569/src/ui/hooks/user/useChangePassword.tsx#L64)

Custom hook for changing user passwords

 useChangePassword

## Returns

Object containing password change function and state

### changePassword()

> **changePassword**: (`passwordData`) => `Promise`\<`any`\>

Change user password

This function handles the API call to change the user's password and manages
loading states, error handling, and success feedback.

#### Parameters

##### passwordData

`ChangePasswordData`

Object containing old and new passwords

#### Returns

`Promise`\<`any`\>

Response data from the server or null if error

Error handling includes:
- Network errors
- Wrong old password (401)
- User not found (404)
- Invalid password data (400)
- Incorrect old password (403)
- Server errors (500)
- Other unexpected errors

The function also logs detailed error information for debugging purposes.

### loading

> **loading**: `boolean`

### error

> **error**: `null` \| `string`

### success

> **success**: `boolean`

## Example

```ts
const { changePassword, loading, error, success } = useChangePassword();

// Change user password
const handleSubmit = async (data) => {
  await changePassword({
    oldPassword: data.oldPassword,
    newPassword: data.newPassword
  });
  if (success) {
    // Password changed successfully
  }
};
```
