# Class: CloneBayException

Library's top-level exception that other custom exceptions should extend.

Currently extends Nest's `HttpException` but this could change as it might
not be appropriate considering GraphQL.

## Hierarchy

- `HttpException`

  ↳ **`CloneBayException`**

  ↳↳ [`InvalidConfigurationException`](InvalidConfigurationException.md)

## Constructors

### constructor

• **new CloneBayException**(`response`, `status`, `options?`): [`CloneBayException`](CloneBayException.md)

Instantiate a plain HTTP Exception.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `response` | `string` \| `Record`\<`string`, `any`\> | string, object describing the error condition or the error cause. |
| `status` | `number` | HTTP response status code. |
| `options?` | `HttpExceptionOptions` | An object used to add an error cause. |

#### Returns

[`CloneBayException`](CloneBayException.md)

**`Example`**

```ts
throw new HttpException()
throw new HttpException('message', HttpStatus.BAD_REQUEST)
throw new HttpException('custom message', HttpStatus.BAD_REQUEST, {
 cause: new Error('Cause Error'),
})
```

**`Usage Notes`**

The constructor arguments define the response and the HTTP response status code.
- The `response` argument (required) defines the JSON response body. alternatively, it can also be
 an error object that is used to define an error [cause](https://nodejs.org/en/blog/release/v16.9.0/#error-cause).
- The `status` argument (required) defines the HTTP Status Code.
- The `options` argument (optional) defines additional error options. Currently, it supports the `cause` attribute,
 and can be used as an alternative way to specify the error cause: `const error = new HttpException('description', 400, { cause: new Error() });`

By default, the JSON response body contains two properties:
- `statusCode`: the Http Status Code.
- `message`: a short description of the HTTP error by default; override this
by supplying a string in the `response` parameter.

To override the entire JSON response body, pass an object to the `createBody`
method. Nest will serialize the object and return it as the JSON response body.

The `status` argument is required, and should be a valid HTTP status code.
Best practice is to use the `HttpStatus` enum imported from `nestjs/common`.

#### Inherited from

HttpException.constructor

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:57

## Methods

### getResponse

▸ **getResponse**(): `string` \| `object`

#### Returns

`string` \| `object`

#### Inherited from

HttpException.getResponse

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:68

___

### getStatus

▸ **getStatus**(): `number`

#### Returns

`number`

#### Inherited from

HttpException.getStatus

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:69

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

HttpException.initCause

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:65

___

### initMessage

▸ **initMessage**(): `void`

#### Returns

`void`

#### Inherited from

HttpException.initMessage

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:66

___

### initName

▸ **initName**(): `void`

#### Returns

`void`

#### Inherited from

HttpException.initName

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:67

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

HttpException.captureStackTrace

#### Defined in

lib/node_modules/@types/node/globals.d.ts:4

___

### createBody

▸ **createBody**(`nil`, `message`, `statusCode`): `HttpExceptionBody`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nil` | ``""`` |
| `message` | `HttpExceptionBodyMessage` |
| `statusCode` | `number` |

#### Returns

`HttpExceptionBody`

#### Inherited from

HttpException.createBody

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:70

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

HttpException.createBody

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:71

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

HttpException.createBody

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:72

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

HttpException.extractDescriptionAndOptionsFrom

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:80

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

HttpException.getDescriptionFrom

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:73

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

HttpException.getHttpExceptionOptionsFrom

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:74

## Properties

### cause

• **cause**: `unknown`

#### Inherited from

HttpException.cause

#### Defined in

lib/node_modules/@nestjs/common/exceptions/http.exception.d.ts:58

___

### message

• **message**: `string`

#### Inherited from

HttpException.message

#### Defined in

docs/node_modules/typescript/lib/lib.es5.d.ts:1068

___

### name

• **name**: `string`

#### Inherited from

HttpException.name

#### Defined in

docs/node_modules/typescript/lib/lib.es5.d.ts:1067

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

HttpException.stack

#### Defined in

docs/node_modules/typescript/lib/lib.es5.d.ts:1069

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

HttpException.prepareStackTrace

#### Defined in

lib/node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

HttpException.stackTraceLimit

#### Defined in

lib/node_modules/@types/node/globals.d.ts:13
