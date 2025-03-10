# Class: CloneBayEsiApiService

Make authenticated ESI API requests.

Includes methods for GET, POST, PUT, and DELETE requests. The requests are
authenticated. Upon failing due to an expired access token, they will
automatically refresh the tokens and retry the failed request.

By default, the methods are limited to the ESI API URL and check that the
given character is owned by the given user. These protections can be turned
off in `EsiApiRequestOptions`.

See [EsiApiRequestOptions](../interfaces/EsiApiRequestOptions.md) for method param types.

## Methods

### delete

▸ **delete**\<`T`\>(`options`): `Promise`\<`AxiosResponse`\<`T`, `any`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`EsiApiRequestOptions`](../interfaces/EsiApiRequestOptions.md) |

#### Returns

`Promise`\<`AxiosResponse`\<`T`, `any`\>\>

#### Defined in

[lib/src/api/clone-bay-esi-api.service.ts:39](https://github.com/joonashak/nestjs-clone-bay/blob/main/lib/src/api/clone-bay-esi-api.service.ts#L39)

___

### get

▸ **get**\<`T`\>(`options`): `Promise`\<`AxiosResponse`\<`T`, `any`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`EsiApiRequestOptions`](../interfaces/EsiApiRequestOptions.md) |

#### Returns

`Promise`\<`AxiosResponse`\<`T`, `any`\>\>

#### Defined in

[lib/src/api/clone-bay-esi-api.service.ts:27](https://github.com/joonashak/nestjs-clone-bay/blob/main/lib/src/api/clone-bay-esi-api.service.ts#L27)

___

### post

▸ **post**\<`T`\>(`options`): `Promise`\<`AxiosResponse`\<`T`, `any`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`EsiApiRequestOptions`](../interfaces/EsiApiRequestOptions.md) |

#### Returns

`Promise`\<`AxiosResponse`\<`T`, `any`\>\>

#### Defined in

[lib/src/api/clone-bay-esi-api.service.ts:31](https://github.com/joonashak/nestjs-clone-bay/blob/main/lib/src/api/clone-bay-esi-api.service.ts#L31)

___

### put

▸ **put**\<`T`\>(`options`): `Promise`\<`AxiosResponse`\<`T`, `any`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`EsiApiRequestOptions`](../interfaces/EsiApiRequestOptions.md) |

#### Returns

`Promise`\<`AxiosResponse`\<`T`, `any`\>\>

#### Defined in

[lib/src/api/clone-bay-esi-api.service.ts:35](https://github.com/joonashak/nestjs-clone-bay/blob/main/lib/src/api/clone-bay-esi-api.service.ts#L35)
