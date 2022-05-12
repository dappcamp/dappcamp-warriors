import { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AccountContext, ContractsContext } from "../contexts";
import {
  networkName,
  getEthereumObject,
  setupEthereumEventListeners,
  getSignedContract,
  getCurrentAccount,
} from "../utils/common";

import addresses from "../../addresses.json";
import campSolContract from "../../artifacts/contracts/Camp.sol/Camp.json";
import nftSolContract from "../../artifacts/contracts/DappCampWarriors.sol/DappCampWarriors.json";
import stakingSolContract from "../../artifacts/contracts/Staking.sol/Staking.json";

import "../styles/globals.css";

const campContractAddr = addresses[networkName].camp;
const dappCampWarriorsContractAddr = addresses[networkName].dappCampWarriors;
export const stakingContractAddr = addresses[networkName].staking;

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  const [account, setAccount] = useState(null);
  const [contracts, setContracts] = useState({
    campContract: null,
    dcWarriorsContract: null,
    stakingContract: null,
  });

  const load = async () => {
    const ethereum = getEthereumObject();
    if (!ethereum) {
      return;
    }

    setupEthereumEventListeners(ethereum);

    const campContract = getSignedContract(
      campContractAddr,
      campSolContract.abi
    );
    const dcWarriorsContract = getSignedContract(
      dappCampWarriorsContractAddr,
      nftSolContract.abi
    );
    const stakingContract = getSignedContract(
      stakingContractAddr,
      stakingSolContract.abi
    );

    if (!campContract || !dcWarriorsContract || !stakingContract) return;

    const currentAccount = await getCurrentAccount();
    setContracts({ campContract, dcWarriorsContract, stakingContract });
    setAccount(currentAccount);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <AccountContext.Provider value={account}>
      <ContractsContext.Provider value={contracts}>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {getLayout(<Component {...pageProps} />)}
      </ContractsContext.Provider>
    </AccountContext.Provider>
  );
}

export default MyApp;
