"use client"

import { useState } from "react"
import { LiquidGlass } from "@/app/components/liquid-glass"
import { LiquidButton } from "@/app/components/liquid-button"
import { formatCurrency } from "@/lib/web3"
import { ArrowUpDown, TrendingUp, TrendingDown, Zap, Clock } from "lucide-react"

interface Token {
  symbol: string
  name: string
  price: number
  change24h: number
  icon: string
  chain: string
}

interface TradingPanelProps {
  selectedToken: Token
}

export function TradingPanel({ selectedToken }: TradingPanelProps) {
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy")
  const [orderType, setOrderType] = useState<"market" | "limit">("market")
  const [amount, setAmount] = useState("")
  const [price, setPrice] = useState(selectedToken.price.toString())
  const [isTrading, setIsTrading] = useState(false)

  const handleTrade = async () => {
    setIsTrading(true)
    // Simulate trade execution
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsTrading(false)
    setAmount("")
    alert(`${tradeType.toUpperCase()} order for ${amount} ${selectedToken.symbol} submitted!`)
  }

  const totalValue = Number.parseFloat(amount || "0") * Number.parseFloat(price)

  return (
    <div className="space-y-6">
      {/* Token Info Header */}
      <LiquidGlass variant="panel" intensity="medium" style={{ borderRadius: "24px" }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{selectedToken.icon}</div>
            <div>
              <h2 className="text-2xl font-bold text-white">{selectedToken.symbol}</h2>
              <p className="text-white/60">{selectedToken.name}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{formatCurrency(selectedToken.price)}</div>
            <div
              className={`flex items-center gap-1 ${selectedToken.change24h >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {selectedToken.change24h >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {Math.abs(selectedToken.change24h).toFixed(2)}% (24h)
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white/5 rounded-xl">
            <div className="text-sm text-white/60">Volume (24h)</div>
            <div className="font-semibold text-white">$2.4M</div>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-xl">
            <div className="text-sm text-white/60">Market Cap</div>
            <div className="font-semibold text-white">$45.2B</div>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-xl">
            <div className="text-sm text-white/60">Supply</div>
            <div className="font-semibold text-white">120M</div>
          </div>
        </div>
      </LiquidGlass>

      {/* Trading Interface */}
      <LiquidGlass variant="panel" intensity="medium" style={{ borderRadius: "24px" }}>
        <div className="space-y-6">
          {/* Trade Type Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setTradeType("buy")}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                tradeType === "buy"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              Buy {selectedToken.symbol}
            </button>
            <button
              onClick={() => setTradeType("sell")}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                tradeType === "sell"
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              Sell {selectedToken.symbol}
            </button>
          </div>

          {/* Order Type */}
          <div className="flex gap-2">
            <button
              onClick={() => setOrderType("market")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                orderType === "market"
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              <Zap size={14} />
              Market
            </button>
            <button
              onClick={() => setOrderType("limit")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                orderType === "limit"
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              <Clock size={14} />
              Limit
            </button>
          </div>

          {/* Amount Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Amount ({selectedToken.symbol})</label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-sm font-medium hover:text-blue-300">
                  MAX
                </button>
              </div>
            </div>

            {orderType === "limit" && (
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Price (USD)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200"
                />
              </div>
            )}

            {/* Order Summary */}
            {amount && (
              <div className="p-4 bg-white/5 rounded-xl space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Total Value:</span>
                  <span className="text-white font-medium">{formatCurrency(totalValue)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Estimated Fee:</span>
                  <span className="text-white font-medium">{formatCurrency(totalValue * 0.003)}</span>
                </div>
                <hr className="border-white/20" />
                <div className="flex justify-between font-semibold">
                  <span className="text-white">Total:</span>
                  <span className="text-white">{formatCurrency(totalValue + totalValue * 0.003)}</span>
                </div>
              </div>
            )}

            {/* Trade Button */}
            <LiquidButton
              variant={tradeType === "buy" ? "primary" : "danger"}
              size="lg"
              onClick={handleTrade}
              loading={isTrading}
              disabled={!amount || Number.parseFloat(amount) <= 0}
              className="w-full"
              icon={<ArrowUpDown size={20} />}
            >
              {isTrading ? "Processing..." : `${tradeType.toUpperCase()} ${selectedToken.symbol}`}
            </LiquidButton>
          </div>
        </div>
      </LiquidGlass>

      {/* Recent Trades */}
      <LiquidGlass variant="panel" intensity="medium" style={{ borderRadius: "24px" }}>
        <h3 className="text-lg font-semibold text-white mb-4">Recent Trades</h3>
        <div className="space-y-2">
          {[
            { type: "buy", amount: "0.5", price: 2340.5, time: "2m ago" },
            { type: "sell", amount: "1.2", price: 2338.2, time: "5m ago" },
            { type: "buy", amount: "0.8", price: 2342.1, time: "8m ago" },
          ].map((trade, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${trade.type === "buy" ? "bg-green-400" : "bg-red-400"}`} />
                <span className="text-white font-medium">{trade.type.toUpperCase()}</span>
                <span className="text-white/60">
                  {trade.amount} {selectedToken.symbol}
                </span>
              </div>
              <div className="text-right">
                <div className="text-white font-medium">{formatCurrency(trade.price)}</div>
                <div className="text-xs text-white/60">{trade.time}</div>
              </div>
            </div>
          ))}
        </div>
      </LiquidGlass>
    </div>
  )
}
