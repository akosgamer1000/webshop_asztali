[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Hooks/Login](../README-2.md) / useGetUserById

# Function: useGetUserById()

> **useGetUserById**(`userId`): `object`

Defined in: [src/ui/hooks/login/useGetuserbyid.tsx:75](https://github.com/yourusername/webshop_asztali/blob/6cd6b8ff5f7d5531f80a92ddbde9cd7ab8ecd569/src/ui/hooks/login/useGetuserbyid.tsx#L75)

Custom hook to fetch and manage user data by ID

 useGetUserById

## Parameters

### userId

`number`

The ID of the user to fetch

## Returns

`object`

Object containing user data and state

### user

> **user**: `null` \| `UserData`

### loading

> **loading**: `boolean`

### error

> **error**: `null` \| `string`

## Example

```ts
const { user, loading, error } = useGetUserById(123);

if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>{error}</div>;
}

return (
  <UserDetails 
    name={user.name}
    email={user.email}
    role={user.role}
  />
);
```
