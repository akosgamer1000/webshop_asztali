[**WebShop Asztali Documentation v0.0.0**](../../../README.md)

***

[WebShop Asztali Documentation](../../../modules.md) / [UI/State](../README.md) / useAppSelector

# Function: useAppSelector()

> **useAppSelector**\<`TState`, `Selected`\>(`selector`, `equalityFnOrOptions?`): `Selected`

Defined in: [src/ui/misch/Store.ts:69](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/misch/Store.ts#L69)

Typed version of useSelector hook
 useAppSelector

## Type Parameters

### TState

`TState` *extends* `object` = \{ `auth`: `AuthState`; `settings`: `SettingsState`; \}

The specific type of state this hook operates on.

### Selected

`Selected` = `unknown`

The type of the value that the selector function will return.

## Parameters

### selector

(`state`) => `Selected`

A function that receives the current state and returns a part of the state or some derived data.

### equalityFnOrOptions?

An optional equality function or options object for customizing the behavior of the selector.

`EqualityFn`\<`Selected`\> | `UseSelectorOptions`\<`Selected`\>

## Returns

`Selected`

The selected state

## Template

Return type of the selector function

## Param

Selector function

## Example

```ts
const isAuthenticated = useAppSelector(state => !!state.auth.token);
```
