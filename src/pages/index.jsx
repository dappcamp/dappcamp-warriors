import React, { useEffect, useState } from "react";

import NFT from "../components/NFT";
import Layout from "../components/Layout";

import { useAccount, useContracts } from "../contexts";

export default function Home() {
  const [nfts, setNfts] = useState([]);

  const account = useAccount();
  const { dcWarriorsContract, stakingContract } = useContracts();

  const loadNfts = async () => {
    const baseUri = await dcWarriorsContract.baseURI();

    const hexCounter = await dcWarriorsContract._tokenIds();
    const counter = parseInt(hexCounter._hex, 16);

    const nfts = await Promise.all(
      Array(counter)
        .fill(0)
        .map(async (_, index) => {
          const tokenId = index;
          const owner = await dcWarriorsContract.ownerOf(tokenId);
          const staked = await stakingContract.staked(tokenId);
          const isStaked =
            staked.owner !== "0x0000000000000000000000000000000000000000";

          const nftURL = `${baseUri}/${tokenId}.json`;

          const response = await (await fetch(nftURL)).json();
          const { image } = response;

          return {
            imageUrl: image,
            tokenId,
            owner: isStaked ? staked.owner : owner,
            isStaked,
          };
        })
    );
    setNfts(nfts);
  };

  useEffect(() => {
    loadNfts();
  }, [account]);

  return (
    <div className="mx-auto max-w-7xl p-4">
      <section className="body-font text-gray-600">
        <div className="container mx-auto px-5 pt-12 pb-24">
          <div className="grid grid-cols-12 gap-8">
            {nfts.map((nft) => {
              return (
                <NFT
                  key={nft.tokenId}
                  imageUrl={nft.imageUrl}
                  tokenId={nft.tokenId}
                  owner={nft.owner}
                  isStaked={nft.isStaked}
                  setNfts={setNfts}
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
