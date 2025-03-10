# Interface: EsiApiRequestOptions

## Properties

### allowAnyCharacter

• `Optional` **allowAnyCharacter**: `boolean`

Allows executing requests without checking that the given character is
owned by the given user. Must be explicitly set to `true` if `userID` is
not given.

**If you disable this check it is your responsibility to ensure security.
The access token for the given `characterEveId` will be used regardless of
who it belongs to!**

#### Defined in

[lib/src/types/esi-api-request-options.interface.ts:52](https://github.com/joonashak/nestjs-clone-bay/blob/main/lib/src/types/esi-api-request-options.interface.ts#L52)

___

### allowUnsafeUrl

• `Optional` **allowUnsafeUrl**: `boolean`

Allow any string as URL.

Default `false`. **Disabling this may cause tokens to leak!**

#### Defined in

[lib/src/types/esi-api-request-options.interface.ts:42](https://github.com/joonashak/nestjs-clone-bay/blob/main/lib/src/types/esi-api-request-options.interface.ts#L42)

___

### axiosConfig

• `Optional` **axiosConfig**: `AxiosRequestConfig`\<`any`\>

Optional Axios configuration.

Authorization header is automatically appended to this.

#### Defined in

[lib/src/types/esi-api-request-options.interface.ts:36](https://github.com/joonashak/nestjs-clone-bay/blob/main/lib/src/types/esi-api-request-options.interface.ts#L36)

___

### characterEveId

• **characterEveId**: `number`

EVE ID of the character whose ESI access token should be used to
authenticate the request.

#### Defined in

[lib/src/types/esi-api-request-options.interface.ts:11](https://github.com/joonashak/nestjs-clone-bay/blob/main/lib/src/types/esi-api-request-options.interface.ts#L11)

___

### data

• `Optional` **data**: `object`

Data payload for POST and PUT requests.

#### Defined in

[lib/src/types/esi-api-request-options.interface.ts:30](https://github.com/joonashak/nestjs-clone-bay/blob/main/lib/src/types/esi-api-request-options.interface.ts#L30)

___

### url

• **url**: `string`

Request URL.

Given value must start with `"https://esi.evetech.net/"` to guard against
accidental token leaks. This behavior can be disabled with
`allowUnsafeUrl`.

#### Defined in

[lib/src/types/esi-api-request-options.interface.ts:19](https://github.com/joonashak/nestjs-clone-bay/blob/main/lib/src/types/esi-api-request-options.interface.ts#L19)

___

### userId

• `Optional` **userId**: `string`

Owner of the character.

This is a convenience that ensures users cannot use access tokens not
belonging to them. Can be turned off with `allowAnyCharacter`.

#### Defined in

[lib/src/types/esi-api-request-options.interface.ts:26](https://github.com/joonashak/nestjs-clone-bay/blob/main/lib/src/types/esi-api-request-options.interface.ts#L26)
