"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wallet, ExternalLink, Coins, Activity } from "lucide-react"

export function Web3Section() {
  return (
    <section id="web3" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Web3 & <span className="text-primary">Blockchain</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Exploring the intersection of cybersecurity and decentralized technologies
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <Wallet className="w-8 h-8 text-primary mr-3" />
              <h3 className="text-xl font-bold">Wallet Security</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Specialized in smart contract security audits and wallet vulnerability assessments.
            </p>
            <div className="space-y-2">
              <Badge variant="outline">Smart Contract Audits</Badge>
              <Badge variant="outline">Wallet Security</Badge>
              <Badge variant="outline">DeFi Protocols</Badge>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <Activity className="w-8 h-8 text-primary mr-3" />
              <h3 className="text-xl font-bold">Contributions</h3>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-sm">Security Audits</span>
                <span className="text-primary font-semibold">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Bug Bounties</span>
                <span className="text-primary font-semibold">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Open Source PRs</span>
                <span className="text-primary font-semibold">24</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              <ExternalLink className="w-4 h-4 mr-2" />
              View on GitHub
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <Coins className="w-8 h-8 text-primary mr-3" />
              <h3 className="text-xl font-bold">Connect Wallet</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Connect your wallet to view my on-chain contributions and certifications.
            </p>
            <Button className="w-full mb-3">Connect Wallet</Button>
            <div className="text-center">
              <span className="text-xs text-muted-foreground">Supports MetaMask, WalletConnect, and more</span>
            </div>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Blockchain Security Training</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Offering specialized training programs on smart contract security, DeFi protocols, and blockchain
              forensics for development teams and security professionals.
            </p>
            <Button size="lg">Learn More About Training</Button>
          </Card>
        </div>
      </div>
    </section>
  )
}
