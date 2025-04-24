[**WebShop Asztali Documentation v0.0.0**](../../../../../README.md)

***

[WebShop Asztali Documentation](../../../../../modules.md) / [ui/hooks/user/usePatchuser](../README.md) / default

# Function: default()

> **default**(): `object`

Defined in: [src/ui/hooks/user/usePatchuser.tsx:61](https://github.com/akosgamer1000/webshop_asztali/blob/694dfb5919995863486557fe9c75abb7edf40a6c/src/ui/hooks/user/usePatchuser.tsx#L61)

};
```

@returns {Object} Object containing update function and state
@property {(userId: number, userData: UserUpdateData) => Promise<UpdateUserResult>} updateUser - Function to update user
@property {boolean} loading - Loading state indicator
@property {string | null} error - Error message if any
@property {boolean} success - Success state indicator

## Returns

### error

> **error**: `null` \| `string`

### loading

> **loading**: `boolean`

### success

> **success**: `boolean`

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
