import { WalletConnectButton } from '@/components/wallet-connect-button'
import { useWallet } from '@/hooks/useWallet'

function App() {
  const { connected } = useWallet()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Studio Sites</h1>
          <WalletConnectButton />
        </div>

        {connected ? (
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">Welcome to Studio Sites!</h2>
            <p className="text-muted-foreground mb-6">
              Create your token project's profile and establish your brand in the Solana ecosystem.
            </p>
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Next Steps</h3>
              <ul className="text-left space-y-2 text-sm">
                <li>• Enter your token contract address</li>
                <li>• Customize your profile template</li>
                <li>• Choose your username</li>
                <li>• Publish your site</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">Jupiter Ecosystem Brand Builder</h2>
            <p className="text-muted-foreground mb-6">
              Professional profile websites for Solana token projects launched through Jupiter Studio.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-2">Token-Centric</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically fetch your token's metadata and display it beautifully
                </p>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-2">Professional</h3>
                <p className="text-sm text-muted-foreground">
                  Clean, Twitter-like templates optimized for crypto projects
                </p>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-2">Instant Deploy</h3>
                <p className="text-sm text-muted-foreground">
                  Get your own URL and go live in seconds
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
