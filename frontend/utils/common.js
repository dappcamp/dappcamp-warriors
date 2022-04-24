import { ethers } from 'ethers';

import { abi } from '../contracts/DappCampWarriors/abi.json'
import { address } from '../contracts/DappCampWarriors/address.json'

export const getSignedContract = () => {
    const { ethereum } = window;
    if (!ethereum) return null

    const provider = new ethers.providers.Web3Provider(ethereum, "any");
    provider.on("network", (newNetwork, oldNetwork) => {
        if (oldNetwork) {
            window.location.reload();
        }
    })

    const signer = provider.getSigner();
    return new ethers.Contract(address, abi, signer);
}

export const getCurrentAccount = async () => {
    const { ethereum } = window;
    if (!ethereum) return null

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (!accounts || accounts?.length === 0) {
        return null
    }
    const account = accounts[0]
    return account.toLowerCase()
}

export const connectWallet = async () => {
    const { ethereum } = window;
    if (!ethereum) return null

    await ethereum.request({ method: "eth_requestAccounts" });
    location.reload()
}