[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/State/Auth](../README.md) / selectUserId

# Function: selectUserId()

> **selectUserId**(`state`): `null` \| `string`

Defined in: [src/ui/misch/store/authSlice.ts:129](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/misch/store/authSlice.ts#L129)

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
