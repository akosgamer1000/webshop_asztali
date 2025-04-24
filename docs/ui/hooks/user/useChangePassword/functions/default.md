[**WebShop Asztali Documentation v0.0.0**](../../../../../README.md)

***

[WebShop Asztali Documentation](../../../../../modules.md) / [ui/hooks/user/useChangePassword](../README.md) / default

# Function: default()

> **default**(): `object`

Defined in: [src/ui/hooks/user/useChangePassword.tsx:39](https://github.com/akosgamer1000/webshop_asztali/blob/694dfb5919995863486557fe9c75abb7edf40a6c/src/ui/hooks/user/useChangePassword.tsx#L39)

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

### error

> **error**: `null` \| `string`

### loading

> **loading**: `boolean`

### success

> **success**: `boolean`
