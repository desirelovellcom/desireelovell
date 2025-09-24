"use client"

import { createPublicClient, http } from "viem"
import { mainnet, polygon, arbitrum } from "viem/chains"

// Supported networks
export const SUPPORTED_CHAINS = {
  ethereum: mainnet,
  polygon: polygon,
  arbitrum: arbitrum,
} as const

export type SupportedChain = keyof typeof SUPPORTED_CHAINS

// Create public clients for reading blockchain data
export const publicClients = {
  ethereum: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
  polygon: createPublicClient({
    chain: polygon,
    transport: http(),
  }),
  arbitrum: createPublicClient({
    chain: arbitrum,
    transport: http(),
  }),
}

// Mock token data for demo purposes
export const MOCK_TOKENS = [
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 2340.5,
    change24h: 2.45,
    icon: "⟠",
    chain: "ethereum" as SupportedChain,
  },
  {
    symbol: "MATIC",
    name: "Polygon",
    price: 0.85,
    change24h: -1.23,
    icon: "⬟",
    chain: "polygon" as SupportedChain,
  },
  {
    symbol: "ARB",
    name: "Arbitrum",
    price: 1.12,
    change24h: 5.67,
    icon: "◆",
    chain: "arbitrum" as SupportedChain,
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 43250.0,
    change24h: 1.89,
    icon: "₿",
    chain: "ethereum" as SupportedChain,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    price: 1.0,
    change24h: 0.01,
    icon: "$",
    chain: "ethereum" as SupportedChain,
  },
]

// Wallet connection utilities
export interface WalletState {
  isConnected: boolean
  address?: string
  balance?: string
  chainId?: number
}

export const formatCurrency = (amount: number, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(amount)
}

export const formatTokenAmount = (amount: string | number, decimals = 4) => {
  const num = typeof amount === "string" ? Number.parseFloat(amount) : amount
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  })
}
