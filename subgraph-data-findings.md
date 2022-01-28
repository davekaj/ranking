# AAVE

## RepayCount
- I queried for the first 1000 accounts, ordered by `repayCount`. It gets down to 15 repays. Not many DeFi users!
- skip the first 1000, and you get to 9 
- skip 5000, you get to 3 (so the would have 6000 total)
- If we start from 0, and skip 5000, we are still in the 1's for `repayCount`.
- Thus, it makes me believe that we gotta be at least 20000. I can confirm 12,000. And I would guess another 8000 between 1 and 3
- Many of the other actions will be similar to `RepayAccount`

## Liquidations
- `liquidationCall.principalAmount` is equal to what the Liquidator paid, to clear the bad debt
- `liquidationCall.collateralAmount` is the collateral the Liquidator is receiving. 
- See https://etherscan.io/tx/0x000e3f77a9a4f215a3cb0f4901ce4e9e9b360d63172a1a990c4016d031fb6e64
  - He paid 639.1 GUSD - `principalAmount`
  - Got back 0.3308 ETH - `collateralAmount`
  - He swapped 0.31855 ETH for 639.1 GUSD
  - Thus, he profited 0.011 ETH, or about $25 that day
- So with liquidations, you have a build in price oracle
- However it is not always accurate, say, if a stablecoin breaks the peg
- Also, if it is not a stablecoin that was lend or borrowed, and you get liquidated, then there is no way to know
- Obviously, any liquidations are from a BOT. I also don't really see the liquidation call being a valuable measurement, yet.
- Data
  - Interestinly I am seeing that about 4.4 million DAI are the biggest liquidation calls.
  - being submitted by flash bots
  - one guy profitted about $80,000, not including the flashbot fee. pretty good although i would have imagined it would be better


## Lifetime calculations
- We do calculate the lifetime values for the Reserve, which are of course in the reserves own token amount