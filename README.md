# Camp dApp

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

* Learning from them

* Contract audits

* Not reinventing the wheel
