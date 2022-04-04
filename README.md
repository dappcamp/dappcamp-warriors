# DappCamp Warriors

## Create ERC721

### Overview

This branch is where the fun starts. We'll give birth to the DappCamp warriors, an NFT collection using [ERC721](https://eips.ethereum.org/EIPS/eip-721).

First, we need to install [OpenZeppelin's contracts](https://www.npmjs.com/package/@openzeppelin/contracts) using NPM:

```bash
npm i @openzeppelin/contracts
```

> The library will be added to our `package.json`, and now we're able to import their contracts in our Solidity files.

Let's now go to [DappCampWarriors.sol](contracts/DappCampWarriors.sol), as you can see, the file is fully commented explaining what's going on.
The format of the comments follows [NatSpec](https://docs.soliditylang.org/en/v0.8.13/natspec-format.html), the standard comment format for Solidity code.

### What's OpenZeppelin

OpenZeppelin is the organization that pioneered standards for smart contract development, including security, good practices, and coding standards among others. They were born in 2016, just after [The Dao Hack](https://blog.openzeppelin.com/15-lines-of-code-that-could-have-prevented-thedao-hack-782499e00942).

#### Some benefits of using their contracts

* Audited by default. Since our code manipulates money, a common industry practice is auditing it, that means sending your source code to a company so they analyze it and make sure that it doesn't have vulnerabilities. OpenZeppelin pretty much invented the concept of smart contract auditing, so if you use their code, your auditing costs (time and money) will be lower.
* Guarantee of the best industry standards. They have been writing contracts with a focus on security and good practices for a long time, that means a lot of iteration on their standards, so don't reinvent the wheel and go with their implementations always that you can.

I recommend you taking the time to read their contracts and learn from them. Their codebases, for example [openzeppelin-contracts](https://github.com/OpenZeppelin/openzeppelin-contracts), are a great source to learn Solidity's constructs, syntax, good practices, coding style, etc.
