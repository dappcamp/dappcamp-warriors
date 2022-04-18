import { addressConstants } from "@pretzel/hardhat/lib/PretzelTrade.constants";
import { useEffect, useState } from "react";
import { useDeepCompareEffect } from "react-use";
import { useAccount } from "wagmi";

export function useAccountData(
  {
    useLocalAccount,
  }: {
    useLocalAccount: boolean;
  } = { useLocalAccount: false }
) {
  const [{ data: _accountData, loading: loadingAccountData }, disconnect] =
    useAccount({
      fetchEns: true,
    });

  // prevents an infinite loop
  const [accountData, setAccountData] = useState(_accountData);
  const compareData = _accountData || {};
  useDeepCompareEffect(() => {
    if (useLocalAccount) {
      setAccountData({
        address: addressConstants.offerer,
        connector: null,
        ens: {
          avatar: "",
          name: "",
        },
      });
    } else {
      setAccountData(_accountData);
    }
  }, [compareData]);

  return {
    accountData,
    loadingAccountData,
  };
}
