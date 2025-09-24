"use client"

import { useState, useMemo } from "react"
import { LiquidGlass } from "@/app/components/liquid-glass"
import { formatCurrency } from "@/lib/web3"
import { TrendingUp, TrendingDown, BarChart3, Activity } from "lucide-react"

interface Token {
  symbol: string
  name: string
  price: number
  change24h: number
  icon: string
  chain: string
}

interface PriceChartProps {
  selectedToken: Token
}

export function PriceChart({ selectedToken }: PriceChartProps) {
  const [timeframe, setTimeframe] = useState<"1H" | "1D" | "1W" | "1M" | "1Y">("1D")
  const [chartType, setChartType] = useState<"line" | "candle">("line")

  // Generate mock price data
  const chartData = useMemo(() => {
    const basePrice = selectedToken.price
    const points =
      timeframe === "1H" ? 60 : timeframe === "1D" ? 24 : timeframe === "1W" ? 7 : timeframe === "1M" ? 30 : 365

    return Array.from({ length: points }, (_, i) => {
      const variation = (Math.random() - 0.5) * 0.1 // ±5% variation
      const trendFactor = selectedToken.change24h > 0 ? 1.001 : 0.999
      const price = basePrice * (1 + variation) * Math.pow(trendFactor, i)

      return {
        time: i,
        price: price,
        volume: Math.random() * 1000000,
      }
    })
  }, [selectedToken, timeframe])

  const maxPrice = Math.max(...chartData.map((d) => d.price))
  const minPrice = Math.min(...chartData.map((d) => d.price))
  const priceRange = maxPrice - minPrice

  const timeframes = [
    { label: "1H", value: "1H" as const },
    { label: "1D", value: "1D" as const },
    { label: "1W", value: "1W" as const },
    { label: "1M", value: "1M" as const },
    { label: "1Y", value: "1Y" as const },
  ]

  return (
    <div className="space-y-6">
      {/* Chart Header */}
      <LiquidGlass variant="panel" intensity="medium" style={{ borderRadius: "24px" }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{selectedToken.icon}</div>
            <div>
              <h2 className="text-xl font-bold text-white">{selectedToken.symbol} Price Chart</h2>
              <p className="text-white/60">{selectedToken.name}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setChartType("line")}
              className={`p-2 rounded-lg transition-all duration-200 ${
                chartType === "line"
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              <Activity size={16} />
            </button>
            <button
              onClick={() => setChartType("candle")}
              className={`p-2 rounded-lg transition-all duration-200 ${
                chartType === "candle"
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              <BarChart3 size={16} />
            </button>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="flex gap-2">
          {timeframes.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setTimeframe(value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                timeframe === value
                  ? "bg-white/20 text-white border border-white/30"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </LiquidGlass>

      {/* Chart Container */}
      <LiquidGlass variant="panel" intensity="medium" style={{ borderRadius: "24px" }}>
        <div className="space-y-4">
          {/* Price Info */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-white">{formatCurrency(selectedToken.price)}</div>
              <div
                className={`flex items-center gap-2 text-lg ${
                  selectedToken.change24h >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {selectedToken.change24h >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                {Math.abs(selectedToken.change24h).toFixed(2)}% ({timeframe})
              </div>
            </div>
            <div className="text-right text-sm text-white/60">
              <div>High: {formatCurrency(maxPrice)}</div>
              <div>Low: {formatCurrency(minPrice)}</div>
            </div>
          </div>

          {/* Chart Area */}
          <div className="relative h-80 bg-white/5 rounded-xl overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 800 320" className="absolute inset-0">
              {/* Grid Lines */}
              <defs>
                <pattern id="grid" width="40" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 32" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Price Line */}
              {chartType === "line" && (
                <path
                  d={`M ${chartData
                    .map((point, index) => {
                      const x = (index / (chartData.length - 1)) * 800
                      const y = 320 - ((point.price - minPrice) / priceRange) * 280 - 20
                      return `${index === 0 ? "M" : "L"} ${x} ${y}`
                    })
                    .join(" ")}`}
                  fill="none"
                  stroke={selectedToken.change24h >= 0 ? "#10b981" : "#ef4444"}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              )}

              {/* Area Fill */}
              {chartType === "line" && (
                <path
                  d={`M ${chartData
                    .map((point, index) => {
                      const x = (index / (chartData.length - 1)) * 800
                      const y = 320 - ((point.price - minPrice) / priceRange) * 280 - 20
                      return `${index === 0 ? "M" : "L"} ${x} ${y}`
                    })
                    .join(" ")} L 800 320 L 0 320 Z`}
                  fill={`url(#gradient-${selectedToken.change24h >= 0 ? "green" : "red"})`}
                />
              )}

              {/* Candlesticks */}
              {chartType === "candle" &&
                chartData.map((point, index) => {
                  const x = (index / (chartData.length - 1)) * 800
                  const isGreen = Math.random() > 0.5
                  const high = point.price * (1 + Math.random() * 0.02)
                  const low = point.price * (1 - Math.random() * 0.02)
                  const open = isGreen ? low + (high - low) * 0.3 : high - (high - low) * 0.3
                  const close = isGreen ? high - (high - low) * 0.3 : low + (high - low) * 0.3

                  const yHigh = 320 - ((high - minPrice) / priceRange) * 280 - 20
                  const yLow = 320 - ((low - minPrice) / priceRange) * 280 - 20
                  const yOpen = 320 - ((open - minPrice) / priceRange) * 280 - 20
                  const yClose = 320 - ((close - minPrice) / priceRange) * 280 - 20

                  return (
                    <g key={index}>
                      {/* Wick */}
                      <line
                        x1={x}
                        y1={yHigh}
                        x2={x}
                        y2={yLow}
                        stroke={isGreen ? "#10b981" : "#ef4444"}
                        strokeWidth="1"
                      />
                      {/* Body */}
                      <rect
                        x={x - 4}
                        y={Math.min(yOpen, yClose)}
                        width="8"
                        height={Math.abs(yClose - yOpen)}
                        fill={isGreen ? "#10b981" : "#ef4444"}
                      />
                    </g>
                  )
                })}

              {/* Gradients */}
              <defs>
                <linearGradient id="gradient-green" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="gradient-red" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Hover Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-full relative">
                {/* Price labels on Y-axis */}
                <div className="absolute left-2 top-4 text-xs text-white/60">{formatCurrency(maxPrice)}</div>
                <div className="absolute left-2 bottom-4 text-xs text-white/60">{formatCurrency(minPrice)}</div>
              </div>
            </div>
          </div>

          {/* Chart Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white/5 rounded-xl">
              <div className="text-sm text-white/60">Volume</div>
              <div className="font-semibold text-white">$2.4M</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-xl">
              <div className="text-sm text-white/60">Market Cap</div>
              <div className="font-semibold text-white">$45.2B</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-xl">
              <div className="text-sm text-white/60">24h High</div>
              <div className="font-semibold text-white">{formatCurrency(maxPrice)}</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-xl">
              <div className="text-sm text-white/60">24h Low</div>
              <div className="font-semibold text-white">{formatCurrency(minPrice)}</div>
            </div>
          </div>
        </div>
      </LiquidGlass>
    </div>
  )
}
