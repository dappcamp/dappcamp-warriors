# DappCamp Warriors

## Security

### Overview

This is the most important topic of the course, and the #1 thing to have in mind while you write smart contracts.

At this point, I think the why is clear, so let's go to the how.

### Writing secure code

#### Rules of thumb

##### Test your code

Just go and test it, preferably before writing it.

##### Use audited code

* Use [OpenZeppelin's contracts](https://github.com/OpenZeppelin/openzeppelin-contracts).
* Try to find an audited version of what you're trying to do in [Certik's website](https://www.certik.com/).

##### Favor security over performance

Like we mentioned previously, gas consumption is a good variable to optimize for. But, if optimizing cost requires writing indirect, hard to follow code, take care and make sure you know what you're doing. Note that this heuristic doesn't imply that you should add a [`nonReentrant` modifier](https://docs.openzeppelin.com/contracts/2.x/api/utils#ReentrancyGuard-nonReentrant--) on every function of your contract.

##### Make your code obvious

Maybe you learned a [bit manipulation](https://en.wikipedia.org/wiki/Bit_manipulation) trick a few days ago and gas optimization seems like a good excuse to try it. Don't. Your code may be readable for you, but it will definitely cause unneeded cognitive overload to your auditors or code reviewers, or even to you in a few weeks when you're deploying your code.
