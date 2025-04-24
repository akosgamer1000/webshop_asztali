[**WebShop Asztali Documentation v0.0.0**](../../../../../README.md)

***

[WebShop Asztali Documentation](../../../../../modules.md) / [ui/companents/user/addCreateUser](../README.md) / default

# Function: default()

> **default**(): `object`

Defined in: [src/ui/companents/user/addCreateUser.tsx:46](https://github.com/akosgamer1000/webshop_asztali/blob/694dfb5919995863486557fe9c75abb7edf40a6c/src/ui/companents/user/addCreateUser.tsx#L46)

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

### error

> **error**: `null` \| `string`

### loading

> **loading**: `boolean`
