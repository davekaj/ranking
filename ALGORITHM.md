# Building the Algorithm

The subgraph(s) must create scores/algorithms/rankings that create good signals, in order to improve
the lending and borrowing rates and amounts of the protocol. This document goes over all initial
ideas that could contribute to this. This is a massive task, the most important task, with tons and
tons of work to be done. This is just the start of it.

## Time
- this will be heavily time-weighted. maybe it is worth while for us to standardize timing and weighting
- what i am thinking right now is timing rewards with decay:
  - been in it since init
  - holding, with decay
  - 1 day, 3 day, 1 week, 1 month, 1 year - timing frames, where you can attach points to. 
    - this can be decaying, or also just , after something is a month old, it is not included in the score. 

## Optimistic Scoring
- With time based rankings, we will see that scores will get outdated, but will not be updated by the indexing until an event happens
- thus, we might need to actually always resolve in the front end. it is just a similar problem to what compound faces. **query time computation. i do not believe it is on the roadmap**

## Bonuses
- Standard bonuses, 10%, double, combination bonuses. that can be shared between different scoring metrics

## Token Balances
- We will not be recording token balances for now, as they are a drain on indexing. And we can infer important data from main events happening. a token transfer itself, can be somewhat meaningless.

## Combining Scores for Protocols
- Unfortunately, we might need to aggregate them off chain, and post them on chain in a merkle tree, for the time being. Which means we will need to choose a way to combine the scores. Imagine a score of 1000.
  - We can't split it up like AAVE 250, Comp 250, etc. Because someone who has just used AAVE should not just have a score of 250/1000, especially if they are execellent borrowers. They should actually be like 800 or something. It is similar to someone with a good credit score because they have a lot of money, but have never had a mortgage. Not having a mortgage makes their score lower, because mortgages are such a good way to tell if someone pays their debts. 


## How to determine a bot account from a human account?
- Right now I don't have a good reason to seperate bots from humans. They should probably be treated the same, considering that a bot account can be overtaken by a human, and vis-versa.
- However, here are some very simple guidelines that should catch 99% of all bot accounts:
  - Over 5000 all time transactions
  - Over 1500 transactions in one year
  - Over 100 transactions in one day
- More detailed thoughts
  - Now look at this account https://etherscan.io/address/0x388e72eaf4689a7a698360b8e86bf71326107d7d
  - On the subgraph it has a repay count of 117. And 865 transactions. So i thought it was probably a human account. Then I looked at the fact that it is a smart contract called InstaAccountV2. So it is probably Instadapp. That makes sense 

## Considering on chain verfication
- So a protocol like maple.finance will approve institutional investors. We can use that as well. But it would have to be custom added to the formula.