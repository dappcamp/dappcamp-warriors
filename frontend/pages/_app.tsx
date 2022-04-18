import '@fontsource/syne/700.css'
import '@fontsource/inter'

import { ChakraProvider } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { AppProps } from 'next/app'
import { chain, defaultChains, Provider } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import { theme } from '../lib/theme'

import '../styles/globals.css'

const localProvider = new ethers.providers.JsonRpcProvider(
  'http://localhost:8545',
  {
    name: 'hardhat',
    chainId: 1337,
  }
)

const externalProvider = new ethers.providers.AlchemyProvider(
  'rinkeby',
  'RN9SHAUtEk-bS3ydXebMgySdU5gIxeCx'
)

const chains = defaultChains
const connectors = ({ chainId }) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0]
  return [new InjectedConnector({ chains })]
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider autoConnect connectors={connectors} provider={externalProvider}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
