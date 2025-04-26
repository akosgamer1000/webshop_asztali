[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Hooks/Login](../README.md) / useGetUserId

# Function: useGetUserId()

> **useGetUserId**(): `null` \| `string`

Defined in: [src/ui/hooks/login/useGetUserId.tsx:35](https://github.com/yourusername/webshop_asztali/blob/6cd6b8ff5f7d5531f80a92ddbde9cd7ab8ecd569/src/ui/hooks/login/useGetUserId.tsx#L35)

Custom hook to reliably get the current user's ID

 useGetUserId

## Returns

`null` \| `string`

The current user's ID or null if not authenticated

## Example

```ts
const userId = useGetUserId();

if (userId) {
  // User is authenticated, proceed with ID-dependent operations
} else {
  // User is not authenticated, handle accordingly
}
```
