[**WebShop Asztali Documentation v0.0.0**](../../../README.md)

***

[WebShop Asztali Documentation](../../../modules.md) / [UI/State](../README.md) / useAppDispatch

# Function: useAppDispatch()

> **useAppDispatch**\<`AppDispatch`\>(): `AppDispatch`

Defined in: [src/ui/misch/Store.ts:58](https://github.com/yourusername/webshop_asztali/blob/6cd6b8ff5f7d5531f80a92ddbde9cd7ab8ecd569/src/ui/misch/Store.ts#L58)

Typed version of useDispatch hook
 useAppDispatch

## Type Parameters

### AppDispatch

`AppDispatch` *extends* `ThunkDispatch`\<\{ `auth`: `AuthState`; `settings`: `SettingsState`; \}, `undefined`, `UnknownAction`\> & `Dispatch`\<`UnknownAction`\> = `ThunkDispatch`\<\{ `auth`: `AuthState`; `settings`: `SettingsState`; \}, `undefined`, `UnknownAction`\> & `Dispatch`\<`UnknownAction`\>

The specific type of the dispatch function.

## Returns

`AppDispatch`

Typed dispatch function

## Example

```ts
const dispatch = useAppDispatch();
dispatch(login({ token, userId }));
```
