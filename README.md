# DappCamp Warriors

## Testing

### Pre-requisites

* Basic Typescript knowledge helps a lot.
* Recommended: VS Code (IntelliSense works like a charm with Typescript), see more [here](https://code.visualstudio.com/docs/editor/intellisense#_intellisense-features).

### Overview

We added 3 new files: [test/Camp.spec.ts](test/Camp.spec.ts), [test/DappCampWarriors.spec.ts](test/DappCampWarriors.spec.ts), and [lib/deploy.helpers.ts](lib/deploy.helpers.ts). Like in previous branches, each one of them is fully commented explaining everything that's happening.

Typescript syntax may slow you down a bit at first, but interacting with fully typed libraries and contracts will save you hours of debugging and reading docs.

#### Why testing?

You **should** write tests for your Solidity code.
Remember, we're not launching rockets like [Elon Musk](https://c.tenor.com/RaKoyZ5MI9cAAAAC/doge-rocket.gif), but our software is still mission critical, it potentially will handle millions of highly liquid, irrecoverable ETH and tokens, and we should take as many security measures as we can.

To be honest, I didn't write many unit tests in (most) of my Web2 projects. It's not a big deal if the button that allows people changing their lastname is broken on a social media startup with 100 monthly active users. Someone will report it and, since it's a startup, (hopefully) the team will be responsive on fixing it. But while I didn't write tests for lastname buttons, I do [TDD](https://en.wikipedia.org/wiki/Test-driven_development) for my Solidity code. And that's because each piece of software has their own tradeoffs and should be treated differently.

Testing is not a [silver bullet](https://en.wikipedia.org/wiki/No_Silver_Bullet), but it's an extra layer of confidence on the
correctness of our code.

#### TDD

I recommend you trying TDD (in a nutshell, writing the tests before the code). It will help you think about potential security issues and edge cases.

#### Waffle

Hardhat [recommends](https://hardhat.org/guides/waffle-testing.html) using their [Waffle](https://ethereum-waffle.readthedocs.io/en/latest/) plugin to test our contracts. Waffle is built on top of [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/), two of the most widely used JS testing libraries.

Waffle adds some Solidity-specific APIs on top of Chai, allowing us to test events, reverts, and other common constructs.
