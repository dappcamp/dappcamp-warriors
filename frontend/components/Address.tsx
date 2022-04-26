import React from 'react'

export default function Address({ address }: { address: string }) {
  const shortAddress =
    address &&
    address?.length > 0 &&
    address.slice(0, 5) +
      '...' +
      address.slice(address.length - 4, address.length)
  const erc20Balance = 0

  return (
    <div className="flex gap-2">
      <p className="rounded bg-gray-100 py-1 px-3">{shortAddress}</p>
      <p className="rounded bg-gray-100 py-1 px-3 font-semibold">
        {erc20Balance} CAMP
      </p>
    </div>
  )
}
