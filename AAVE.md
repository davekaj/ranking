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
    - This contract basically has the permission to create all relevant contracts. Pools and Pool Configurators (which are also smart contracts). It also stores the permissioned roles
- `price-oracle.ts`
    - stuff is just to have the live prices whenever they are changed. This is probably then combined in the front end to give an idea of prices.
    - Also, prices are only used for borrows and liquidations, and things like that, in the protocol.
    - **So, I don’t believe MY protocol will care at all about the price, for now. BECAUSE IT IS ABLE TO SEE ALL THE ACTIONS THE USER HAS MADE**
        - The only thing I can think, is if you wanted live loans on the user. This would be like, investigating the mortgage status of a user, during the middle of the month. Maybe one day I can check it out, but for sure not needed right now!
- `/lending-pool`
  - The main contract for handling many events, `deposit, borrow, repay, etc.`. I will use this one a lot
  - Note that a lot of these are the TRANSACTIONS stored as ENTITIES only. This is because, UserReserve and Reserve are updated in `/tokenization`
- `/lending-pool-configurator`
  - Initializes Reserves
    - When a reserve is initalized, it also creates the AToken, SToken, and VToken contracts for that reserve, as a template, and thus will start tracking them
  - Updates reserves
  - Updates interest rate strategies
  - Updates reserve status - paused, activated, borrowing disabled or enabled, any of the A,V,S tokens updated (through proxy upgrade)
- `/proxy-price-provider`
  - Everything here just has to do with Price. 
- `/tokenization`
  - `initialization.ts` - Just inits the A,V,S tokens. Every a/v/s token is connected to the same Incentive Controller
  - `tokenization.ts`
    - Handles A,V,S token transfers, mints, burns
    - Which subsequently updates UserReserve and Reserve status
    - Also handles delegation of credit
- `/incentives-controller`
  - Accrue rewards
  - Claim rewards
  - Records a user index and a reserve index, similar to how most of the liquidity mining protocols work
  - A good place to explore the Incentives Controller Code - https://etherscan.deth.net/address/0x83d055d382f25e6793099713505c68a5c7535a35#code
    - I am not going to dig into it too much. But basically it just allows many tokens to be part of the incentives, such as you see on the aave front end.
    - It may allow for multiple incentives controllers to exist, thus accumulating multiple reward tokens, from multiple reserves

# Question
- it might be that the Pool actually has the ID of the LendingPoolAddressesProvider. They share the same
  - this is what it looks like in `handleAddressesProviderRegistered()`