import React from 'react'

export default function NFT({ imageUrl, tokenId }) {
  return (
    <div
      className="col-span-12 box-border border-0 border-solid border-neutral-200 text-sm leading-5 duration-300 lg:col-span-3"
      style={{ animation: '1s ease-in-out 0s 1 normal none running fadeIn' }}
    >
      <div
        className="border-1 box-border overflow-hidden rounded-xl border border-solid border-neutral-200 leading-5 text-black duration-300"
        style={{
          animation: '1s ease-in-out 0s 1 normal none running fadeIn',
          boxShadow:
            '0 1px 1px hsl(0deg 0% 0% / 8%), 0 2px 2px hsl(0deg 0% 0% / 8%), 0 4px 4px hsl(0deg 0% 0% / 8%), 0 8px 8px hsl(0deg 0% 0% / 8%), 0 16px 16px hsl(0deg 0% 0% / 8%)',
        }}
      >
        <img
          src={imageUrl}
          alt
          className="box-border block h-full border-0 border-solid border-neutral-200 object-cover align-middle text-black duration-300"
          style={{ objectPosition: 'center center' }}
        />
      </div>
      <p className="mx-0 mt-3 mb-0 box-border border-0 border-solid border-neutral-200 text-center font-sans uppercase tracking-widest text-black">
        WARRIOR
      </p>
      <h3 className="mx-0 mb-0 -mt-1 box-border border-0 border-solid border-neutral-200 pb-2 text-center font-normal uppercase tracking-wider text-black opacity-90">
        #{tokenId}
      </h3>
    </div>
  )
}
