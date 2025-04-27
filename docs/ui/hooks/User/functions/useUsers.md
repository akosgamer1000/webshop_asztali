[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Hooks/User](../README-4.md) / useUsers

# Function: useUsers()

> **useUsers**(): `object`

Defined in: [src/ui/hooks/user/useUsers.tsx:76](https://github.com/yourusername/webshop_asztali/blob/db527a672c3f1c86910ae6dbab32f3919e7d7093/src/ui/hooks/user/useUsers.tsx#L76)

Custom hook for fetching and managing users

 useUsers

## Returns

`object`

Object containing users data and management functions

### users

> **users**: `UserData`[]

### loading

> **loading**: `boolean`

### error

> **error**: `null` \| `string`

### refetch()

> **refetch**: () => `Promise`\<`void`\> = `fetchUsers`

#### Returns

`Promise`\<`void`\>

## Example

```ts
const { users, loading, error, refetch } = useUsers();

if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>{error}</div>;
}

return (
  <UserList 
    users={users} 
    onRefresh={refetch} 
  />
);
```
