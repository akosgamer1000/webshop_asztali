[**WebShop Asztali Documentation v0.0.0**](../../../../../README.md)

***

[WebShop Asztali Documentation](../../../../../modules.md) / [ui/misch/store/settingsSlice](../README.md) / selectSettingById

# Function: selectSettingById()

> **selectSettingById**(`id`): (`state`) => `undefined` \| [`SettingOption`](../interfaces/SettingOption.md)

Defined in: [src/ui/misch/store/settingsSlice.ts:125](https://github.com/akosgamer1000/webshop_asztali/blob/694dfb5919995863486557fe9c75abb7edf40a6c/src/ui/misch/store/settingsSlice.ts#L125)

Selector to get a specific setting by ID

## Parameters

### id

`number`

ID of the setting to retrieve

## Returns

Selector function that takes state and returns the setting or undefined

> (`state`): `undefined` \| [`SettingOption`](../interfaces/SettingOption.md)

### Parameters

#### state

##### auth

`AuthState` = `authReducer`

##### settings

`SettingsState` = `settingsReducer`

### Returns

`undefined` \| [`SettingOption`](../interfaces/SettingOption.md)
