# DappCamp Warriors

## Security

This is the most important topic of the course, and the #1 thing to have in mind while you write smart contracts.

At this point, I think the why is clear, so let's go to the how.

### Rules of thumb for writing secure code

#### Test your code

Aim for +90% coverage. Preferably, test it before writing it.

#### Use audited code

* Use [OpenZeppelin's contracts](https://github.com/OpenZeppelin/openzeppelin-contracts).
* Try to find an audited version of what you're trying to do in [Certik's website](https://www.certik.com/).

#### Favor security over performance

Like we mentioned previously, gas consumption is a good variable to optimize for. But, if optimizing cost requires writing unreadable code or skipping security measures, take care and make sure you know what you're doing.

Note that this heuristic doesn't imply that your code should be full of naive and costly security measures (like adding a [`nonReentrant` modifier](https://docs.openzeppelin.com/contracts/2.x/api/utils#ReentrancyGuard-nonReentrant--) on every function).

#### Make your code obvious

Maybe you learned a [bit manipulation](https://en.wikipedia.org/wiki/Bit_manipulation) trick a few days ago and gas optimization seems like a good excuse to try it. Don't. Your code may be readable for you, but it will definitely cause unneeded cognitive overload to your auditors or code reviewers, or even to you in a few weeks when you're deploying your code.

<!-- #### Use circuit breakers -->

### Security resources

* [Consensys security best practices](https://consensys.github.io/smart-contract-best-practices/)

* [Smart Contract Weakness Classification and Test Cases](https://swcregistry.io/)

* [Security considerations (Solidity docs)](https://docs.soliditylang.org/en/develop/security-considerations.html)

* [Twitter thread about security](https://twitter.com/The3D_/status/1485308693935763458)

* [OpenZeppelin audits](https://blog.openzeppelin.com/security-audits/)

* [Certik audits](https://www.certik.com/)

* [How to become a smart contract auditor](https://cmichel.io/how-to-become-a-smart-contract-auditor/)
