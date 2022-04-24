import React, { useContext } from 'react'
import Link from 'next/link'

import { connectWallet } from '../utils/common'
import { AccountContext } from '../contexts/AppContext'

export default function Header() {
  const account = useContext(AccountContext)
  const isMetamaskConnected = !!account

  return (
    <header className="body-font mx-auto max-w-7xl p-4 text-gray-600">
      <div className="container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row">
        <a className="title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0">
          <img src="/favicon.png" className="h-12" />
          <span className="ml-3 text-xl">DappCamp Warriors</span>
        </a>
        <nav className="flex flex-wrap items-center justify-center text-base md:mr-auto	md:ml-4 md:border-l md:border-gray-400 md:py-1 md:pl-4">
          <Link href="/">
            <a className="mr-5 hover:text-gray-900">Home</a>
          </Link>
          <Link href="/mint">
            <a className="mr-5 hover:text-gray-900">Mint</a>
          </Link>
        </nav>
        {!isMetamaskConnected && (
          <button
            className="mt-4 inline-flex items-center rounded border-0 bg-gray-100 py-1 px-3 text-base hover:bg-gray-200 focus:outline-none md:mt-0"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
        {isMetamaskConnected && (
          <p>
            {account}
          </p>
        )}
      </div>
    </header>
  )
}
