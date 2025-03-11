# Function: CurrentUserId

▸ **CurrentUserId**(`...dataOrPipes`): `ParameterDecorator`

Inject authenticated user's ID into method argument.

This is Clone Bay's internal UUID, not EVE/ESI ID.

Accepts an optional `options` configuration object to allow a missing user.
If `options.nullable` is set to `true`, this decorator will return `null` for
a missing user. Otherwise throws HTTP 401.

### Examples:

```ts
@Get("hello")
async hello(@CurrentUserId() userId: string) {
  // Will throw if user is not found.
}
```

```ts
@Get("hello")
async hello(@CurrentUserId({ nullable: true }) userId: string | undefined) {
  // `userId` is `undefined` if not authenticated or not found.
  // No error is thrown.
}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `...dataOrPipes` | (`CurrentUserIdDecoratorOptions` \| `PipeTransform`\<`any`, `any`\> \| `Type`\<`PipeTransform`\<`any`, `any`\>\>)[] |

#### Returns

`ParameterDecorator`

`string | null`

#### Defined in

[lib/src/decorators/current-user-id.decorator.ts:55](https://github.com/joonashak/nestjs-clone-bay/blob/main/lib/src/decorators/current-user-id.decorator.ts#L55)
