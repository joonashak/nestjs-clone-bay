# Class: InvalidConfigurationException

## Hierarchy

- [`CloneBayException`](CloneBayException.md)

  ↳ **`InvalidConfigurationException`**

## Constructors

### constructor

• **new InvalidConfigurationException**(): [`InvalidConfigurationException`](InvalidConfigurationException.md)

#### Returns

[`InvalidConfigurationException`](InvalidConfigurationException.md)

#### Overrides

[CloneBayException](CloneBayException.md).[constructor](CloneBayException.md#constructor)

#### Defined in

[lib/src/exceptions/invalid-configuration.exception.ts:8](https://github.com/joonashak/nestjs-clone-bay/blob/main/lib/src/exceptions/invalid-configuration.exception.ts#L8)

## Methods

### getResponse

▸ **getResponse**(): `string` \| `object`

#### Returns

`string` \| `object`

#### Inherited from

[CloneBayException](CloneBayException.md).[getResponse](CloneBayException.md#getresponse)

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:72

___

### getStatus

▸ **getStatus**(): `number`

#### Returns

`number`

#### Inherited from

[CloneBayException](CloneBayException.md).[getStatus](CloneBayException.md#getstatus)

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:73

___

### initCause

▸ **initCause**(): `void`

Configures error chaining support

#### Returns

`void`

**`See`**

 - https://nodejs.org/en/blog/release/v16.9.0/#error-cause
 - https://github.com/microsoft/TypeScript/issues/45167

#### Inherited from

[CloneBayException](CloneBayException.md).[initCause](CloneBayException.md#initcause)

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:69

___

### initMessage

▸ **initMessage**(): `void`

#### Returns

`void`

#### Inherited from

[CloneBayException](CloneBayException.md).[initMessage](CloneBayException.md#initmessage)

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:70

___

### initName

▸ **initName**(): `void`

#### Returns

`void`

#### Inherited from

[CloneBayException](CloneBayException.md).[initName](CloneBayException.md#initname)

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:71

___

### captureStackTrace

▸ **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

[CloneBayException](CloneBayException.md).[captureStackTrace](CloneBayException.md#capturestacktrace)

#### Defined in

lib/node_modules/@types/node/globals.d.ts:136

___

### createBody

▸ **createBody**(`nil`, `message`, `statusCode`): `HttpExceptionBody`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nil` | ``null`` \| ``""`` |
| `message` | `HttpExceptionBodyMessage` |
| `statusCode` | `number` |

#### Returns

`HttpExceptionBody`

#### Inherited from

[CloneBayException](CloneBayException.md).[createBody](CloneBayException.md#createbody)

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:74

▸ **createBody**(`message`, `error`, `statusCode`): `HttpExceptionBody`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `HttpExceptionBodyMessage` |
| `error` | `string` |
| `statusCode` | `number` |

#### Returns

`HttpExceptionBody`

#### Inherited from

[CloneBayException](CloneBayException.md).[createBody](CloneBayException.md#createbody)

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:75

▸ **createBody**\<`Body`\>(`custom`): `Body`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Body` | extends `Record`\<`string`, `unknown`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `custom` | `Body` |

#### Returns

`Body`

#### Inherited from

[CloneBayException](CloneBayException.md).[createBody](CloneBayException.md#createbody)

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:76

___

### extractDescriptionAndOptionsFrom

▸ **extractDescriptionAndOptionsFrom**(`descriptionOrOptions`): `DescriptionAndOptions`

Utility method used to extract the error description and httpExceptionOptions from the given argument.
This is used by inheriting classes to correctly parse both options.

#### Parameters

| Name | Type |
| :------ | :------ |
| `descriptionOrOptions` | `string` \| `HttpExceptionOptions` |

#### Returns

`DescriptionAndOptions`

the error description and the httpExceptionOptions as an object.

#### Inherited from

[CloneBayException](CloneBayException.md).[extractDescriptionAndOptionsFrom](CloneBayException.md#extractdescriptionandoptionsfrom)

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:84

___

### getDescriptionFrom

▸ **getDescriptionFrom**(`descriptionOrOptions`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `descriptionOrOptions` | `string` \| `HttpExceptionOptions` |

#### Returns

`string`

#### Inherited from

[CloneBayException](CloneBayException.md).[getDescriptionFrom](CloneBayException.md#getdescriptionfrom)

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:77

___

### getHttpExceptionOptionsFrom

▸ **getHttpExceptionOptionsFrom**(`descriptionOrOptions`): `HttpExceptionOptions`

#### Parameters

| Name | Type |
| :------ | :------ |
| `descriptionOrOptions` | `string` \| `HttpExceptionOptions` |

#### Returns

`HttpExceptionOptions`

#### Inherited from

[CloneBayException](CloneBayException.md).[getHttpExceptionOptionsFrom](CloneBayException.md#gethttpexceptionoptionsfrom)

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:78

## Properties

### cause

• **cause**: `unknown`

Exception cause. Indicates the specific original cause of the error.
It is used when catching and re-throwing an error with a more-specific or useful error message in order to still have access to the original error.

#### Inherited from

[CloneBayException](CloneBayException.md).[cause](CloneBayException.md#cause)

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:28

___

### message

• **message**: `string`

#### Inherited from

[CloneBayException](CloneBayException.md).[message](CloneBayException.md#message)

#### Defined in

docs/node_modules/typescript/lib/lib.es5.d.ts:1077

___

### name

• **name**: `string`

#### Inherited from

[CloneBayException](CloneBayException.md).[name](CloneBayException.md#name)

#### Defined in

docs/node_modules/typescript/lib/lib.es5.d.ts:1076

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

[CloneBayException](CloneBayException.md).[stack](CloneBayException.md#stack)

#### Defined in

docs/node_modules/typescript/lib/lib.es5.d.ts:1078

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Type declaration

▸ (`err`, `stackTraces`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

[CloneBayException](CloneBayException.md).[prepareStackTrace](CloneBayException.md#preparestacktrace)

#### Defined in

lib/node_modules/@types/node/globals.d.ts:143

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[CloneBayException](CloneBayException.md).[stackTraceLimit](CloneBayException.md#stacktracelimit)

#### Defined in

lib/node_modules/@types/node/globals.d.ts:145
