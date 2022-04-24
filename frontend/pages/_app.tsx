import { useEffect, useState } from 'react'

import { ContractContext, AccountContext } from '../contexts/AppContext'
import { getSignedContract, getCurrentAccount } from '../utils/common'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  const getLayout = Component.getLayout || ((page: any) => page)

  const [contract, setContract] = useState<any>(null)
  const [account, setAccount] = useState<any>(null)

  const load = async () => {
    const signedContract = getSignedContract()
    setContract(signedContract)

    const currentAccount = await getCurrentAccount()
    setAccount(currentAccount)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <ContractContext.Provider value={contract}>
      <AccountContext.Provider value={account}>
        {getLayout(<Component {...pageProps} />)}
      </AccountContext.Provider>
    </ContractContext.Provider>
  )
}

export default MyApp
