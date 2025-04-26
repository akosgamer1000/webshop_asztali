[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/State/Settings](../README.md) / selectSettingById

# Function: selectSettingById()

> **selectSettingById**(`id`): (`state`) => `undefined` \| [`SettingOption`](../interfaces/SettingOption.md)

Defined in: [src/ui/misch/store/settingsSlice.ts:155](https://github.com/yourusername/webshop_asztali/blob/6cd6b8ff5f7d5531f80a92ddbde9cd7ab8ecd569/src/ui/misch/store/settingsSlice.ts#L155)

Selector to get a specific setting by ID

 selectSettingById

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

## Example

```ts
const analyticsSetting = useAppSelector(selectSettingById(SETTINGS.ANALYTICS));
```
