[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/State/Auth](../README.md) / selectIsAuthenticated

# Function: selectIsAuthenticated()

> **selectIsAuthenticated**(`state`): `boolean`

Defined in: [src/ui/misch/store/authSlice.ts:151](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/misch/store/authSlice.ts#L151)

Selector for checking if the user is authenticated

 selectIsAuthenticated

## Parameters

### state

Redux state

#### auth

`AuthState` = `authReducer`

#### settings

`SettingsState` = `settingsReducer`

## Returns

`boolean`

True if authenticated, false otherwise

## Example

```ts
const isAuthenticated = useAppSelector(selectIsAuthenticated);
```
