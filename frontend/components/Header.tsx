import React from 'react'
import Link from 'next/link'

import { Button } from '@chakra-ui/react'
import { useAccount, useConnect } from 'wagmi'

import { Address } from '../components/Address'

export default function Header({ isOwner = true }) {
  const [{ data: connectData, error: connectError }, connect] = useConnect()
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  })

  return (
    <header className="body-font color-white">
      <div
        className="container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row "
        style={{ justifyContent: 'space-between' }}
      >
        <nav className="flex flex-wrap items-center gap-4 text-base lg:w-2/5">
          <Link href="/">
            <a>Home</a>
          </Link>
          {isOwner && (
            <Link href="/mint">
              <a>Mint</a>
            </Link>
          )}
        </nav>
        <div className="mx-auto flex-1">
          <p className="title-font order-first mb-4 flex items-center font-medium md:mb-0 lg:order-none lg:items-center lg:justify-center">
            <span className="text-2xl" style={{ fontFamily: 'Syne' }}>
              DappCamp Warriors
            </span>
          </p>
        </div>
        <nav className="flex flex-wrap items-center text-base lg:w-2/5 lg:justify-end">
          {!accountData ? (
            <Button
              width="20vh"
              variant="solid"
              bg="black"
              colorScheme="gray"
              onClick={() => connect(connectData.connectors[0])}
            >
              Connect Wallet
            </Button>
          ) : (
            <>
              <Address value={accountData.address} shortened />
              <Button
                ml={4}
                width="auto"
                variant="solid"
                bg="black"
                colorScheme="gray"
                onClick={disconnect}
              >
                Disconnect
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
