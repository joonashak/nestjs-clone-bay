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

[lib/src/api/clone-bay-user.service.ts:9](https://github.com/joonashak/nestjs-clone-bay/blob/1a4ecf31d03284a98989ab940da71aae76589b7b/lib/src/api/clone-bay-user.service.ts#L9)

## Methods

### findById

▸ **findById**(`userId`): `Promise`\<``null`` \| [`User`](User.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |

#### Returns

`Promise`\<``null`` \| [`User`](User.md)\>

#### Defined in

[lib/src/api/clone-bay-user.service.ts:14](https://github.com/joonashak/nestjs-clone-bay/blob/1a4ecf31d03284a98989ab940da71aae76589b7b/lib/src/api/clone-bay-user.service.ts#L14)

___

### revokeTokens

▸ **revokeTokens**(`userId`): `Promise`\<`void`\>

Revoke all SSO tokens for user.

Throws if the user is not found.

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[lib/src/api/clone-bay-user.service.ts:23](https://github.com/joonashak/nestjs-clone-bay/blob/1a4ecf31d03284a98989ab940da71aae76589b7b/lib/src/api/clone-bay-user.service.ts#L23)
