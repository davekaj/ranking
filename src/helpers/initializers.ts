import { Address, Bytes, ethereum, log } from '@graphprotocol/graph-ts'
import {
  AToken,
  SToken,
  VToken,
  Reserve,
  User,
  UserReserve,
  ContractToPoolMapping,
  Protocol,
} from '../../generated/schema'
import {
  zeroAddress,
  zeroBD,
  zeroBI,
} from '../utils/converters'
import { getAtokenId, getReserveId, getUserReserveId } from '../utils/id-generation'
9
export function getProtocol(): Protocol {
  let protocolId = '1'
  let protocol = Protocol.load(protocolId)
  if (protocol == null) {
    protocol = new Protocol(protocolId)
    protocol.save()
  }
  return protocol as Protocol
}

export function getPoolByContract(event: ethereum.Event): string {
  let contractAddress = event.address.toHexString()
  let contractToPoolMapping = ContractToPoolMapping.load(contractAddress)
  if (contractToPoolMapping === null) {
    throw new Error(contractAddress + 'is not registered in ContractToPoolMapping')
  }
  return contractToPoolMapping.pool
}

export function getOrInitUser(address: Address): User {
  let user = User.load(address.toHexString())
  if (!user) {
    user = new User(address.toHexString())
    user.borrowedReservesCount = 0
    user.unclaimedRewards = zeroBI()
    user.incentivesLastUpdated = 0
    user.lifetimeRewards = zeroBI()
    user.depositCount = 0
    user.redeemUnderlyingCount = 0
    user.borrowCount = 0
    user.repayCount = 0
    user.liquidationCallCount = 0
    user.incentivizedActionsCount = 0
    user.claimIncentivesCount = 0
    user.save()
  }
  return user as User
}

function initUserReserve(
  underlyingAssetAddress: Address,
  userAddress: Address,
  poolId: string,
  reserveId: string,
): UserReserve {
  let userReserveId = getUserReserveId(userAddress, underlyingAssetAddress, poolId)
  let userReserve = UserReserve.load(userReserveId)
  if (userReserve === null) {
    userReserve = new UserReserve(userReserveId)
    userReserve.pool = poolId
    // userReserve.usageAsCollateralEnabledOnUser = false
    userReserve.scaledATokenBalance = zeroBI()
    userReserve.scaledVariableDebt = zeroBI()
    userReserve.principalStableDebt = zeroBI()
    userReserve.currentATokenBalance = zeroBI()
    userReserve.currentVariableDebt = zeroBI()
    userReserve.currentStableDebt = zeroBI()
    userReserve.stableBorrowRate = zeroBI()
    userReserve.oldStableBorrowRate = zeroBI()
    userReserve.currentTotalDebt = zeroBI()
    userReserve.variableBorrowIndex = zeroBI()
    userReserve.liquidityRate = zeroBI()
    userReserve.stableBorrowLastUpdateTimestamp = 0
    userReserve.lastUpdateTimestamp = 0

    let user = getOrInitUser(userAddress)
    userReserve.user = user.id

    userReserve.reserve = reserveId
  }
  return userReserve as UserReserve
}

export function getOrInitUserReserveWithIds(
  userAddress: Address,
  underlyingAssetAddress: Address,
  pool: string,
): UserReserve {
  let reserveId = getReserveId(underlyingAssetAddress, pool)
  return initUserReserve(underlyingAssetAddress, userAddress, pool, reserveId)
}

export function getOrInitUserReserve(
  _user: Address,
  _underlyingAsset: Address,
  event: ethereum.Event,
): UserReserve {
  let poolId = getPoolByContract(event)
  let reserve = getOrInitReserve(_underlyingAsset, event)
  return initUserReserve(_underlyingAsset, _user, poolId, reserve.id)
}

export function getOrInitReserve(underlyingAsset: Address, event: ethereum.Event): Reserve {
  let poolId = getPoolByContract(event)
  let reserveId = getReserveId(underlyingAsset, poolId)
  let reserve = Reserve.load(reserveId)

  if (reserve === null) {
    reserve = new Reserve(reserveId)
    reserve.underlyingAsset = underlyingAsset
    reserve.pool = poolId
    reserve.symbol = ''
    reserve.name = ''
    reserve.decimals = 0
    // reserve.usageAsCollateralEnabled = false
    reserve.borrowingEnabled = false
    reserve.stableBorrowRateEnabled = false
    reserve.isActive = false
    reserve.isFrozen = false
    reserve.baseLTVasCollateral = zeroBI()
    reserve.reserveLiquidationThreshold = zeroBI()
    reserve.reserveLiquidationBonus = zeroBI()
    reserve.reserveInterestRateStrategy = new Bytes(1)
    reserve.baseVariableBorrowRate = zeroBI()
    reserve.optimalUtilisationRate = zeroBI()
    reserve.variableRateSlope1 = zeroBI()
    reserve.variableRateSlope2 = zeroBI()
    reserve.stableRateSlope1 = zeroBI()
    reserve.stableRateSlope2 = zeroBI()
    reserve.utilizationRate = zeroBD()
    reserve.totalLiquidity = zeroBI()
    reserve.totalATokenSupply = zeroBI()
    reserve.totalLiquidityAsCollateral = zeroBI()
    reserve.availableLiquidity = zeroBI()
    reserve.liquidityRate = zeroBI()
    reserve.variableBorrowRate = zeroBI()
    reserve.stableBorrowRate = zeroBI()
    reserve.averageStableRate = zeroBI() // TODO: where do i get this?
    reserve.liquidityIndex = zeroBI()
    reserve.variableBorrowIndex = zeroBI()
    reserve.reserveFactor = zeroBI() // TODO: is default 0?
    reserve.aToken = zeroAddress().toHexString()
    reserve.vToken = zeroAddress().toHexString()
    reserve.sToken = zeroAddress().toHexString()

    reserve.totalScaledVariableDebt = zeroBI()
    reserve.totalCurrentVariableDebt = zeroBI()
    reserve.totalPrincipalStableDebt = zeroBI()
    reserve.totalDeposits = zeroBI()

    reserve.lifetimePrincipalStableDebt = zeroBI()
    reserve.lifetimeScaledVariableDebt = zeroBI()
    reserve.lifetimeCurrentVariableDebt = zeroBI()

    reserve.lifetimeLiquidity = zeroBI()
    reserve.lifetimeBorrows = zeroBI()
    reserve.lifetimeRepayments = zeroBI()
    reserve.lifetimeWithdrawals = zeroBI()
    reserve.lifetimeLiquidated = zeroBI()
    reserve.lifetimeFlashLoans = zeroBI()
    reserve.lifetimeFlashLoanPremium = zeroBI()

    reserve.stableDebtLastUpdateTimestamp = 0
    reserve.lastUpdateTimestamp = 0

    reserve.lifetimeReserveFactorAccrued = zeroBI()
    reserve.lifetimeDepositorsInterestEarned = zeroBI()
  }
  return reserve as Reserve
}

export function getOrInitSToken(sTokenAddress: Address): SToken {
  let sTokenId = getAtokenId(sTokenAddress)
  let sToken = SToken.load(sTokenId)
  if (!sToken) {
    sToken = new SToken(sTokenId)
    sToken.underlyingAssetAddress = new Bytes(1)
    sToken.tokenContractImpl = zeroAddress()
    sToken.pool = ''
    sToken.underlyingAssetDecimals = 18
  }
  return sToken as SToken
}

export function getOrInitVToken(vTokenAddress: Address): VToken {
  let vTokenId = getAtokenId(vTokenAddress)
  let vToken = VToken.load(vTokenId)
  if (!vToken) {
    vToken = new VToken(vTokenId)
    vToken.underlyingAssetAddress = new Bytes(1)
    vToken.tokenContractImpl = zeroAddress()
    vToken.pool = ''
    vToken.underlyingAssetDecimals = 18
  }
  return vToken as VToken
}

export function getOrInitAToken(aTokenAddress: Address): AToken {
  let aTokenId = getAtokenId(aTokenAddress)
  let aToken = AToken.load(aTokenId)
  if (!aToken) {
    aToken = new AToken(aTokenId)
    aToken.underlyingAssetAddress = new Bytes(1)
    aToken.tokenContractImpl = zeroAddress()
    aToken.pool = ''
    aToken.underlyingAssetDecimals = 18
  }
  return aToken as AToken
}

export function createMapContractToPool(_contractAddress: Address, pool: string): void {
  let contractAddress = _contractAddress.toHexString()
  let contractToPoolMapping = ContractToPoolMapping.load(contractAddress)

  if (contractToPoolMapping) {
    log.error('contract {} is already registered in the protocol', [contractAddress])
    throw new Error(contractAddress + 'is already registered in the protocol')
  }
  contractToPoolMapping = new ContractToPoolMapping(contractAddress)
  contractToPoolMapping.pool = pool
  contractToPoolMapping.save()
}
