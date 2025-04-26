[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Components/User](../README.md) / useCreateUser

# Function: useCreateUser()

> **useCreateUser**(): `object`

Defined in: [src/ui/companents/user/addCreateUser.tsx:52](https://github.com/yourusername/webshop_asztali/blob/6cd6b8ff5f7d5531f80a92ddbde9cd7ab8ecd569/src/ui/companents/user/addCreateUser.tsx#L52)

```

@returns {Object} Object containing user creation function and state
@property {(userData: UserData) => Promise<any>} createUser - Function to create user
@property {boolean} loading - Loading state indicator
@property {string | null} error - Error message if any

## Returns

### createUser()

> **createUser**: (`userData`) => `Promise`\<`any`\>

Create a new user

This function handles the API call to create a new user and manages
loading states and error handling.

#### Parameters

##### userData

`UserData`

Data for the new user

#### Returns

`Promise`\<`any`\>

Response data from the server or null if error

Error handling includes:
- Network errors
- Authentication errors (401)
- Validation errors (400)
- Server errors (500)
- Other unexpected errors

### loading

> **loading**: `boolean`

### error

> **error**: `null` \| `string`
