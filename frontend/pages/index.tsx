import { useAccount, useConnect } from 'wagmi'

import { Container } from '../components/Container'
import Header from '../components/Header'
import NFTs from '../components/NFTs'

const Index = () => {
  const [{ data: connectData, error: connectError }, connect] = useConnect()
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  })

  return (
    <div
      style={{
        backgroundImage: 'radial-gradient(rgb(54 38 38) 0%, #1A202C 100%)',
        backgroundSize: '100% 200%',
        backgroundPosition: '50% 300%',
        minHeight: '100vh',
      }}
    >
      <Header />
      {/* <Search /> */}
      {accountData && <NFTs />}
    </div>
  )
}

export default Index
