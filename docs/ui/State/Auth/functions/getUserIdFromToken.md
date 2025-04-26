[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/State/Auth](../README.md) / getUserIdFromToken

# Function: getUserIdFromToken()

> **getUserIdFromToken**(`token`): `null` \| `string`

Defined in: [src/ui/misch/store/authSlice.ts:57](https://github.com/yourusername/webshop_asztali/blob/6cd6b8ff5f7d5531f80a92ddbde9cd7ab8ecd569/src/ui/misch/store/authSlice.ts#L57)

**`Function`**

Extract user ID from JWT token

This utility function attempts to extract the user ID from a JWT token.
If extraction fails, it returns null.

 getUserIdFromToken

## Parameters

### token

JWT token

`null` | `string`

## Returns

`null` \| `string`

User ID extracted from token or null if extraction fails
