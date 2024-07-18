import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  ForcedSubject,
  MongoAbility,
} from '@casl/ability'

// ações (permissões definição)
// mange/all = atributos internos CASL
const actions = ['manage', 'invite', 'delete'] as const
const subjects = ['User', 'all'] as const

type AppAbilities = [
  (typeof actions)[number],
  (
    | (typeof subjects)[number]
    | ForcedSubject<Exclude<(typeof subjects)[number], 'all'>>
  ),
]

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

const { build, can, cannot } = new AbilityBuilder(createAppAbility)

can('invite', 'User')
cannot('delete', 'User') // desnecessário

export const ability = build()
