import { Address, ethereum, BigInt } from '@graphprotocol/graph-ts'
import {
  RewardsAccrued,
  RewardsClaimed,
} from '../../../generated/templates/AaveIncentivesController/AaveIncentivesController'
import { ClaimIncentiveCall, IncentivizedAction } from '../../../generated/schema'
import { getOrInitUser } from '../../helpers/initializers'
import { getHistoryEntityId } from '../../utils/id-generation'

export function handleRewardsAccrued(event: RewardsAccrued): void {
  let userAddress = event.params.user
  let amount = event.params.amount
  let incentivesController = event.address

  let user = getOrInitUser(userAddress)
  user.unclaimedRewards = user.unclaimedRewards.plus(amount)
  user.lifetimeRewards = user.lifetimeRewards.plus(amount)
  user.incentivesLastUpdated = event.block.timestamp.toI32()
  user.incentivizedActionsCount = user.incentivizedActionsCount + 1
  user.save()

  let incentivizedAction = new IncentivizedAction(getHistoryEntityId(event))
  incentivizedAction.incentivesController = incentivesController.toHexString()
  incentivizedAction.user = userAddress.toHexString()
  incentivizedAction.amount = amount
  incentivizedAction.save()
}

export function handleRewardsClaimedCommon(
  userAddress: Address,
  incentivesController: Address,
  amount: BigInt,
  event: ethereum.Event,
): void {
  let user = getOrInitUser(userAddress)
  user.unclaimedRewards = user.unclaimedRewards.minus(amount)
  user.incentivesLastUpdated = event.block.timestamp.toI32()
  user.claimIncentivesCount = user.claimIncentivesCount + 1
  user.save()

  let claimIncentive = new ClaimIncentiveCall(getHistoryEntityId(event))
  claimIncentive.incentivesController = incentivesController.toHexString()
  claimIncentive.user = userAddress.toHexString()
  claimIncentive.amount = amount
  claimIncentive.save()
}

// We can use this event with ethereum template because it will be the only event with that name for ethereum
// - for ethereum this event has claimer field
// - for matic this event does not have the claimer field. the event with claimer field is on ./matic
// if at some point we want to operate with the claimer field, we will need to do it on the ./matic and create a ./ethereum matic
// to still have the original event without claimer
export function handleRewardsClaimed(event: RewardsClaimed): void {
  handleRewardsClaimedCommon(event.params.user, event.address, event.params.amount, event)
}
