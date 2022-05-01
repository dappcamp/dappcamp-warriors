# DappCamp Warriors

## Gas optimization

### Gas fees

Turing-complete state machines are prone to the [halting problem](https://en.wikipedia.org/wiki/Halting_problem), which implies that the execution can halt at any given point in time (e.g.: a program running a `while (true)` statement).

How does Ethereum, a decentralized, permissionless, Turing-complete machine prevent people from halting it?
By imposing a gas fee on every computation.

Gas fees are essential to the Ethereum network. They:

* Prevent bad actors from spamming the network.
* Can be adjusted to tip the miners and regulate transaction priority.
* Are partially burned to diminish the Ether supply.

### Why we optimize gas fees

When computation and storage have a relevant monetary cost, optimizing them becomes important. We may argue that with future upgrades, using the Ethereum network will get cheaper, but that's not the case for now, so gas optimization is key.

I like to divide gas optimizations in two groups:

* Contract deploy gas optimizations.
* Runtime gas optimizations.

If thousands of people use your contracts everyday, runtime gas optimizations may save your users millions of dollars. On the other side, deploy gas optimizations are used just once<sup>1</sup>, but some contracts, depending on length and initial parameters, can cost thousands of dollars to deploy.

1. Note that contracts [can be deployed programmatically by other contracts](https://github.com/Uniswap/v3-core/blob/ed88be38ab2032d82bf10ac6f8d03aa631889d48/contracts/UniswapV3PoolDeployer.sol#L35), in that case, optimizing deploy gas usage also optimizes runtime consumption.

### Optimizing gas fees

In the same way you can save gasoil if you accelerate your car gently, you can save gas by using the techniques we cover on this branch.

#### Preferred variable size

When in doubt, use 256 bit variables like `uint256` or `bytes32`. 

This may sound counterintuitive since at first glance, `uint256` takes more resources than `uint16`. But most of the times it doesn't, since EVM's storage slots have 256 bits, so smaller variables are padded with zeros by the EVM and that has a gas cost. The only case in which you want to use smaller variables is when you are [packing variables](#packing-variables).

##### Packing variables
