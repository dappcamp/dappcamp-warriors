import React, { useEffect, useState } from 'react'

import NFT from '../components/NFT'
import Layout from '../components/Layout'
import NoNFTsIllustration from '../components/NoNFTsIllustration'

import {
  useAccount,
  useDCWarriorsContract,
  useStakingContract,
} from '../contexts/AppContext.js'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [nfts, setNfts] = useState<Array<any>>([])

  const dcWarriorsContract = useDCWarriorsContract()
  const stakingContract = useStakingContract()
  const account = useAccount()

  const loadNfts = async () => {
    //@ts-ignore
    const hexCounter = await dcWarriorsContract._tokenIds()
    const counter = parseInt(hexCounter._hex, 16)

    const nfts = await Promise.all(
      Array(counter)
        .fill(0)
        .map(async (_, index) => {
          const tokenId = index
          //@ts-ignore
          const owner = await dcWarriorsContract.ownerOf(tokenId)
          //@ts-ignore
          const staked = await stakingContract.staked(tokenId)
          const isStaked =
            staked.owner !== '0x0000000000000000000000000000000000000000'

          return {
            imageUrl: 'https://error404.fun/img/illustrations/09@2x.png',
            tokenId,
            owner: isStaked ? staked.owner : owner,
            isStaked,
          }
        })
    )
    setIsLoaded(true)
    setNfts(nfts)
  }

  useEffect(() => {
    loadNfts()
  }, [account])

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
                  key={nft.tokenId}
                  imageUrl={nft.imageUrl}
                  tokenId={nft.tokenId}
                  owner={nft.owner}
                  isStaked={nft.isStaked}
                  setNfts={setNfts}
                />
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

Home.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>
}
