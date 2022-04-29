import React from "react";

import {
  useAccount,
  useDCWarriorsContract,
  useStakingContract,
} from "../contexts/AppContext";
import { stakingContractAddr } from "../pages/_app";
import { toastSuccessMessage } from "../utils/toast";

export default function NFT({
  imageUrl,
  tokenId,
  owner,
  isStaked,
  setNfts,
}: {
  imageUrl: string;
  tokenId: number;
  owner: string;
  isStaked: Boolean;
  setNfts: any;
}) {
  const account = useAccount();
  const dcWarriorsContract = useDCWarriorsContract();
  const stakingContract = useStakingContract();
  const isOwner = owner.toLowerCase() === account.toLowerCase();

  const stake = async () => {
    //@ts-ignore
    const approveTxn = await dcWarriorsContract.approve(
      stakingContractAddr,
      tokenId
    );
    await approveTxn.wait();

    //@ts-ignore
    const txn = await stakingContract.stake(tokenId);
    await txn.wait();
    toastSuccessMessage("🦄 NFT was successfully staked!");
    setNfts((nfts: any) =>
      nfts.map((nft: any) => {
        if (nft.tokenId === tokenId) {
          return {
            ...nft,
            isStaked: true,
          };
        }
        return nft;
      })
    );
  };

  const unstake = async () => {
    console.log(tokenId, owner);
    //@ts-ignore
    const txn = await stakingContract.unstake(tokenId);
    await txn.wait();
    toastSuccessMessage("🦄 NFT was successfully unstaked!");
    setNfts((nfts: any) =>
      nfts.map((nft: any) => {
        if (nft.tokenId === tokenId) {
          return {
            ...nft,
            isStaked: false,
          };
        }
        return nft;
      })
    );
  };

  return (
    <div
      className="col-span-12 box-border border-0 border-solid border-neutral-200 text-sm leading-5 duration-300 lg:col-span-3"
      key={imageUrl}
    >
      <div className="h-full overflow-hidden rounded-lg border-2 border-gray-200 border-opacity-60">
        {/* <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={imageUrl}
          alt="blog"
        /> */}
        <div className="p-6">
          <h1 className="title-font mb-3 text-lg font-medium text-gray-900">
            WARRIOR #{tokenId}
          </h1>
          <h2 className="title-font mb-1 text-xs font-medium tracking-widest text-gray-900">
            OWNER
          </h2>
          <p
            className="mb-3 leading-relaxed"
            style={{
              maxWidth: "60%",
              wordBreak: "break-word",
            }}
          >
            {owner}
          </p>
          {isOwner && !isStaked && (
            <button
              onClick={stake}
              className="flex rounded border-0 bg-indigo-500 py-2 px-8 text-lg text-white hover:bg-indigo-600 focus:outline-none disabled:opacity-50"
            >
              STAKE
            </button>
          )}
          {isOwner && isStaked && (
            <button
              onClick={unstake}
              className="flex rounded border-0 bg-indigo-500 py-2 px-8 text-lg text-white hover:bg-indigo-600 focus:outline-none disabled:opacity-50"
            >
              UNSTAKE
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
