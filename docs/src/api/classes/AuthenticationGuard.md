# Class: AuthenticationGuard

## Implements

- `CanActivate`

## Constructors

### constructor

• **new AuthenticationGuard**(`userService`, `authenticationService`): [`AuthenticationGuard`](AuthenticationGuard.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `userService` | `UserService` |
| `authenticationService` | `AuthenticationService` |

#### Returns

[`AuthenticationGuard`](AuthenticationGuard.md)

#### Defined in

[lib/src/authentication/authentication.guard.ts:9](https://github.com/joonashak/nestjs-clone-bay/blob/a434a6f/lib/src/authentication/authentication.guard.ts#L9)

## Methods

### canActivate

▸ **canActivate**(`context`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `ExecutionContext` |

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

CanActivate.canActivate

#### Defined in

[lib/src/authentication/authentication.guard.ts:14](https://github.com/joonashak/nestjs-clone-bay/blob/a434a6f/lib/src/authentication/authentication.guard.ts#L14)
