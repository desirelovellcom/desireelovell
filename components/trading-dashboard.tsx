"use client"

import { useState } from "react"
import { LiquidGlass } from "@/app/components/liquid-glass"
import { WalletButton } from "./wallet-button"
import { TokenList } from "./token-list"
import { TradingPanel } from "./trading-panel"
import { PriceChart } from "./price-chart"
import { MOCK_TOKENS } from "@/lib/web3"
import { TrendingUp, BarChart3, Wallet } from "lucide-react"

export function TradingDashboard() {
  const [selectedToken, setSelectedToken] = useState(MOCK_TOKENS[0])
  const [activeTab, setActiveTab] = useState<"trade" | "chart" | "portfolio">("trade")

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="fixed left-0 top-0 right-0 bottom-0 w-full h-full bg-cover bg-center bg-no-repeat z-10"
        style={{
          backgroundImage: `url('/beautiful-pink-and-white-peonies-garden-background.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating peony petals */}
        <div className="absolute top-10 left-10 w-8 h-8 opacity-30 animate-float">
          <img src="/single-pink-peony-petal-floating.jpg" alt="" className="w-full h-full object-cover rounded-full" />
        </div>
        <div className="absolute top-32 right-20 w-6 h-6 opacity-25 animate-float-delayed">
          <img
            src="/single-white-peony-petal-floating.jpg"
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="absolute bottom-20 left-1/4 w-10 h-10 opacity-20 animate-float-slow">
          <img
            src="/single-coral-peony-petal-floating.jpg"
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="absolute top-1/2 right-1/3 w-7 h-7 opacity-25 animate-float">
          <img src="/single-pink-peony-petal-floating.jpg" alt="" className="w-full h-full object-cover rounded-full" />
        </div>
        <div className="absolute bottom-1/3 right-10 w-5 h-5 opacity-30 animate-float-delayed">
          <img
            src="/single-white-peony-petal-floating.jpg"
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {/* Existing animated background elements with peony-inspired colors */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-300/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-pink-200/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Header */}
      <div className="relative z-20 p-6">
        <LiquidGlass variant="panel" intensity="medium" className="mb-6" style={{ borderRadius: "24px" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-white">desireelovell</div>
              <div className="text-sm text-white/60">Web3 Currency Trading</div>
            </div>
            <WalletButton />
          </div>
        </LiquidGlass>

        {/* Navigation Tabs */}
        <LiquidGlass
          variant="panel"
          intensity="medium"
          className="mb-6"
          style={{ borderRadius: "20px", padding: "16px" }}
        >
          <div className="flex gap-2">
            {[
              { id: "trade", label: "Trade", icon: TrendingUp },
              { id: "chart", label: "Charts", icon: BarChart3 },
              { id: "portfolio", label: "Portfolio", icon: Wallet },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  activeTab === id
                    ? "bg-white/20 text-white border border-white/30"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </LiquidGlass>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Token List */}
          <div className="lg:col-span-1">
            <TokenList tokens={MOCK_TOKENS} selectedToken={selectedToken} onTokenSelect={setSelectedToken} />
          </div>

          {/* Main Panel */}
          <div className="lg:col-span-2">
            {activeTab === "trade" && <TradingPanel selectedToken={selectedToken} />}
            {activeTab === "chart" && <PriceChart selectedToken={selectedToken} />}
            {activeTab === "portfolio" && (
              <LiquidGlass variant="panel" intensity="medium" style={{ borderRadius: "24px" }}>
                <div className="text-center py-12">
                  <Wallet size={48} className="mx-auto mb-4 text-white/60" />
                  <h3 className="text-xl font-semibold text-white mb-2">Portfolio Coming Soon</h3>
                  <p className="text-white/60">Connect your wallet to view your portfolio</p>
                </div>
              </LiquidGlass>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
