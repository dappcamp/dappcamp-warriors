import { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  DCWarriorsContractCtx,
  StakingContractCtx,
  AccountContext,
  CampContractCtx,
} from "../contexts/AppContext";
import {
  getSignedContract,
  getCurrentAccount,
  getEthereumObject,
  networkName,
} from "../utils/common";

import addresses from "../addresses.json";
import campSolContract from "../artifacts/contracts/Camp.sol/Camp.json";
import nftSolContract from "../artifacts/contracts/DappCampWarriors.sol/DappCampWarriors.json";
import stakingSolContract from "../artifacts/contracts/Staking.sol/Staking.json";

import "../styles/globals.css";

const campContractAddr = addresses[networkName].camp;
const dappCampWarriorsContractAddr = addresses[networkName].dappCampWarriors;
export const stakingContractAddr = addresses[networkName].staking;

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  const getLayout = Component.getLayout || ((page: any) => page);

  const [campContract, setCampContract] = useState<any>(null);
  const [dcWarriorsContract, setDcWarriorsContract] = useState<any>(null);
  const [stakingContract, setStakingContract] = useState<any>(null);

  const [account, setAccount] = useState<any>(null);

  const load = async () => {
    const ethereum = getEthereumObject();
    if (!ethereum) {
      return;
    }

    const campContract = getSignedContract(
      campContractAddr,
      campSolContract.abi
    );
    setCampContract(campContract);

    const warriorsContract = getSignedContract(
      dappCampWarriorsContractAddr,
      nftSolContract.abi
    );
    setDcWarriorsContract(warriorsContract);

    const stakingContract = getSignedContract(
      stakingContractAddr,
      stakingSolContract.abi
    );
    setStakingContract(stakingContract);

    if (!campContract || !warriorsContract || !stakingContract) return;

    const currentAccount = await getCurrentAccount();
    setAccount(currentAccount);
  };

  useEffect(() => {
    load();
  }, []);

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
  );
}

export default MyApp;
