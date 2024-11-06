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

[lib/src/api/clone-bay-mocking.service.ts:8](https://github.com/joonashak/nestjs-clone-bay/blob/37c762a/lib/src/api/clone-bay-mocking.service.ts#L8)

## Methods

### createUser

▸ **createUser**(`user`): `Promise`\<`Document`\<`unknown`, {}, `UserDocument`\> & [`User`](User.md) & `Document`\<`any`, `any`, `any`\> & `SchemaTimestampsConfig` & \{ `_id`: `ObjectId`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Omit`\<[`User`](User.md), ``"id"``\> |

#### Returns

`Promise`\<`Document`\<`unknown`, {}, `UserDocument`\> & [`User`](User.md) & `Document`\<`any`, `any`, `any`\> & `SchemaTimestampsConfig` & \{ `_id`: `ObjectId`  }\>

#### Defined in

[lib/src/api/clone-bay-mocking.service.ts:10](https://github.com/joonashak/nestjs-clone-bay/blob/37c762a/lib/src/api/clone-bay-mocking.service.ts#L10)

___

### loginWithEveId

▸ **loginWithEveId**(`session`, `eveId`): `Promise`\<`UserDocument`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `session` | `unknown` |
| `eveId` | `number` |

#### Returns

`Promise`\<`UserDocument`\>

#### Defined in

[lib/src/api/clone-bay-mocking.service.ts:14](https://github.com/joonashak/nestjs-clone-bay/blob/37c762a/lib/src/api/clone-bay-mocking.service.ts#L14)
