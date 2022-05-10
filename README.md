# DappCamp Warriors

## Deploy

With the same helpers we used to deploy in our tests, we can deploy locally, to testnet and to mainnet.

We added a few things on this branch, let's go through them:

* [`lib/addresses.helpers.ts`](lib/addresses.helpers.ts), a set of utilities to save and fetch the addresses of your contracts (this is useful in case you wanna interact with them in the future, for example, using scripts).

* [`addresses.json`](addresses.json), a file to persist the addresses of your contracts.

* `deploy:local` command. Making local deploys easy is key for your frontend team's dev experience.

* `scripts/deploy*` as you can see, we divided the deployment into multiple scripts, but composed all of them on [`scripts/deploy.ts`](scripts/deploy.ts). When you deploy to testnet or mainnet, it's useful to split the deploy into small pieces to start from the one that failed in case something doesn't work, when you deploy locally it's usually more convenient to do everything at once so it's quicker.

### Deploying to testnet/mainnet

_Make sure you created a .env file with your variables (check .env.example)._

Run the following commands, in the same order (change `ropsten` for the network you wanna deploy to):

```bash
npx hardhat run scripts/deploy-camp.ts --network ropsten
```

```bash
npx hardhat run scripts/deploy-dapp-camp-warriors.ts --network ropsten
```

```bash
npx hardhat run scripts/deploy-staking.ts --network ropsten
```

```bash
npx hardhat run scripts/set-camp-ownership.ts --network ropsten
```
