import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { CheckCircle, ShieldAlert, TrendingUp, User } from "lucide-react";

export default function OpenAdvisorLandingPage() {
  // Placeholders for live data
  const counters = {
    deals: "0",
    value: "$0",
    advisors: "0",
  };

  return (
    <main className="space-y-20 p-8 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-extrabold">Turn crypto clout into transparent token grants</h1>
        <p className="text-lg text-gray-600">
          Link Twitter, accept Solana tokens, and share every deal on-chain. No more backroom handshakes.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">I’m a KOL — Connect Twitter</Button>
          <Button variant="outline" size="lg">I’m a Project — Make Offer</Button>
        </div>
      </section>

      {/* Social Proof */}
      <section className="flex justify-center space-x-12">
        <div className="flex items-center space-x-2">
          <CheckCircle className="text-green-500" />
          <span className="font-medium">{counters.deals} deals executed</span>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="text-blue-500" />
          <span className="font-medium">{counters.value} vested</span>
        </div>
        <div className="flex items-center space-x-2">
          <User className="text-purple-500" />
          <span className="font-medium">{counters.advisors} advisors onboarded</span>
        </div>
      </section>

      {/* How It Works */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* For KOLs */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">For KOLs</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Link your Twitter handle & wallet</li>
            <li>Review & sign a Solana token grant</li>
            <li>Let the bot add required #ad disclosures</li>
            <li>Watch tokens vest on-chain—use or trade freely</li>
          </ol>
        </div>
        {/* For Projects */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">For Projects</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Create an offer with vesting details</li>
            <li>Deposit Solana tokens into the vesting contract</li>
            <li>Let KOLs accept on-chain—no DMs needed</li>
            <li>Gain trust with a public deal ledger</li>
          </ol>
        </div>
      </section>

      {/* Compliance Flex */}
      <section className="bg-gray-50 p-8 rounded-lg space-y-4">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="text-red-500" />
          <h3 className="text-xl font-semibold">Compliance baked in</h3>
        </div>
        <p className="text-gray-700">
          We hard-coded SEC §17(b) and FTC disclosures into every agreement. No excuses, just transparency.
        </p>
        <a href="/SAATP.pdf" className="text-blue-600 underline">
          View the advisor agreement template
        </a>
      </section>

      {/* Live Deals Feed */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Live Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Placeholder cards */}
          <Card>
            <CardContent>
              <h4 className="font-semibold">@exampleKOL</h4>
              <p className="text-sm text-gray-600">ProjectX • 1% supply • Cliff 30 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h4 className="font-semibold">@anotherKOL</h4>
              <p className="text-sm text-gray-600">TokenY • 0.5% supply • Cliff 14 days</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing */}
      <section className="space-y-6 text-center">
        <h2 className="text-2xl font-semibold">Pricing</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <Card>
            <CardContent className="space-y-2">
              <h3 className="text-xl font-semibold">Free</h3>
              <p>Unlimited offers • 0.02% platform fee</p>
              <Button>Get Started</Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-2">
              <h3 className="text-xl font-semibold">Pro</h3>
              <p>White-label UI • Dedicated support • API access</p>
              <Button>Upgrade</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">FAQ</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="q1">
            <AccordionTrigger>Is this legal in the U.S.?</AccordionTrigger>
            <AccordionContent>
              Yes. Every grant uses a standard SEC-compliant advisor agreement and on-chain disclosures.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>Can I revoke a grant?</AccordionTrigger>
            <AccordionContent>
              Yes—projects retain revocation rights via the vesting contract until tokens unlock.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>Why Solana only?</AccordionTrigger>
            <AccordionContent>
              We launched on Solana for fast, low-cost transactions. More chains coming soon.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Final CTA */}
      <section className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Ready to turn influence into tokens?</h2>
        <div className="flex justify-center gap-4">
          <Button size="lg">I’m a KOL — Connect Twitter</Button>
          <Button variant="outline" size="lg">I’m a Project — Make Offer</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 space-y-2">
        <div className="flex justify-center space-x-4">
          <a href="/docs">Docs</a>
          <a href="/audit">Audit Report</a>
          <a href="/SAATP.pdf">SAATP PDF</a>
          <a href="https://twitter.com/OpenAdvisor">@OpenAdvisor</a>
        </div>
        <p>OpenAdvisor is not a broker-dealer. Use at your own risk.</p>
      </footer>
    </main>
  );
}
