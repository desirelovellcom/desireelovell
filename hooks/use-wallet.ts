"use client"

import { useState, useEffect, useCallback } from "react"
import type { WalletState } from "@/lib/web3"

declare global {
  interface Window {
    ethereum?: any
  }
}

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
  })
  const [isConnecting, setIsConnecting] = useState(false)

  const checkConnection = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum) return

    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      })

      if (accounts.length > 0) {
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [accounts[0], "latest"],
        })

        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        })

        setWallet({
          isConnected: true,
          address: accounts[0],
          balance: (Number.parseInt(balance, 16) / 1e18).toFixed(4),
          chainId: Number.parseInt(chainId, 16),
        })
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error)
    }
  }, [])

  const connectWallet = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("Please install MetaMask or another Web3 wallet!")
      return
    }

    setIsConnecting(true)

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length > 0) {
        await checkConnection()
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }, [checkConnection])

  const disconnectWallet = useCallback(() => {
    setWallet({ isConnected: false })
  }, [])

  useEffect(() => {
    checkConnection()

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", checkConnection)
      window.ethereum.on("chainChanged", checkConnection)

      return () => {
        window.ethereum.removeListener("accountsChanged", checkConnection)
        window.ethereum.removeListener("chainChanged", checkConnection)
      }
    }
  }, [checkConnection])

  return {
    wallet,
    isConnecting,
    connectWallet,
    disconnectWallet,
  }
}
