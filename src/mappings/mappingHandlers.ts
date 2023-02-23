import {
  NewGravatarEvent,
  UpdatedGravatarEvent,
} from "../types/ethers-contracts/Gravatar";
import { Gravatar } from "../types";

export async function handleNewGravatar(
  event: NewGravatarEvent
): Promise<void> {
  let gravatar = new Gravatar(event.args.id.toHexString());
  gravatar.owner = event.args.owner;
  gravatar.displayName = event.args.displayName;
  gravatar.imageUrl = event.args.imageUrl;
  await gravatar.save();
}

export async function handleUpdatedGravatar(
  event: UpdatedGravatarEvent
): Promise<void> {
  let id = event.args.id.toHexString();

  // We first check if the Gravatar already exists, if not we create it
  let gravatar = await Gravatar.get(id);
  if (gravatar == null || gravatar == undefined) {
    gravatar = new Gravatar(id);
  }
  // Update with new data
  gravatar.owner = event.args.owner;
  gravatar.displayName = event.args.displayName;
  gravatar.imageUrl = event.args.imageUrl;
  await gravatar.save();
}
