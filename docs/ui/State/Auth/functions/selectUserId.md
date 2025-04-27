[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/State/Auth](../README.md) / selectUserId

# Function: selectUserId()

> **selectUserId**(`state`): `null` \| `string`

Defined in: [src/ui/misch/store/authSlice.ts:177](https://github.com/yourusername/webshop_asztali/blob/db527a672c3f1c86910ae6dbab32f3919e7d7093/src/ui/misch/store/authSlice.ts#L177)

Selector for getting the user ID from the authentication state

 selectUserId

## Parameters

### state

Redux state

#### auth

`AuthState` = `authReducer`

#### settings

`SettingsState` = `settingsReducer`

## Returns

`null` \| `string`

The user ID or null if not authenticated

## Example

```ts
const userId = useAppSelector(selectUserId);
```
