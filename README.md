# Open Ranking Algorithm
Open Ranking Algorithm creates "rankings" or "scores" for Ethereum accounts based on past transaction history.
It leverages Subgraphs a lot, but there will be "stitching" together of data from Subgraphs, and other
data sources, in order to create useful rankings.
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
3. Uniswap
4. Maker

We may also check out some NFTs, like Bored Apes or Crypto Punks, and figure out a way to attribute
a score to that.

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