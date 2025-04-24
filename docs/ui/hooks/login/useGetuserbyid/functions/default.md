[**WebShop Asztali Documentation v0.0.0**](../../../../../README.md)

***

[WebShop Asztali Documentation](../../../../../modules.md) / [ui/hooks/login/useGetuserbyid](../README.md) / default

# Function: default()

> **default**(`userId`): `object`

Defined in: [src/ui/hooks/login/useGetuserbyid.tsx:37](https://github.com/akosgamer1000/webshop_asztali/blob/694dfb5919995863486557fe9c75abb7edf40a6c/src/ui/hooks/login/useGetuserbyid.tsx#L37)

Hook to fetch and manage user data by ID

## Parameters

### userId

`number`

The ID of the user to fetch

## Returns

`object`

Object containing user data, loading state, and any error messages

### error

> **error**: `null` \| `string`

### loading

> **loading**: `boolean`

### user

> **user**: `null` \| `UserData`
