# Camp dApp

## Scaffolding

### Pre-requisites

* Having a modern version of [Node.js](https://nodejs.org/en) and NPM installed.
* Some of the commands are Unix-based.

### Overview

This branch shows the scaffolding of a [Hardhat](https://hardhat.org/) project, using [Typescript](https://www.typescriptlang.org/), most of it was done by Hardhat itself.

To get a similar result, you can try running the following commands:

```bash
cd .. && mkdir my-hardhat-project && cd my-hardhat-project
```

```bash
npx hardhat
```

You'll get a prompt, choose the Typescript option, then keep pressing enter until Hardhat generates your files.

### Why Hardhat

Hardhat is a nicely done, open-source tool built by the [Nomic Foundation](https://nomic.foundation/).
Some of its benefits are:

* An outstanding developer experience, they use modern Typescript tooling to help you test, deploy, and interact with your contracts.
* Composable: Hardhat is extensible and there's [many tools](https://hardhat.org/plugins/) built on top.
* [console.log](https://hardhat.org/hardhat-network/#console-log) for Solidity.
* Many more, listed on [their website](https://hardhat.org/).

### Hardhat's readme

In the `readmes` folder, you can find [a readme](readmes/hardhat.md) that comes with every Hardhat project. I moved it there to prioritize this one, but it's a useful read to have a better understanding of what you can do in this repo.

### Why Typescript

Let's put it simply, everyone that worked with Typescript loves it. It provides a rich type system without compromising on flexibility.

The goal of this walkthrough is not you becoming a Typescript expert, so feel free to use [any](https://www.typescriptlang.org/docs/handbook/basic-types.html#any), and [@ts-ignore](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-6.html#suppress-errors-in-ts-files-using--ts-ignore-comments) when you struggle to make your typings work. My only warning is that you don't abuse them on production projects, Solidity code manipulates value and should be treated like mission-critical software, type safety in your tests and deploy scripts adds an extra layer of correctness that you should take advantage from.

### Files

* `tsconfig.json` Typescript config.
* `package.json`, `package-lock.json` tooling NPM dependencies.
* `.eslintrc.js`, `.eslintignore` [ESLint](https://eslint.org/) is a linter for Typescript/Javascript, you can find how to take the most advantage from it below, in [Recommended tooling](#recommended-tooling).
* `.prettierrc`, `.prettierignore` a TS/JS code formatter that also works for Solidity.
* `.solhint.json`, `.solhintignore` a linter for Solidity.
* `contracts` all your Solidity files will go here.
* `lib` a folder I usually create on my Hardhat projects for shared functions, constants, etc.
* `scripts` Hardhat scripts, e.g.: deploy scripts.
* `test` this one's pretty self-explanatory.
* `.npmignore` useful if you publish your contracts to NPM, like [OpenZeppelin](https://www.npmjs.com/package/@openzeppelin/contracts) does.

### Recommended tooling

#### VS Code ESLint extension

To take the most advantage of ESLint, I recommend using the [VS Code extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), listed on the [recommended extensions](.vscode/extensions.json).

#### VS Code Hardhat extension

Another useful extension is [Hardhat's](https://marketplace.visualstudio.com/items?itemName=NomicFoundation.hardhat-solidity), also listed on the recommended extensions.

#### VS Code settings

I recommend you adding the following to your VS Code [settings.json](https://code.visualstudio.com/docs/getstarted/settings#_settingsjson):

```json
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},
"[typescript]": {
  "editor.defaultFormatter": "dbaeumer.vscode-eslint"
},
"[javascript]": {
  "editor.defaultFormatter": "dbaeumer.vscode-eslint"
},
"[solidity]": {
  "editor.tabSize": 4,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "NomicFoundation.hardhat-solidity"
},
```

That will autoformat your code on save, and fix some of the linting problems.
