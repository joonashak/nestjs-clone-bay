# Function: RequirePolicies

▸ **RequirePolicies**(`...handlers`): \<TFunction, Y\>(`target`: `object` \| `TFunction`, `propertyKey?`: `string` \| `symbol`, `descriptor?`: `TypedPropertyDescriptor`\<`Y`\>) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...handlers` | `PolicyHandler`[] |

#### Returns

`fn`

▸ \<`TFunction`, `Y`\>(`target`, `propertyKey?`, `descriptor?`): `void`

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

#### Defined in

[lib/src/decorators/require-policies.decorator.ts:6](https://github.com/joonashak/nestjs-clone-bay/blob/1a4ecf31d03284a98989ab940da71aae76589b7b/lib/src/decorators/require-policies.decorator.ts#L6)
