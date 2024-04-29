# Function: RequireAuthentication

▸ **RequireAuthentication**(): \<TFunction, Y\>(`target`: `object` \| `TFunction`, `propertyKey?`: `string` \| `symbol`, `descriptor?`: `TypedPropertyDescriptor`\<`Y`\>) => `void`

#### Returns

`fn`

▸ \<`TFunction`, `Y`\>(`target`, `propertyKey?`, `descriptor?`): `void`

Function that returns a new decorator that applies all decorators provided by param

Useful to build new decorators (or a decorator factory) encapsulating multiple decorators related with the same feature

##### Type parameters

| Name | Type |
| :------ | :------ |
| `TFunction` | extends `Function` |
| `Y` | `Y` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` \| `TFunction` |
| `propertyKey?` | `string` \| `symbol` |
| `descriptor?` | `TypedPropertyDescriptor`\<`Y`\> |

##### Returns

`void`

**`Public Api`**

#### Defined in

[lib/src/decorators/require-authentication.decorator.ts:4](https://github.com/joonashak/nestjs-clone-bay/blob/0cf8f89/lib/src/decorators/require-authentication.decorator.ts#L4)
