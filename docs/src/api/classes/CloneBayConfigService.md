# Class: CloneBayConfigService

Control `nestjs-clone-bay` configuration during run time.

This service exposes methods for controlling dynamic configuration. The
dynamic configuration is persisted over app restarts, but unlike static
configuration, does not require app restart to take effect.

Changes made to dynamic configuration via this service take effect
immediately.

## Methods

### getDynamicConfig

▸ **getDynamicConfig**(): `Promise`\<[`DynamicConfig`](DynamicConfig.md)\>

Get current dynamic configuration.

#### Returns

`Promise`\<[`DynamicConfig`](DynamicConfig.md)\>

#### Defined in

[lib/src/api/clone-bay-config.service.ts:29](https://github.com/joonashak/nestjs-clone-bay/blob/1a4ecf31d03284a98989ab940da71aae76589b7b/lib/src/api/clone-bay-config.service.ts#L29)

___

### setAllowedAlliances

▸ **setAllowedAlliances**(`allowedAlliances`): `Promise`\<`void`\>

Set authentication allowlist of alliances.

Authentication is allowed if authenticating character is a member of an
alliance included in this allowlist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `allowedAlliances` | `number`[] | EVE ID's of allowed alliances. |

#### Returns

`Promise`\<`void`\>

#### Defined in

[lib/src/api/clone-bay-config.service.ts:65](https://github.com/joonashak/nestjs-clone-bay/blob/1a4ecf31d03284a98989ab940da71aae76589b7b/lib/src/api/clone-bay-config.service.ts#L65)

___

### setAllowedCharacters

▸ **setAllowedCharacters**(`allowedCharacters`): `Promise`\<`void`\>

Set authentication allowlist of characters.

Authentication is allowed if authenticating character is included in this
allowlist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `allowedCharacters` | `number`[] | EVE ID's of allowed characters. |

#### Returns

`Promise`\<`void`\>

#### Defined in

[lib/src/api/clone-bay-config.service.ts:41](https://github.com/joonashak/nestjs-clone-bay/blob/1a4ecf31d03284a98989ab940da71aae76589b7b/lib/src/api/clone-bay-config.service.ts#L41)

___

### setAllowedCorporations

▸ **setAllowedCorporations**(`allowedCorporations`): `Promise`\<`void`\>

Set authentication allowlist of corporations.

Authentication is allowed if authenticating character is a member of a
corporation included in this allowlist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `allowedCorporations` | `number`[] | EVE ID's of allowed corporations. |

#### Returns

`Promise`\<`void`\>

#### Defined in

[lib/src/api/clone-bay-config.service.ts:53](https://github.com/joonashak/nestjs-clone-bay/blob/1a4ecf31d03284a98989ab940da71aae76589b7b/lib/src/api/clone-bay-config.service.ts#L53)
