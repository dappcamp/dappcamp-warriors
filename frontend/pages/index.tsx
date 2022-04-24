import React, { useEffect, useState } from "react";

import NFT from "../components/NFT.jsx";
import Layout from "../components/Layout";
import NoNFTsIllustration from "../components/NoNFTsIllustration";

import { useAccount, useContract } from "../contexts/AppContext.js";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [nfts, setNfts] = useState<Array<any>>([]);
  const contract = useContract();
  const account = useAccount();

  const loadNfts = async () => {
    //@ts-ignore
    const hexCounter = await contract._tokenIds();
    const counter = parseInt(hexCounter._hex, 16);

    const nfts = await Promise.all(
      Array(counter)
        .fill(0)
        .map(async (_, index) => {
          const tokenId = index;
          return {
            imageUrl: "https://error404.fun/img/illustrations/09@2x.png",
            tokenId: `${tokenId}`,
          };
        })
    );
    setIsLoaded(true);
    setNfts(nfts);
  };

  useEffect(() => {
    loadNfts();
  }, [account]);

  return (
    <div className="mx-auto max-w-7xl p-4">
      {isLoaded && nfts.length === 0 && <NoNFTsIllustration />}
      <section className="body-font text-gray-600">
        {/* <p className="text-center text-xl font-semibold">Gallery</p> */}
        <div className="container mx-auto px-5 pt-12 pb-24">
          <div className="grid grid-cols-12 gap-8">
            {nfts.map((nft) => {
              return (
                <NFT
                  imageUrl={nft.imageUrl}
                  tokenId={nft.tokenId}
                  key={nft.tokenId}
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

Home.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
