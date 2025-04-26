[**WebShop Asztali Documentation v0.0.0**](../../../README.md)

***

[WebShop Asztali Documentation](../../../modules.md) / [UI/Hooks](../README.md) / useSettings

# Function: useSettings()

> **useSettings**(): `object`

Defined in: [src/ui/hooks/useSettings.ts:60](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/hooks/useSettings.ts#L60)

**`Function`**

Custom hook for accessing and managing application settings
 useSettings

## Returns

`object`

Object containing settings state and management functions

### settings

> **settings**: [`SettingOption`](../../State/Settings/interfaces/SettingOption.md)[]

### isEnabled()

> **isEnabled**: (`id`) => `boolean`

#### Parameters

##### id

`number`

#### Returns

`boolean`

### toggleSetting()

> **toggleSetting**: (`id`, `value?`) => `void`

#### Parameters

##### id

`number`

##### value?

`boolean`

#### Returns

`void`

## Example

```ts
const { settings, isEnabled, toggleSetting } = useSettings();

// Check if analytics is enabled
const analyticsEnabled = isEnabled(SETTINGS.ANALYTICS);

// Toggle analytics setting
<Switch 
  checked={analyticsEnabled}
  onChange={() => toggleSetting(SETTINGS.ANALYTICS)}
/>
```
