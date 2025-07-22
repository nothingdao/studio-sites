import { Button } from '@/components/ui/button'
import { useWallet } from '@/hooks/useWallet'
import { Wallet } from 'lucide-react'

interface WalletConnectButtonProps {
  className?: string
}

export function WalletConnectButton({ className }: WalletConnectButtonProps) {
  const { connected, connecting, publicKey, connect, disconnect } = useWallet()

  const handleConnect = async () => {
    // For MVP, we'll use a mock wallet address
    // Later this will integrate with actual Solana wallet adapters
    const mockPublicKey = 'HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH' // Example Solana address
    await connect(mockPublicKey)
  }

  if (connecting) {
    return (
      <Button disabled className={className}>
        <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
        Connecting...
      </Button>
    )
  }

  if (connected && publicKey) {
    const truncatedAddress = `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`
    
    return (
      <Button variant="outline" onClick={disconnect} className={className}>
        <Wallet className="w-4 h-4 mr-2" />
        {truncatedAddress}
      </Button>
    )
  }

  return (
    <Button onClick={handleConnect} className={className}>
      <Wallet className="w-4 h-4 mr-2" />
      Connect Wallet
    </Button>
  )
}