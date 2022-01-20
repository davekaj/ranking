# Open Ranking Algorithm
Open Ranking Algorithm creates "rankings" or "scores" for Ethereum accounts based on past transaction history.
It leverages Subgraphs a lot, but there will be "stitching" together of data from Subgraphs, and other
data sources, in order to create useful rankings.

## Subgraph(s)
AAVE Subgraph running [here](https://thegraph.com/hosted-service/subgraph/davekaj/rankings?version=current).
# How to Score the rankings
There are a few basic ways in which we will score accounts. With many more added in the future.
For now they are:

- General usage of the normal protocol (tracking the events or transactions at a high level)
- Claiming an Airdrop
- Liquidity mining
- The time the transaction was done
- The time it was done, relative to the age of the protocol
- Unique users on the protocol, or, unique addresses the address has interacted with. Or both
# Protocols evaluated
The starting protocols will be DeFi protocols. They have a lot of data, and a lot of usage. What
can be recreated today, is somewhat like a "Credit Score". But in reality, the potential of web3
means that we can create much more complex web3 scores that allow people to make decisions based
on cryptocurrency wallets past transactions.

We are focusing on some protocols that are well known, and have great communities:

1. AAVE (and LEND)
2. Compound
3. Uniswap (V1 and V2)
4. Maker

We may also check out some NFTs, like Bored Apes or Crypto Punks, and figure out a way to attribute
a score to that.

# Scoring AAVE
- AAVE liquidity mining
  - time to sell - a token / time weighted score on how quickly you throw it away
  - or do they instantly stake their aave? good question
    - NOTE - I believe it is autostaked, so what would have to happen is that it would have to be unstaked and then sold right after the 7 day waiting period
- AAVE staking
  - score for staking / time
  - bonus for early adoption
- LEND
  - was part of token sale, bonus
  - time weighted holder
  - bonus for converting AAVE to LEND. with a bonus for doing so on first day
- Usage
  - count of mints
  - count of burns
  - count of borrows
  - count of repays
  - timing of all those 4. time wieghted score to see how long they been using the protocol
  - amounts of all those 4
  - the amount still currently in the protocol, is relevant, but for version past the MVP
  - maybes
    - swaps
    - rebalanceStableBorrowRate
    - liquidationCAll
    - flashLoan

Not included
- Airdrop (unless there was a LEND airdrop)


# Open Questions
- What is the best way to source accounts? For example, Maybe 5000 account have used AAVE. Right now
it is unlikely that we make subgraphs that contain multiple protocols. So for the 4 protocols we have
listed in "Protocols Evaluated" - we will have 4 sets of different users. Obviously we can just add
them all together. But there has got to be a better way to think about accounts. It will need some
thinking.
- How will we stitch together scores?
- What other data sources will we use, other than Subgraphs?
- What other chains and/or protocols on other EVM based chains should we evaluate?
- How do we give scores to existing smart contracts, such as AAVE or COMP core contracts?
  - Where do we get a registry of these contracts? Do we build it? Can we use Everest V2? Is there
    another reliable source, such as Etherscan (which comes with centralization risks).