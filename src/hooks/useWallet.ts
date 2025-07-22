import { useState, useEffect } from 'react'

interface WalletState {
  connected: boolean
  publicKey: string | null
  connecting: boolean
}

const STORAGE_KEY = 'studio-sites-wallet'

export function useWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    connected: false,
    publicKey: null,
    connecting: false,
  })

  // Load wallet state from localStorage on mount
  useEffect(() => {
    const savedWallet = localStorage.getItem(STORAGE_KEY)
    if (savedWallet) {
      try {
        const parsed = JSON.parse(savedWallet)
        setWalletState(prev => ({ ...prev, ...parsed }))
      } catch (error) {
        console.error('Failed to parse saved wallet state:', error)
      }
    }
  }, [])

  // Save wallet state to localStorage whenever it changes
  useEffect(() => {
    if (walletState.connected && walletState.publicKey) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        connected: walletState.connected,
        publicKey: walletState.publicKey,
      }))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [walletState])

  const connect = async (publicKey: string) => {
    setWalletState(prev => ({ ...prev, connecting: true }))
    
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setWalletState({
      connected: true,
      publicKey,
      connecting: false,
    })
  }

  const disconnect = () => {
    setWalletState({
      connected: false,
      publicKey: null,
      connecting: false,
    })
  }

  return {
    ...walletState,
    connect,
    disconnect,
  }
}