[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Hooks/Login](../README-1.md) / useGetLogged

# Function: useGetLogged()

> **useGetLogged**(): `object`

Defined in: [src/ui/hooks/login/useGetlogged.tsx:71](https://github.com/yourusername/webshop_asztali/blob/db527a672c3f1c86910ae6dbab32f3919e7d7093/src/ui/hooks/login/useGetlogged.tsx#L71)

Custom hook to fetch and manage the currently logged-in user

 useGetLogged

## Returns

`object`

Object containing user information and state

### id

> **id**: `null` \| `number`

### loading

> **loading**: `boolean`

### error

> **error**: `null` \| `string`

## Example

```ts
const { id, loading, error } = useGetLogged();

if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>{error}</div>;
}

if (id) {
  return <UserProfile userId={id} />;
} else {
  return <LoginForm />;
}
```
