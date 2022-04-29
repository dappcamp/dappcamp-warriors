import { createContext, useContext } from 'react';

export const CampContractCtx = createContext(null);
export const DCWarriorsContractCtx = createContext(null);
export const StakingContractCtx = createContext(null);

export const AccountContext = createContext("");

export function useCampContract() {
    return useContext(CampContractCtx)
}
export function useDCWarriorsContract() {
    return useContext(DCWarriorsContractCtx)
}
export function useStakingContract() {
    return useContext(StakingContractCtx)
}

export function useAccount() {
    return useContext(AccountContext);
}
