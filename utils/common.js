import { ethers } from 'ethers';

// 1: Mainnet
// 4: Rinkeby
// 1337: localhost network

const networkId = process.env.NEXT_PUBLIC_NETWORK_ID
const networks = {
    1: "mainnet",
    4: "rinkeby",
    1337: "localhost"
}
export const networkName = networks[networkId]

export const getEthereumObject = () => {
    const { ethereum } = window;
    if (!ethereum) return null

    const provider = new ethers.providers.Web3Provider(ethereum, "any");
    provider.on("network", (newNetwork, oldNetwork) => {
        if (oldNetwork) {
            window.location.reload();
        }
    })

    if (ethereum.networkVersion !== networkId) {
        alert(`Please switch to the ${networkName} network`)
        return null
    }

    return ethereum
}

export const getSignedContract = (address, abi) => {
    const { ethereum } = window;

    const provider = new ethers.providers.Web3Provider(ethereum, "any");

    const signer = provider.getSigner();
    return new ethers.Contract(address, abi, signer);
}

export const getCurrentAccount = async () => {
    const { ethereum } = window;

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (!accounts || accounts?.length === 0) {
        return null
    }
    const account = accounts[0]
    return account
}

export const connectWallet = async () => {
    const { ethereum } = window;
    if (!ethereum) return null

    await ethereum.request({ method: "eth_requestAccounts" });
    location.reload()
}