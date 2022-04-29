# DappCamp Warriors

## UI

### Overview

We added a frontend for our Dapp. It is built with Next.js. It uses ether.js to call contract methods.
Composition:
- components - Reusuable components to use across pages
- contexts - React contexts to make state data available to nested components
- pages - Routes for our web app. It has a home page and a mint page.
- public - Static resources for our app
- tailwind.config.js, postcss.config.js, next.config..js - Configuration files for Next.js and Tailwind

### Local Development Instructions

```
In Terminal Tab 1
npx hardhat node

In Terminal Tab 2
npm run deploy:localhost
npm run dev
```