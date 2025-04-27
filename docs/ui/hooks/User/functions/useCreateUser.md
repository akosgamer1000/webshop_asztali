[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Hooks/User](../README-1.md) / useCreateUser

# Function: useCreateUser()

> **useCreateUser**(): `object`

Defined in: [src/ui/hooks/user/useCreateUser.tsx:65](https://github.com/yourusername/webshop_asztali/blob/db527a672c3f1c86910ae6dbab32f3919e7d7093/src/ui/hooks/user/useCreateUser.tsx#L65)

Custom hook for creating new users

 useCreateUser

## Returns

Object containing user creation function and state

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

## Example

```ts
const { createUser, loading, error } = useCreateUser();

// Create a new user
const handleSubmit = async (formData) => {
  const result = await createUser(formData);
  if (result) {
    // User created successfully
  }
};
```
