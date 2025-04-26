[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/State/Auth](../README.md) / selectAuthToken

# Function: selectAuthToken()

> **selectAuthToken**(`state`): `null` \| `string`

Defined in: [src/ui/misch/store/authSlice.ts:140](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/misch/store/authSlice.ts#L140)

Selector for getting the authentication token from the authentication state

 selectAuthToken

## Parameters

### state

Redux state

#### auth

`AuthState` = `authReducer`

#### settings

`SettingsState` = `settingsReducer`

## Returns

`null` \| `string`

The authentication token or null if not authenticated

## Example

```ts
const token = useAppSelector(selectAuthToken);
```
