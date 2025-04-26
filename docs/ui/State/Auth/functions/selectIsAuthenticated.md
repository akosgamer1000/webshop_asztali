[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/State/Auth](../README.md) / selectIsAuthenticated

# Function: selectIsAuthenticated()

> **selectIsAuthenticated**(`state`): `boolean`

Defined in: [src/ui/misch/store/authSlice.ts:199](https://github.com/yourusername/webshop_asztali/blob/6cd6b8ff5f7d5531f80a92ddbde9cd7ab8ecd569/src/ui/misch/store/authSlice.ts#L199)

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
