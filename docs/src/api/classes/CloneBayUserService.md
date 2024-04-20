# Class: CloneBayUserService

## Constructors

### constructor

• **new CloneBayUserService**(`userService`, `tokenService`): [`CloneBayUserService`](CloneBayUserService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `userService` | `UserService` |
| `tokenService` | `TokenService` |

#### Returns

[`CloneBayUserService`](CloneBayUserService.md)

#### Defined in

[lib/src/api/clone-bay-user.service.ts:8](https://github.com/joonashak/nestjs-clone-bay/blob/a434a6f/lib/src/api/clone-bay-user.service.ts#L8)

## Methods

### findById

▸ **findById**(`userId`): `Promise`\<[`User`](User.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |

#### Returns

`Promise`\<[`User`](User.md)\>

#### Defined in

[lib/src/api/clone-bay-user.service.ts:13](https://github.com/joonashak/nestjs-clone-bay/blob/a434a6f/lib/src/api/clone-bay-user.service.ts#L13)

___

### revokeTokens

▸ **revokeTokens**(`userId`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[lib/src/api/clone-bay-user.service.ts:18](https://github.com/joonashak/nestjs-clone-bay/blob/a434a6f/lib/src/api/clone-bay-user.service.ts#L18)
