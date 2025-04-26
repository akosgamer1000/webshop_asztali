[**WebShop Asztali Documentation v0.0.0**](../../README.md)

***

[WebShop Asztali Documentation](../../modules.md) / UI/State

# UI/State

## File

misch/Store.ts

## Description

Redux Store Configuration

This file configures the Redux store for the application using Redux Toolkit.
It sets up the root reducer and exports typed versions of useDispatch and useSelector.

The store includes the following reducers:
- auth: Handles authentication state
- settings: Manages application settings

This configuration provides a central state management solution for the application,
with TypeScript typing support for better development experience.

## Author

WebShop Team

## Version

1.0.0

## Since

1.0.0

## Type Aliases

- [RootState](type-aliases/RootState.md)
- [AppDispatch](type-aliases/AppDispatch.md)

## Variables

- [store](variables/store.md)

## Functions

- [useAppDispatch](functions/useAppDispatch.md)
- [useAppSelector](functions/useAppSelector.md)
