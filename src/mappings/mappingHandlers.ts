// Copyright 2020-2022 OnFinality Limited authors & contributors

import { NewGravatarEvent, UpdatedGravatarEvent } from '../ethers-contracts/Gravity'
import { Gravatar } from '../types'

export async function handleNewGravatar(event: NewGravatarEvent): Promise<void> {
  let gravatar = new Gravatar(event.args.id.toHexString())
  gravatar.owner = event.args.owner
  gravatar.displayName = event.args.displayName
  gravatar.imageUrl = event.args.imageUrl
  await gravatar.save()
}

export async function handleUpdatedGravatar(event: UpdatedGravatarEvent): Promise<void> {
  let id = event.args.id.toHexString()
  let gravatar = await Gravatar.get(id)
  if (gravatar == null || gravatar == undefined) {
    gravatar = new Gravatar(id)
  }
  gravatar.owner = event.args.owner
  gravatar.displayName = event.args.displayName
  gravatar.imageUrl = event.args.imageUrl
  await gravatar.save()
}
