import { createContext, useContext } from 'react';

export const ContractContext = createContext(null);
export const AccountContext = createContext(null);

export function useContract() {
    return useContext(ContractContext)
}
export function useAccount() {
    return useContext(AccountContext);
}
