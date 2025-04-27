[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/State/Auth](../README.md) / selectAuthToken

# Function: selectAuthToken()

> **selectAuthToken**(`state`): `null` \| `string`

Defined in: [src/ui/misch/store/authSlice.ts:188](https://github.com/yourusername/webshop_asztali/blob/db527a672c3f1c86910ae6dbab32f3919e7d7093/src/ui/misch/store/authSlice.ts#L188)

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
