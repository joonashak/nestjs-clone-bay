# Class: DynamicConfig

## Constructors

### constructor

• **new DynamicConfig**(): [`DynamicConfig`](DynamicConfig.md)

#### Returns

[`DynamicConfig`](DynamicConfig.md)

## Properties

### allowNewUsers

• **allowNewUsers**: `boolean`

Controls new user registration.

When an unknown user successfully authenticates through SSO, they are
registered and a new user is created within `nestjs-clone-bay`, if this is
set to `true`. Authentication allowlists must still be satisfied.

_Default: `true`_

#### Defined in

[src/config/dynamic-config.model.ts:26](https://github.com/joonashak/nestjs-clone-bay/blob/92443ec/lib/src/config/dynamic-config.model.ts#L26)

___

### allowedAlliances

• **allowedAlliances**: `number`[]

#### Defined in

[src/config/dynamic-config.model.ts:14](https://github.com/joonashak/nestjs-clone-bay/blob/92443ec/lib/src/config/dynamic-config.model.ts#L14)

___

### allowedCharacters

• **allowedCharacters**: `number`[]

#### Defined in

[src/config/dynamic-config.model.ts:8](https://github.com/joonashak/nestjs-clone-bay/blob/92443ec/lib/src/config/dynamic-config.model.ts#L8)

___

### allowedCorporations

• **allowedCorporations**: `number`[]

#### Defined in

[src/config/dynamic-config.model.ts:11](https://github.com/joonashak/nestjs-clone-bay/blob/92443ec/lib/src/config/dynamic-config.model.ts#L11)

___

### applyAllowlistsToExistingUsers

• **applyAllowlistsToExistingUsers**: `boolean`

Controls whether authentication allowlists are applied to existing users.

Turning this _OFF_ effectively makes the authentication allowlists filter
who can register as a new user.

When this is _ON_, the restriction will also be imposed on local logins,
not only on SSO authentication.

_Default: `false`_

#### Defined in

[src/config/dynamic-config.model.ts:40](https://github.com/joonashak/nestjs-clone-bay/blob/92443ec/lib/src/config/dynamic-config.model.ts#L40)
