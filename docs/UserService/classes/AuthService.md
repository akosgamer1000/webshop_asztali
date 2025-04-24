[**WebShop Asztali Documentation v0.0.0**](../../README.md)

***

[WebShop Asztali Documentation](../../modules.md) / [UserService](../README.md) / AuthService

# Class: AuthService

Defined in: src/ui/example.ts:19

Authentication service for managing user sessions

## Constructors

### Constructor

> **new AuthService**(`apiUrl`): `AuthService`

Defined in: src/ui/example.ts:26

Creates an instance of AuthService

#### Parameters

##### apiUrl

`string`

Base URL for the authentication API

#### Returns

`AuthService`

## Properties

### apiUrl

> `private` `readonly` **apiUrl**: `string`

Defined in: src/ui/example.ts:26

Base URL for the authentication API

***

### token

> `private` **token**: `null` \| `string` = `null`

Defined in: src/ui/example.ts:20

## Methods

### isAuthenticated()

> **isAuthenticated**(): `boolean`

Defined in: src/ui/example.ts:72

Check if user is currently authenticated

#### Returns

`boolean`

Authentication status

***

### login()

> **login**(`username`, `password`): `Promise`\<\{ `token`: `string`; `user`: `any`; \}\>

Defined in: src/ui/example.ts:39

Login a user with credentials

#### Parameters

##### username

`string`

User's username

##### password

`string`

User's password

#### Returns

`Promise`\<\{ `token`: `string`; `user`: `any`; \}\>

Authentication result with token and user info

#### Throws

When authentication fails

#### Example

```ts
const authService = new AuthService('https://api.example.com');
const { token, user } = await authService.login('johndoe', 'password123');
console.log(`Logged in as ${user.username}`);
```

***

### logout()

> **logout**(): `Promise`\<`void`\>

Defined in: src/ui/example.ts:64

Logout the current user

#### Returns

`Promise`\<`void`\>
