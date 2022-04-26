import React from 'react'
import { useAccount } from '../contexts/AppContext'
import { toastSuccessMessage } from '../utils/toast'

export default function NFT({
  imageUrl,
  tokenId,
  owner,
  isStaked,
  setNfts,
}: {
  imageUrl: string
  tokenId: number
  owner: string
  isStaked: Boolean
  setNfts: any
}) {
  const account = useAccount()
  const canStake = owner.toLowerCase() === account.toLowerCase()

  const stake = async () => {
    // const txn = await stakeContract.mint(address)
    // await txn.wait()
    toastSuccessMessage('🦄 NFT was successfully staked!')
    setNfts((nfts: any) =>
      nfts.map((nft: any) => {
        if (nft.tokenId === tokenId) {
          return {
            ...nft,
            isStaked: true,
          }
        }
        return nft
      })
    )
  }

  const unstake = async () => {
    // const txn = await stakeContract.mint(address)
    // await txn.wait()
    toastSuccessMessage('🦄 NFT was successfully unstaked!')
    setNfts((nfts: any) =>
      nfts.map((nft: any) => {
        if (nft.tokenId === tokenId) {
          return {
            ...nft,
            isStaked: false,
          }
        }
        return nft
      })
    )
  }

  return (
    <div
      className="col-span-12 box-border border-0 border-solid border-neutral-200 text-sm leading-5 duration-300 lg:col-span-3"
      key={imageUrl}
    >
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={imageUrl}
          alt="blog"
        />
        <div className="p-6">
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            WARRIOR #{tokenId}
          </h1>
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            OWNER
          </h2>
          <p
            className="leading-relaxed mb-3"
            style={{
              maxWidth: '60%',
              wordBreak: 'break-word',
            }}
          >
            {owner}
          </p>
          {canStake && !isStaked && (
            <button
              onClick={stake}
              className="flex text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:opacity-50"
            >
              STAKE
            </button>
          )}
          {canStake && isStaked && (
            <button
              onClick={unstake}
              className="flex text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:opacity-50"
            >
              UNSTAKE
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
