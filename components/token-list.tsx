"use client"
import { LiquidGlass } from "@/app/components/liquid-glass"
import { formatCurrency } from "@/lib/web3"
import { TrendingUp, TrendingDown } from "lucide-react"

interface Token {
  symbol: string
  name: string
  price: number
  change24h: number
  icon: string
  chain: string
}

interface TokenListProps {
  tokens: Token[]
  selectedToken: Token
  onTokenSelect: (token: Token) => void
}

export function TokenList({ tokens, selectedToken, onTokenSelect }: TokenListProps) {
  return (
    <LiquidGlass variant="panel" intensity="medium" style={{ borderRadius: "24px" }}>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-white mb-4">Markets</h3>
        {tokens.map((token) => (
          <button
            key={token.symbol}
            onClick={() => onTokenSelect(token)}
            className={`w-full p-4 rounded-xl transition-all duration-200 text-left ${
              selectedToken.symbol === token.symbol ? "bg-white/20 border border-white/30" : "hover:bg-white/10"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{token.icon}</div>
                <div>
                  <div className="font-semibold text-white">{token.symbol}</div>
                  <div className="text-sm text-white/60">{token.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-white">{formatCurrency(token.price)}</div>
                <div
                  className={`text-sm flex items-center gap-1 ${
                    token.change24h >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {token.change24h >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {Math.abs(token.change24h).toFixed(2)}%
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </LiquidGlass>
  )
}
