import { useEffect, useState } from 'react'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { DCWarriorsContractCtx, AccountContext } from '../contexts/AppContext'
import { getSignedContract, getCurrentAccount } from '../utils/common'

import nftContractAddress from '../contracts/DappCampWarriors/address.json'
import nftContractAbi from '../contracts/DappCampWarriors/abi.json'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  const getLayout = Component.getLayout || ((page: any) => page)

  const [dcWarriorsContract, setDcWarriorsContract] = useState<any>(null)
  const [account, setAccount] = useState<any>(null)

  const load = async () => {
    const warriorsContract = getSignedContract(
      nftContractAddress.address,
      nftContractAbi.abi
    )
    setDcWarriorsContract(warriorsContract)
    if (!warriorsContract) return

    const currentAccount = await getCurrentAccount()
    setAccount(currentAccount)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <DCWarriorsContractCtx.Provider value={dcWarriorsContract}>
      <AccountContext.Provider value={account}>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {getLayout(<Component {...pageProps} />)}
      </AccountContext.Provider>
    </DCWarriorsContractCtx.Provider>
  )
}

export default MyApp
