# TODOs for the Subgraph
- Create a lifetime amount repay, borrowed, liquidated, and all other actions
  - **However, the above makes me realize I need both USD and ETH amounts. And more so I need USD. But I removed the price oracle from the subgraph.**
    - That is okay. Maybe I need to build a generalizable price oracle that can be plugged into any subgraph. But for now, it could just be deployed on its own. That would take me a long time to code. So I should probably:
    - a) hire someone to do it, as it is very clear on how to build that
    - b) get a grant from the graph.
  - Also note that the Repays, and borrows, in the entity Events, have the amounts in YFI or USDC or whatever else. And in the original aave subgraph they contained nothing about USD price (although there may have been code in the mapping that allowed to easily slide it in)