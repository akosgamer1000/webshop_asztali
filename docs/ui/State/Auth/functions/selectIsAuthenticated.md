[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/State/Auth](../README.md) / selectIsAuthenticated

# Function: selectIsAuthenticated()

> **selectIsAuthenticated**(`state`): `boolean`

Defined in: [src/ui/misch/store/authSlice.ts:199](https://github.com/yourusername/webshop_asztali/blob/db527a672c3f1c86910ae6dbab32f3919e7d7093/src/ui/misch/store/authSlice.ts#L199)

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
