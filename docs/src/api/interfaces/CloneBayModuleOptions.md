# Interface: CloneBayModuleOptions

## Properties

### afterLoginUrl

• `Optional` **afterLoginUrl**: `string`

URL whereto redirect user after successful login.

#### Defined in

[lib/src/clone-bay-module-options.interface.ts:6](https://github.com/joonashak/nestjs-clone-bay/blob/0cf8f89/lib/src/clone-bay-module-options.interface.ts#L6)

___

### dynamicConfigOverride

• `Optional` **dynamicConfigOverride**: `Partial`\<[`DynamicConfig`](../classes/DynamicConfig.md)\>

Override dynamic configuration values.

Use dynamic configuration easily when developing or if you don't need the
config values to change during run time. Given options completely override
their dynamic counterparts.

#### Defined in

[lib/src/clone-bay-module-options.interface.ts:15](https://github.com/joonashak/nestjs-clone-bay/blob/0cf8f89/lib/src/clone-bay-module-options.interface.ts#L15)
