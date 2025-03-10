# Interface: CloneBayModuleOptions

## Properties

### afterLoginUrl

• `Optional` **afterLoginUrl**: `string`

URL whereto redirect user after successful login.

#### Defined in

[lib/src/clone-bay-module-options.interface.ts:10](https://github.com/joonashak/nestjs-clone-bay/blob/main/lib/src/clone-bay-module-options.interface.ts#L10)

___

### dynamicConfigOverride

• `Optional` **dynamicConfigOverride**: `Partial`\<[`DynamicConfig`](../classes/DynamicConfig.md)\>

Override dynamic configuration values.

Use dynamic configuration easily when developing or if you don't need the
config values to change during run time. Given options completely override
their dynamic counterparts.

#### Defined in

[lib/src/clone-bay-module-options.interface.ts:30](https://github.com/joonashak/nestjs-clone-bay/blob/main/lib/src/clone-bay-module-options.interface.ts#L30)

___

### esiBaseUrl

• `Optional` **esiBaseUrl**: `string`

Optionally override default ESI API host.

Use this to direct ESI API calls to a custom host. Overrides only the host
part of URL. Useful for E2E testing.

Note that this does not affect SSO authentication. That can be configured
via `nestjs-eve-auth` options.

#### Defined in

[lib/src/clone-bay-module-options.interface.ts:21](https://github.com/joonashak/nestjs-clone-bay/blob/main/lib/src/clone-bay-module-options.interface.ts#L21)
