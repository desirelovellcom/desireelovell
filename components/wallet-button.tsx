"use client"

import { useState } from "react"
import { Wallet, LogOut, Copy, ExternalLink } from "lucide-react"
import { LiquidButton } from "@/app/components/liquid-button"
import { LiquidGlass } from "@/app/components/liquid-glass"
import { WalletModal } from "./wallet-modal"
import { useWallet } from "@/hooks/use-wallet"

export function WalletButton() {
  const { wallet, isConnecting, connectWallet, disconnectWallet } = useWallet()
  const [showModal, setShowModal] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const handleConnect = () => {
    setShowModal(false)
    connectWallet()
  }

  const copyAddress = () => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address)
    }
  }

  if (wallet.isConnected) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-200"
        >
          <div className="text-right">
            <div className="text-sm text-white/90 font-medium">
              {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
            </div>
            <div className="text-xs text-white/60">{wallet.balance} ETH</div>
          </div>
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Wallet size={16} className="text-white" />
          </div>
        </button>

        {showDropdown && (
          <div className="absolute top-full right-0 mt-2 z-50">
            <LiquidGlass
              variant="panel"
              intensity="strong"
              style={{ borderRadius: "16px", padding: "12px", minWidth: "200px" }}
            >
              <div className="space-y-2">
                <button
                  onClick={copyAddress}
                  className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 text-white text-sm"
                >
                  <Copy size={14} />
                  Copy Address
                </button>
                <button
                  onClick={() => window.open(`https://etherscan.io/address/${wallet.address}`, "_blank")}
                  className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 text-white text-sm"
                >
                  <ExternalLink size={14} />
                  View on Explorer
                </button>
                <hr className="border-white/20" />
                <button
                  onClick={disconnectWallet}
                  className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 text-red-400 text-sm"
                >
                  <LogOut size={14} />
                  Disconnect
                </button>
              </div>
            </LiquidGlass>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <LiquidButton variant="primary" onClick={() => setShowModal(true)} icon={<Wallet size={20} />}>
        Connect Wallet
      </LiquidButton>

      <WalletModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConnect={handleConnect}
        isConnecting={isConnecting}
      />
    </>
  )
}
