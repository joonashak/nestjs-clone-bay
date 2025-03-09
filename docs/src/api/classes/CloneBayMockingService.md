# Class: CloneBayMockingService

## Constructors

### constructor

• **new CloneBayMockingService**(`mockingService`): [`CloneBayMockingService`](CloneBayMockingService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `mockingService` | `MockingService` |

#### Returns

[`CloneBayMockingService`](CloneBayMockingService.md)

#### Defined in

[lib/src/api/clone-bay-mocking.service.ts:10](https://github.com/joonashak/nestjs-clone-bay/blob/1a4ecf31d03284a98989ab940da71aae76589b7b/lib/src/api/clone-bay-mocking.service.ts#L10)

## Methods

### createUser

▸ **createUser**(`user`): `Promise`\<`Document`\<`unknown`, {}, `UserDocument`\> & [`User`](User.md) & `Document`\<`unknown`, `any`, `any`\> & `SchemaTimestampsConfig` & `Required`\<\{ `_id`: `unknown`  }\> & \{ `__v`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Omit`\<[`User`](User.md), ``"id"``\> |

#### Returns

`Promise`\<`Document`\<`unknown`, {}, `UserDocument`\> & [`User`](User.md) & `Document`\<`unknown`, `any`, `any`\> & `SchemaTimestampsConfig` & `Required`\<\{ `_id`: `unknown`  }\> & \{ `__v`: `number`  }\>

#### Defined in

[lib/src/api/clone-bay-mocking.service.ts:12](https://github.com/joonashak/nestjs-clone-bay/blob/1a4ecf31d03284a98989ab940da71aae76589b7b/lib/src/api/clone-bay-mocking.service.ts#L12)

___

### loginWithEveId

▸ **loginWithEveId**(`session`, `eveId`): `Promise`\<`UserDocument`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `session` | `object` |
| `eveId` | `number` |

#### Returns

`Promise`\<`UserDocument`\>

#### Defined in

[lib/src/api/clone-bay-mocking.service.ts:16](https://github.com/joonashak/nestjs-clone-bay/blob/1a4ecf31d03284a98989ab940da71aae76589b7b/lib/src/api/clone-bay-mocking.service.ts#L16)
