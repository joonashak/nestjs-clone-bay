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

Disabling new user registration does not prevent users from registering
alts.

_Default: `true`_

#### Defined in

[lib/src/config/dynamic-config.model.ts:31](https://github.com/joonashak/nestjs-clone-bay/blob/1a4ecf31d03284a98989ab940da71aae76589b7b/lib/src/config/dynamic-config.model.ts#L31)

___

### allowedAlliances

• **allowedAlliances**: `number`[]

#### Defined in

[lib/src/config/dynamic-config.model.ts:16](https://github.com/joonashak/nestjs-clone-bay/blob/1a4ecf31d03284a98989ab940da71aae76589b7b/lib/src/config/dynamic-config.model.ts#L16)

___

### allowedCharacters

• **allowedCharacters**: `number`[]

#### Defined in

[lib/src/config/dynamic-config.model.ts:10](https://github.com/joonashak/nestjs-clone-bay/blob/1a4ecf31d03284a98989ab940da71aae76589b7b/lib/src/config/dynamic-config.model.ts#L10)

___

### allowedCorporations

• **allowedCorporations**: `number`[]

#### Defined in

[lib/src/config/dynamic-config.model.ts:13](https://github.com/joonashak/nestjs-clone-bay/blob/1a4ecf31d03284a98989ab940da71aae76589b7b/lib/src/config/dynamic-config.model.ts#L13)

___

### applyAllowlistsToExistingUsers

• **applyAllowlistsToExistingUsers**: `boolean`

Controls whether authentication allowlists are applied to existing users.

Turning this _OFF_ effectively makes the authentication allowlists filter
who can register as a new user.

When this is _ON_, the restriction will also be imposed on local logins,
not only on SSO authentication. However, this is applied only on the main
character, possible alts are not checked.

_Default: `false`_

#### Defined in

[lib/src/config/dynamic-config.model.ts:46](https://github.com/joonashak/nestjs-clone-bay/blob/1a4ecf31d03284a98989ab940da71aae76589b7b/lib/src/config/dynamic-config.model.ts#L46)
