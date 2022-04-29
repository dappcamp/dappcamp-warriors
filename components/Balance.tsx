import React, { useState } from "react";

import { useAccount, useCampContract } from "../contexts/AppContext";
import { useInterval } from "../utils/hooks";

export default function Balance() {
  const account = useAccount();
  const contract = useCampContract();

  const [balance, setBalance] = useState("...");

  const loadBalance = async () => {
    //@ts-ignore
    const userBalance = await contract.balanceOf(account);
    const balance = parseInt(userBalance._hex, 16);
    const formattedBalance = Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(balance / 1000000000000000000);
    setBalance(formattedBalance);
  };

  useInterval(() => {
    loadBalance();
  }, 1000);

  return (
    <p className="rounded bg-gray-100 py-1 px-3 font-semibold">
      {balance} CAMP
    </p>
  );
}
