'use client'

import React from 'react'
import { HiOutlineCurrencyDollar, HiOutlineBolt, HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'

export default function PricingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
      <PageHeader
        breadcrumbs={[
          { label: 'Docs', href: '/' },
          { label: 'Models', href: '/models' },
          { label: 'Pricing' }
        ]}
        icon={HiOutlineCurrencyDollar}
        iconColor="text-green-400"
        iconBgFrom="from-green-600/20"
        iconBgTo="to-blue-600/20"
        iconBorderColor="border-green-500/30"
        title="Managed Keys Pricing"
        description="Same pricing as official APIs. No markup, no hidden fees. Pay only for what you use."
      />

      {/* How It Works */}
      <section className="mb-12">
        <h2 className="heading-2">How Managed Keys Work</h2>
        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-6 rounded-xl border border-purple-500/30 mb-6">
          <div className="space-y-4 text-slate-100">
            <div className="flex items-start gap-3">
              <span className="text-purple-400 font-bold text-lg">1.</span>
              <p>Add credits to your account — <a href="https://o.openonion.ai/purchase" target="_blank" rel="noopener" className="text-purple-400 hover:text-purple-300 underline">buy credits here</a> or run <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm">co purchase</code></p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-purple-400 font-bold text-lg">2.</span>
              <p>Use any model with the <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm">co/</code> prefix: <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm">model=&quot;co/gpt-5&quot;</code></p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-purple-400 font-bold text-lg">3.</span>
              <p>Credits are deducted per-token at official API rates. No expiration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Add Credits CTA */}
      <section className="mb-12">
        <a
          href="https://o.openonion.ai/purchase"
          target="_blank"
          rel="noopener"
          className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl hover:border-blue-400/50 transition-colors group"
        >
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Add Credits to Your Account</h3>
            <p className="text-sm text-slate-300">Free tier available — star our GitHub repo for $0.90 free credit</p>
          </div>
          <HiOutlineArrowTopRightOnSquare className="h-5 w-5 text-blue-400 group-hover:text-blue-300 flex-shrink-0" />
        </a>
      </section>

      {/* OpenAI Pricing */}
      <section className="mb-12">
        <h2 className="heading-2">OpenAI Models</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-200">Model</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-200">Input / 1M tokens</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-200">Output / 1M tokens</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-200">Best For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr>
                <td className="px-4 py-3"><code className="text-sm text-blue-300">gpt-5</code></td>
                <td className="px-4 py-3 text-slate-100">$1.25</td>
                <td className="px-4 py-3 text-slate-100">$10.00</td>
                <td className="px-4 py-3 text-slate-300">Coding, agentic tasks</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code className="text-sm text-blue-300">gpt-5-mini</code></td>
                <td className="px-4 py-3 text-slate-100">$0.25</td>
                <td className="px-4 py-3 text-slate-100">$2.00</td>
                <td className="px-4 py-3 text-slate-300">Fast, cost-effective</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code className="text-sm text-blue-300">gpt-5-nano</code></td>
                <td className="px-4 py-3 text-slate-100">$0.05</td>
                <td className="px-4 py-3 text-slate-100">$0.40</td>
                <td className="px-4 py-3 text-slate-300">Cheapest OpenAI</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code className="text-sm text-blue-300">gpt-4o</code></td>
                <td className="px-4 py-3 text-slate-100">$2.50</td>
                <td className="px-4 py-3 text-slate-100">$10.00</td>
                <td className="px-4 py-3 text-slate-300">Previous gen flagship</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code className="text-sm text-blue-300">gpt-4o-mini</code></td>
                <td className="px-4 py-3 text-slate-100">$0.15</td>
                <td className="px-4 py-3 text-slate-100">$0.60</td>
                <td className="px-4 py-3 text-slate-300">Most cost-effective</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code className="text-sm text-blue-300">o4-mini</code></td>
                <td className="px-4 py-3 text-slate-100">$3.00</td>
                <td className="px-4 py-3 text-slate-100">$12.00</td>
                <td className="px-4 py-3 text-slate-300">Reasoning</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Google Pricing */}
      <section className="mb-12">
        <h2 className="heading-2">Google Gemini Models</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-200">Model</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-200">Input / 1M tokens</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-200">Output / 1M tokens</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-200">Best For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr>
                <td className="px-4 py-3"><code className="text-sm text-green-300">gemini-3-pro-preview</code></td>
                <td className="px-4 py-3 text-slate-100">$2.00</td>
                <td className="px-4 py-3 text-slate-100">$12.00</td>
                <td className="px-4 py-3 text-slate-300">State-of-the-art reasoning</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code className="text-sm text-green-300">gemini-3-flash-preview</code></td>
                <td className="px-4 py-3 text-slate-100">$0.50</td>
                <td className="px-4 py-3 text-slate-100">$3.00</td>
                <td className="px-4 py-3 text-slate-300">Fastest Gemini 3</td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <code className="text-sm text-green-300">gemini-2.5-pro</code>
                  <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">default</span>
                </td>
                <td className="px-4 py-3 text-slate-100">$1.25</td>
                <td className="px-4 py-3 text-slate-100">$10.00</td>
                <td className="px-4 py-3 text-slate-300">Agent default, 2M context</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code className="text-sm text-green-300">gemini-2.5-flash</code></td>
                <td className="px-4 py-3 text-slate-100">$0.30</td>
                <td className="px-4 py-3 text-slate-100">$2.50</td>
                <td className="px-4 py-3 text-slate-300">Best price-performance</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code className="text-sm text-green-300">gemini-2.5-flash-lite</code></td>
                <td className="px-4 py-3 text-slate-100">$0.10</td>
                <td className="px-4 py-3 text-slate-100">$0.40</td>
                <td className="px-4 py-3 text-slate-300">Ultra fast, cheapest</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code className="text-sm text-green-300">gemini-2.0-flash</code></td>
                <td className="px-4 py-3 text-slate-100">$0.10</td>
                <td className="px-4 py-3 text-slate-100">$0.40</td>
                <td className="px-4 py-3 text-slate-300">Previous gen workhorse</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Anthropic Pricing */}
      <section className="mb-12">
        <h2 className="heading-2">Anthropic Claude Models</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-200">Model</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-200">Input / 1M tokens</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-200">Output / 1M tokens</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-200">Best For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr>
                <td className="px-4 py-3"><code className="text-sm text-orange-300">claude-opus-4-5</code></td>
                <td className="px-4 py-3 text-slate-100">$5.00</td>
                <td className="px-4 py-3 text-slate-100">$25.00</td>
                <td className="px-4 py-3 text-slate-300">Most capable</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code className="text-sm text-orange-300">claude-sonnet-4-5</code></td>
                <td className="px-4 py-3 text-slate-100">$3.00</td>
                <td className="px-4 py-3 text-slate-100">$15.00</td>
                <td className="px-4 py-3 text-slate-300">Best balance</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code className="text-sm text-orange-300">claude-haiku-4-5</code></td>
                <td className="px-4 py-3 text-slate-100">$1.00</td>
                <td className="px-4 py-3 text-slate-100">$5.00</td>
                <td className="px-4 py-3 text-slate-300">Fastest Claude</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code className="text-sm text-orange-300">claude-opus-4-1</code></td>
                <td className="px-4 py-3 text-slate-100">$15.00</td>
                <td className="px-4 py-3 text-slate-100">$75.00</td>
                <td className="px-4 py-3 text-slate-300">Specialized reasoning</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code className="text-sm text-orange-300">claude-sonnet-4</code></td>
                <td className="px-4 py-3 text-slate-100">$3.00</td>
                <td className="px-4 py-3 text-slate-100">$15.00</td>
                <td className="px-4 py-3 text-slate-300">Previous gen</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="heading-2">FAQ</h2>
        <div className="space-y-4">
          <div className="bg-gray-900 border border-gray-700 p-5 rounded-lg">
            <h3 className="font-semibold text-white mb-2">Is there a markup over official API pricing?</h3>
            <p className="text-slate-300 text-sm">No. We charge the same rates as official APIs. The pricing tables above match OpenAI, Google, and Anthropic official pricing.</p>
          </div>
          <div className="bg-gray-900 border border-gray-700 p-5 rounded-lg">
            <h3 className="font-semibold text-white mb-2">Do credits expire?</h3>
            <p className="text-slate-300 text-sm">No. Credits never expire. Use them whenever you want.</p>
          </div>
          <div className="bg-gray-900 border border-gray-700 p-5 rounded-lg">
            <h3 className="font-semibold text-white mb-2">How do I check my balance?</h3>
            <p className="text-slate-300 text-sm">Run <code className="bg-gray-800 px-1.5 py-0.5 rounded">co status</code> in your terminal, or visit the <a href="https://o.openonion.ai/dashboard" className="text-purple-400 hover:text-purple-300 underline">dashboard</a>.</p>
          </div>
          <div className="bg-gray-900 border border-gray-700 p-5 rounded-lg">
            <h3 className="font-semibold text-white mb-2">Can I switch between managed keys and my own keys?</h3>
            <p className="text-slate-300 text-sm">Yes. Use the <code className="bg-gray-800 px-1.5 py-0.5 rounded">co/</code> prefix for managed keys, or remove it to use your own API keys. Same code, just change the model name.</p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-6 rounded-lg border border-purple-500/30 mb-16">
        <h3 className="font-semibold mb-2 flex items-center text-white">
          <HiOutlineBolt className="mr-2 h-5 w-5 text-purple-400" />
          Get Started
        </h3>
        <ul className="space-y-2 text-sm text-slate-100">
          <li>• <strong>Free credits:</strong> <a href="https://github.com/wu-changxing/connectonion" target="_blank" rel="noopener" className="text-purple-400 hover:text-purple-300 underline">Star our repo</a> for $0.90 free credit</li>
          <li>• <strong>Add credits:</strong> <a href="https://o.openonion.ai/purchase" target="_blank" rel="noopener" className="text-purple-400 hover:text-purple-300 underline">Purchase credits</a> starting from $0.99</li>
          <li>• <strong>All models:</strong> See the full <a href="/models" className="text-purple-400 hover:text-purple-300 underline">model catalog</a> for capabilities and selection guide</li>
        </ul>
      </div>

      <ContentNavigation />
    </div>
  )
}
