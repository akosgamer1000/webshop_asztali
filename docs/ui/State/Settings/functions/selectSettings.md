[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/State/Settings](../README.md) / selectSettings

# Function: selectSettings()

> **selectSettings**(`state`): [`SettingOption`](../interfaces/SettingOption.md)[]

Defined in: [src/ui/misch/store/settingsSlice.ts:144](https://github.com/yourusername/webshop_asztali/blob/6cd6b8ff5f7d5531f80a92ddbde9cd7ab8ecd569/src/ui/misch/store/settingsSlice.ts#L144)

Selector to get all settings from state

 selectSettings

## Parameters

### state

Redux root state

#### auth

`AuthState` = `authReducer`

#### settings

`SettingsState` = `settingsReducer`

## Returns

[`SettingOption`](../interfaces/SettingOption.md)[]

Array of all settings

## Example

```ts
const allSettings = useAppSelector(selectSettings);
```
