# TODOs for the Subgraph

## Todos
- Go over Compound V2 in order to figure out best path to generalize the two subgraphs
- Build a single Compound V2 subgraph from SCRATCH that mimics the generalization, without price oracles
- Then break down AAVE to the same
- Then
  - build the price oracle that can be generalized into both of them 
  - OR Work on a simple credit score that scores AAVE and comp (but does not combine them yet)


## Deeper thoughts that lead to the above simplification
- Create a lifetime amount repay, borrowed, liquidated, and all other actions
  - **However, the above makes me realize I need both USD and ETH amounts. And more so I need USD. But I removed the price oracle from the subgraph.**
    - That is okay. Maybe I need to build a generalizable price oracle that can be plugged into any subgraph. But for now, it could just be deployed on its own. That would take me a long time to code. So I should probably:
    - a) hire someone to do it, as it is very clear on how to build that
    - b) get a grant from the graph.
  - Also note that the Repays, and borrows, in the entity Events, have the amounts in YFI or USDC or whatever else. And in the original aave subgraph they contained nothing about USD price (although there may have been code in the mapping that allowed to easily slide it in)
  - Nice to haves
    - recording how much an individual has earned in interest
      - showing how much relative to principle could be great too
  - Create standards for these Subgraphs - Well yeah, borrow, lend, repay, withdraw, should be standardized across ALL the platforms. That should make things really easy. This should be submitted to the graph for work
    - This would fit in well, with my oracle