# Subgraph design

- `address-provider-registry.ts` is the main entry point
  - It is the registry of pools in aaves protocol markets
  - Such as the AMM LP token pool, and the ERC20 pool
  - It basically just creates a new `LendingPoolAddressesProvider`.
    - A `LendingPoolAddressesProvider` is the smart contract that holds a list of all the high level contracts for the Pool.
    - Includes permissioned roles
    - Acting also as factory of proxies and admin of those, so with right to change its implementations
    - It mixed setting Upgradable contracts, and EOAs for roles
    - **It creates one Pool, which is the main place where deposits and withdrawals happen**
    - See below for all addresses being set:
  
```solidity
  bytes32 private constant LENDING_POOL = 'LENDING_POOL';
  bytes32 private constant LENDING_POOL_CONFIGURATOR = 'LENDING_POOL_CONFIGURATOR';
  bytes32 private constant POOL_ADMIN = 'POOL_ADMIN';
  bytes32 private constant EMERGENCY_ADMIN = 'EMERGENCY_ADMIN';
  bytes32 private constant LENDING_POOL_COLLATERAL_MANAGER = 'COLLATERAL_MANAGER';
  bytes32 private constant PRICE_ORACLE = 'PRICE_ORACLE';
  bytes32 private constant LENDING_RATE_ORACLE = 'LENDING_RATE_ORACLE';
```

- `lending-pool-address-provider.ts`
    - This is where the `LendingPoolContract.create()` happens. It happens on `handleProxyCreated()`



# NOT SURE YET
- it might be taht the Pool atually has the ID of the LendingPoolAddressesProvider. They share the same
  - this is what it looks like in `handleAddressesProviderRegistered()`