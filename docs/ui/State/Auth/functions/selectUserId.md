[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/State/Auth](../README.md) / selectUserId

# Function: selectUserId()

> **selectUserId**(`state`): `null` \| `string`

Defined in: [src/ui/misch/store/authSlice.ts:177](https://github.com/yourusername/webshop_asztali/blob/6cd6b8ff5f7d5531f80a92ddbde9cd7ab8ecd569/src/ui/misch/store/authSlice.ts#L177)

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
