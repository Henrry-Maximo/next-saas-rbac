import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability'

import { User } from './models/user'
import { permissions } from './permissions'
import { ProjectSubject } from './subjects/project'
import { UserSubject } from './subjects/user'

// ações (permissões definição)
// mange/all = atributos internos CASL
// const actions = ['manage', 'create', 'invite', 'delete'] as const
// const subjects = ['User', 'Project', 'all'] as const

type AppAbilities = UserSubject | ProjectSubject | ['manage', 'all']
// [
//   (typeof actions)[number],
//   (
//     | (typeof subjects)[number]
//     | ForcedSubject<Exclude<(typeof subjects)[number], 'all'>>
//   ),
// ]

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Permissions for role ${user.role} not found.`)
  }

  permissions[user.role](user, builder)
  const ability = builder.build()
  return ability

  // can('invite', 'User')
  // cannot('delete', 'User')

  // export const ability = build()
}

// const { build, can, cannot } = new AbilityBuilder(createAppAbility)

// can('invite', 'User')
// cannot('delete', 'User') // desnecessário

// export const ability = build()
