import React, { useEffect, useState } from 'react'

import { useAccount, useConnect } from 'wagmi'

import NoNFTsIllustration from '../components/NoNFTsIllustration.jsx'
import NFT from '../components/NFT.jsx'

export default function NFTs({}) {
  const [nfts, setNfts] = useState<Array<any>>([])
  const [nftsLoaded, setNftsLoaded] = useState(false)

  const [{ data: connectData, error: connectError }, connect] = useConnect()
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  })

  useEffect(() => {
    if (!accountData) return
    fetchNfts()
  }, [accountData])

  const fetchNfts = async () => {
    setNftsLoaded(false)
    //fetchNFTs by making a call to the smart contract
    const result: Array<any> = []
    setNfts(result)
    setNftsLoaded(true)
  }

  const isMetamaskConnected = !!accountData

  return (
    <div style={{ maxWidth: '1280px', margin: 'auto' }}>
      {isMetamaskConnected && nftsLoaded && nfts.length === 0 && (
        <NoNFTsIllustration />
      )}
      <section className="body-font text-gray-600">
        <div className="container mx-auto px-5 py-24">
          <div className="-m-4 flex flex-wrap">
            {nfts.map((nft, index) => {
              return (
                <NFT
                  imageUrl={nft.imageUrl}
                  title={nft.tokenId}
                  currentOwner={nft.currentOwner}
                />
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
