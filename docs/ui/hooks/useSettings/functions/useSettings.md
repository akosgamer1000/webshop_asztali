[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [ui/hooks/useSettings](../README.md) / useSettings

# Function: useSettings()

> **useSettings**(): `object`

Defined in: [src/ui/hooks/useSettings.ts:23](https://github.com/akosgamer1000/webshop_asztali/blob/694dfb5919995863486557fe9c75abb7edf40a6c/src/ui/hooks/useSettings.ts#L23)

Custom hook for accessing and managing application settings

## Returns

`object`

Object containing settings state and management functions

### isEnabled()

> **isEnabled**: (`id`) => `boolean`

#### Parameters

##### id

`number`

#### Returns

`boolean`

### settings

> **settings**: [`SettingOption`](../../../misch/store/settingsSlice/interfaces/SettingOption.md)[]

### toggleSetting()

> **toggleSetting**: (`id`, `value?`) => `void`

#### Parameters

##### id

`number`

##### value?

`boolean`

#### Returns

`void`
