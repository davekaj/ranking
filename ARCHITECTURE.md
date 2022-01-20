# Multi-Subgraph Design

To throw in all protocols into a single indexed subgraph, is not practical at the moment. For a few reasons:

- Indexing can take very long. To combine all protocols will take a long time to index
- Combining all protocols into one makes it monolithic. Subgraphs are prone to errors that crash it, and cause long downtimes. Keeping them seperate is useful.
- One day there should be Subgraph Composition, but that is in the future and we cannot wait for it.
- It is possible we could build a simple score that is based on multiple protocols. This can work when you are not tracking heavy usage events, like basic ERC-20 token transfer, or uniswap swaps. For example, tracking all AAVE and Compound deposits, borrows, repays, etc, could easily be done. My guess is only a few hundred of these happen a day, vs. +10,000 uniswap trades a day, and +100,000 for some token transfers.

There are some downsides:
- We will have to combine the rankings from multiple subgraphs, into a single score. For now, this can be done in a front end app or some resolver. This is not ideal but it can work for now.

# Folder Structure
- Start with a single, normal subgraph for AAVE
- Expand to a second one, where they both inherit from packages at the root level
- After going to a third protocol added, then consider something like Lerna (although I've never loved it... there could be another solution that is just as good)


# Mappings
- files from `aave-v2-subgraph` are from their subgraph. `https://github.com/aave/protocol-v2-subgraph`
- Slighly adjusted to work for our scenario. TBD how much they need to be adjusted, they might not look the same fairly quickly.