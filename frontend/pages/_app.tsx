import { useEffect, useState } from 'react'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
  DCWarriorsContractCtx,
  StakingContractCtx,
  AccountContext,
  CampContractCtx,
} from '../contexts/AppContext'
import {
  getSignedContract,
  getCurrentAccount,
  getEthereumObject,
} from '../utils/common'

import campContractAddress from '../contracts/Camp/address.json'
import campContractAbi from '../contracts/Camp/abi.json'
import nftContractAddress from '../contracts/DappCampWarriors/address.json'
import nftContractAbi from '../contracts/DappCampWarriors/abi.json'
import stakingContractAddress from '../contracts/Staking/address.json'
import stakingContractAbi from '../contracts/Staking/abi.json'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  const getLayout = Component.getLayout || ((page: any) => page)

  const [campContract, setCampContract] = useState<any>(null)
  const [dcWarriorsContract, setDcWarriorsContract] = useState<any>(null)
  const [stakingContract, setStakingContract] = useState<any>(null)

  const [account, setAccount] = useState<any>(null)

  const load = async () => {
    const ethereum = getEthereumObject()
    if (!ethereum) {
      return
    }

    const campContract = getSignedContract(
      campContractAddress.address,
      campContractAbi.abi
    )
    setCampContract(campContract)

    const warriorsContract = getSignedContract(
      nftContractAddress.address,
      nftContractAbi.abi
    )
    setDcWarriorsContract(warriorsContract)

    const stakingContract = getSignedContract(
      stakingContractAddress.address,
      stakingContractAbi.abi
    )
    setStakingContract(stakingContract)

    if (!campContract || !warriorsContract || !stakingContract) return

    const currentAccount = await getCurrentAccount()
    setAccount(currentAccount)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <CampContractCtx.Provider value={campContract}>
      <DCWarriorsContractCtx.Provider value={dcWarriorsContract}>
        <StakingContractCtx.Provider value={stakingContract}>
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
        </StakingContractCtx.Provider>
      </DCWarriorsContractCtx.Provider>
    </CampContractCtx.Provider>
  )
}

export default MyApp
