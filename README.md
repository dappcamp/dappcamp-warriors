# DappCamp Warriors

## Testing

### Overview

#### Why testing?

Writing tests **should** be part of your Solidity development pipeline.
Remember, we're not deploying rockets like Elon Musk, but our software is still mission critical, it potentially will handle millions of highly liquid, irrecoverable dollars, and we should take as many security measures as we can.

To be honest, I didn't write ~~m~~any tests in most of my Web2 projects. It's not a big deal if the button that allows people changing their bios is broken on a social media startup with 100 monthly active users. Someone will report it and, since it's a startup, (hopefully) the team will be responsive on fixing it. But me, the same person that didn't write tests for bio buttons, is doing mostly TDD for writing Solidity code. And that's because each piece of software has their own tradeoffs and should be treated differently.

Testing is not a [silver bullet](https://en.wikipedia.org/wiki/No_Silver_Bullet), but it's an extra layer of confidence on the correctness of our code.

#### How to test
