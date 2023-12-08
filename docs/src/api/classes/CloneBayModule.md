# Class: CloneBayModule

## Hierarchy

- `CloneBayModuleDefinition`

  ↳ **`CloneBayModule`**

## Constructors

### constructor

• **new CloneBayModule**(): [`CloneBayModule`](CloneBayModule.md)

#### Returns

[`CloneBayModule`](CloneBayModule.md)

#### Inherited from

CloneBayModuleDefinition.constructor

#### Defined in

node_modules/@nestjs/common/module-utils/interfaces/configurable-module-cls.interface.d.ts:12

## Properties

### forRoot

▪ `Static` **forRoot**: (`options`: [`CloneBayOptions`](../interfaces/CloneBayOptions.md) & `Partial`\<{}\>) => `DynamicModule`

#### Type declaration

▸ (`options`): `DynamicModule`

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`CloneBayOptions`](../interfaces/CloneBayOptions.md) & `Partial`\<{}\> |

##### Returns

`DynamicModule`

#### Inherited from

CloneBayModuleDefinition.forRoot

___

### forRootAsync

▪ `Static` **forRootAsync**: (`options`: `ConfigurableModuleAsyncOptions`\<[`CloneBayOptions`](../interfaces/CloneBayOptions.md), ``"create"``\> & `Partial`\<{}\>) => `DynamicModule`

#### Type declaration

▸ (`options`): `DynamicModule`

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `ConfigurableModuleAsyncOptions`\<[`CloneBayOptions`](../interfaces/CloneBayOptions.md), ``"create"``\> & `Partial`\<{}\> |

##### Returns

`DynamicModule`

#### Inherited from

CloneBayModuleDefinition.forRootAsync
