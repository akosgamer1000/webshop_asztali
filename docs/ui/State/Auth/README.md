[**WebShop Asztali Documentation v0.0.0**](../../../README.md)

***

[WebShop Asztali Documentation](../../../modules.md) / UI/State/Auth

# UI/State/Auth

## File

misch/store/authSlice.ts

## Description

Authentication Slice

Redux slice for managing authentication state in the application.
Handles user login, logout, and persistence of authentication data.

Features:
- Manage authentication token and user ID
- Persist authentication state in localStorage
- Handle login and logout actions
- Provide selectors for authentication state

This slice centralizes all authentication-related state management,
ensuring consistent handling of user sessions across the application.

## Author

WebShop Team

## Version

1.0.0

## Since

1.0.0

## Variables

- [login](variables/login.md)
- [logout](variables/logout.md)

## Functions

- [selectUserId](functions/selectUserId.md)
- [selectAuthToken](functions/selectAuthToken.md)
- [selectIsAuthenticated](functions/selectIsAuthenticated.md)
