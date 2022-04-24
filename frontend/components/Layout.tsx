import Header from '../components/Header'
import { useAccount } from '../contexts/AppContext'

export default function Layout({ children }: { children: any }) {
  const account = useAccount()

  return (
    <div>
      <Header />
      {account && children}
    </div>
  )
}
