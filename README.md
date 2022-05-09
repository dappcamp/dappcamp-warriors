# DappCamp Warriors

## Gas optimization

### Gas fees

Turing-complete state machines are prone to the [halting problem](https://en.wikipedia.org/wiki/Halting_problem), which implies that the execution can halt at any given point in time (e.g.: a program running a `while (true)` statement).

How does Ethereum, a decentralized, permissionless, Turing-complete machine prevent people from halting it?
By imposing a gas fee on computation.

Gas fees are essential to the Ethereum network. They:

* Prevent bad actors from spamming the network.
* Can be adjusted to tip the miners and regulate transaction priority.
* Are partially burned to diminish the Ether supply.

### Why we optimize gas fees

When computation and storage have a relevant monetary cost, optimizing them becomes important.

We may argue that using the Ethereum network will get cheaper with future upgrades, but that's not the case for now so gas optimization is key.

Gas optimizations can be divided in two main groups:

* Contract deploy gas optimizations.
* Runtime gas optimizations.

If thousands of people use your contracts everyday, runtime gas optimizations may save your users millions of dollars. On the other side, deploy gas optimizations are used just once<sup>1</sup>, but some contracts, depending on length and initial parameters, can cost thousands of dollars to deploy.

1. Note that contracts [can be deployed programmatically by other contracts](https://github.com/Uniswap/v3-core/blob/ed88be38ab2032d82bf10ac6f8d03aa631889d48/contracts/UniswapV3PoolDeployer.sol#L35), in that case, optimizing deploy gas usage also optimizes runtime consumption.

### Optimizing gas fees

In the same way you can save gasoil if you accelerate your car gently, you can save gas by using the techniques we cover on this branch.

Take a look at [NonOptimized](/contracts/gas-optimization/NonOptimized.sol) and [Optimized](/contracts/gas-optimization/Optimized.sol)
to see multiple optimization tricks.
