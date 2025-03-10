# Function: CurrentUser

▸ **CurrentUser**(`...dataOrPipes`): `ParameterDecorator`

Inject authenticated user into method argument.

Accepts an optional `options` configuration object to allow a missing user.
If `options.nullable` is set to `true`, this decorator will return `null` for
a missing user. Otherwise throws HTTP 401.

### Examples:

```ts
@Get("hello")
async hello(@CurrentUser() user: User) {
  // Will throw if user is not found.
}
```

```ts
@Get("hello")
async hello(@CurrentUser({ nullable: true }) user: User) {
  // `user` is `null` if not authenticated or not found. No error is thrown.
}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `...dataOrPipes` | (`PipeTransform`\<`any`, `any`\> \| `Type`\<`PipeTransform`\<`any`, `any`\>\> \| \{ `nullable?`: `boolean`  })[] |

#### Returns

`ParameterDecorator`

`User | null`

#### Defined in

[lib/src/decorators/current-user.decorator.ts:31](https://github.com/joonashak/nestjs-clone-bay/blob/main/lib/src/decorators/current-user.decorator.ts#L31)
