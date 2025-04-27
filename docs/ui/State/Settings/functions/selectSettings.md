[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/State/Settings](../README.md) / selectSettings

# Function: selectSettings()

> **selectSettings**(`state`): [`SettingOption`](../interfaces/SettingOption.md)[]

Defined in: [src/ui/misch/store/settingsSlice.ts:144](https://github.com/yourusername/webshop_asztali/blob/db527a672c3f1c86910ae6dbab32f3919e7d7093/src/ui/misch/store/settingsSlice.ts#L144)

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
