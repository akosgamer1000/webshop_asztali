[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/State/Auth](../README.md) / selectAuthToken

# Function: selectAuthToken()

> **selectAuthToken**(`state`): `null` \| `string`

Defined in: [src/ui/misch/store/authSlice.ts:188](https://github.com/yourusername/webshop_asztali/blob/6cd6b8ff5f7d5531f80a92ddbde9cd7ab8ecd569/src/ui/misch/store/authSlice.ts#L188)

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
