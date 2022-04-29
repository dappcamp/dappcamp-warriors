import React, { useEffect, useState } from 'react'
import { useAccount, useCampContract } from '../contexts/AppContext'

export default function Balance() {
  const account = useAccount()
  const contract = useCampContract()

  const [balance, setBalance] = useState(0)

  const loadBalance = async () => {
    //@ts-ignore
    const userBalance = await contract.balanceOf(account)
    const balance = parseInt(userBalance._hex, 16)
    setBalance(balance)
  }

  useEffect(() => {
    loadBalance()
  }, [])

  return (
    <p className="rounded bg-gray-100 py-1 px-3 font-semibold">
      {balance} CAMP
    </p>
  )
}
