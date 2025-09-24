"use client"
import { LiquidGlass } from "@/app/components/liquid-glass"
import { X, Shield, Zap, Globe } from "lucide-react"

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: () => void
  isConnecting: boolean
}

export function WalletModal({ isOpen, onClose, onConnect, isConnecting }: WalletModalProps) {
  if (!isOpen) return null

  const walletOptions = [
    {
      name: "MetaMask",
      description: "Connect using browser extension",
      icon: "🦊",
      popular: true,
    },
    {
      name: "WalletConnect",
      description: "Scan with mobile wallet",
      icon: "📱",
      popular: false,
    },
    {
      name: "Coinbase Wallet",
      description: "Connect with Coinbase",
      icon: "🔵",
      popular: false,
    },
  ]

  const features = [
    {
      icon: Shield,
      title: "Secure",
      description: "Your keys, your crypto",
    },
    {
      icon: Zap,
      title: "Fast Trading",
      description: "Lightning-fast transactions",
    },
    {
      icon: Globe,
      title: "Multi-Chain",
      description: "Trade across networks",
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <LiquidGlass
        variant="panel"
        intensity="strong"
        className="relative max-w-md w-full"
        style={{ borderRadius: "24px" }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Connect Wallet</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          {walletOptions.map((wallet) => (
            <button
              key={wallet.name}
              onClick={onConnect}
              disabled={isConnecting}
              className="w-full p-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-200 text-left disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{wallet.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{wallet.name}</span>
                    {wallet.popular && (
                      <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full">Popular</span>
                    )}
                  </div>
                  <div className="text-sm text-white/60">{wallet.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="border-t border-white/20 pt-6">
          <h3 className="text-sm font-semibold text-white mb-4">Why connect a wallet?</h3>
          <div className="space-y-3">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-3">
                <feature.icon size={16} className="text-blue-400" />
                <div>
                  <div className="text-sm font-medium text-white">{feature.title}</div>
                  <div className="text-xs text-white/60">{feature.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isConnecting && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-3xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-2" />
              <div className="text-white font-medium">Connecting...</div>
            </div>
          </div>
        )}
      </LiquidGlass>
    </div>
  )
}
