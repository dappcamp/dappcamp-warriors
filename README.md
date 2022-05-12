# DappCamp Warriors

## Frontend

In this part, we add the frontend for our Dapp. It is built with Next.js and ethers.js.

Structure:
- src/pages - Routes for our app
- src/components - React components for our app
- src/contexts.js - React contexts to make state available to nested components
- public - Static resources for our app
- tailwind.config.js, postcss.config.js, next.config..js - Configuration files for Next.js and Tailwind

Note: For the NFT metadatas we are using the NFTs and metadatas generated using the "warriors-generator" from this repo: https://github.com/DappCamp-Cohort-2/dappcamp-warriors

### Local Development Instructions

```
In Terminal Tab 1
npx hardhat node

In Terminal Tab 2
npm run deploy:localhost
npm run dev
```

### Overview of the steps

#### Step 1: [Add frontend boilerplate](https://github.com/dappcamp/dappcamp-warriors/commit/e35a266349017930195b628c24f0acf9b4a90105)

 - Install Next.js, tailwind, and ethers.js and configure them and their plugins
	 - Next.js is Node.js based framework for building server-side rendered React applications
	 - Tailwind is a library that provides utility css classes to style elements
	 - Ethers.js is a library for interacting with the Ethereum Blockchain
 - Setup meta tags by adding a [_document.jsx file](https://nextjs.org/docs/advanced-features/custom-document)
 - Add utility methods for common operations like fetching connected accounts and signing a contract

**Learning resources**
React functional components: https://beta.reactjs.org/
Introduction to Next.js - https://nextjs.org/learn/foundations/about-nextjs
Tailwind - https://tailwindcss.com/docs/utility-first
Ethers.js - https://docs.ethers.io

#### Step 2: [Add Connect Wallet button and Balance counter](https://github.com/dappcamp/dappcamp-warriors/commit/f204b09195d891e7b79903a8392854ca18bf0eaf)

* Setup react contexts to share the connected account and contracts across pages in our app 
	* [Passing Data Deeply with Context](https://beta.reactjs.org/learn/passing-data-deeply-with-context)
* Add Connect Wallet and Balance counter to the header
	* Clicking on the connect wallet will prompt the user to connect metamask to our app
	* Balance is fetched by reading the ERC20 balance from the Camp contract. It is refreshed every 1 second.

#### Step 3: [Add NFTs grid to home page](https://github.com/dappcamp/dappcamp-warriors/commit/d4d2763dac4498c22961c1352e211e38c1fee9da)

* In this step, we add an NFT grid to the home page. The page queries the value of "_tokenIds" from the Warriors contract and displays the details for each NFT.

#### Step 4: [Add Mint NFT form](https://github.com/dappcamp/dappcamp-warriors/commit/b62e5abf6d789c3e66f4df9dce8bab10960efc58)

* In this step, we add a form to the "Mint" page. This form will only be visible to the owner of the contract. The owner will be able to mint a new NFT to a particular address using the form. 
* The mint button makes call to the Warriors contract

#### Step 5: [Add stake and unstake buttons](https://github.com/dappcamp/dappcamp-warriors/commit/d7c2d38968351165bfcb7107f99b22eb0ae336ac)

* In this step, we add "stake and "unstake" buttons to the NFT component. The logged-in users will be able to see these buttons next to the NFTs they own.
* The stake and unstake buttons make calls to the Staking contract

### Resources

Additional learning resources
* [Master Ethers.js for Blockchain](https://www.youtube.com/watch?v=yk7nVp5HTCk)
* [The Complete Guide to Full Stack Web3 Development](https://www.youtube.com/watch?v=nRMo5jjgCr4&t)

We use barebones ethers.js to interact with our smart contracts. To abstract some of the common tasks and speed up your development, you can take a look at the following libraries:
* https://github.com/tmm/wagmi
* https://github.com/developer-DAO/web3-ui
