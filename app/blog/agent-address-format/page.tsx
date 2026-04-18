'use client'

import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../../components/ContentNavigation'

export default function AgentAddressFormatPage() {

  const content = `# Why We Choose Hex-Encoded Ed25519 Over Ethereum Addresses

*September 2025 • Design Decision #005*

When designing agent network identities, we chose hex-encoded Ed25519 public keys with a 0x prefix. Familiar to developers, fast for agents, and honest about what it represents.

## The Address Format Dilemma

Every network needs addresses. TCP/IP has IP addresses. Ethereum has wallet addresses. ConnectOnion agents need their own addressing scheme. The question: what format serves both humans and machines?

## Why Not Ethereum Format?

Ethereum addresses (20 bytes, checksummed) are familiar to crypto developers. But using them creates confusion:

- Users expect Ethereum compatibility that doesn't exist
- 20 bytes loses security compared to full 32-byte keys
- Checksumming adds complexity without real benefit for agents

## Why Not Base58 (Bitcoin/Solana)?

Base58 is human-friendly - no confusing characters like 0/O or l/1. But:

- Requires base conversion (computational overhead)
- Variable length complicates parsing
- Not native to any programming language

## Why Ed25519?

### Performance
Ed25519: ~70,000 signatures/second
Secp256k1: ~20,000 signatures/second
**3.5x faster for agent communications**

### Security
- Deterministic signatures (same input → same signature)
- Resistant to timing attacks
- No random number generator vulnerabilities

### Simplicity
- Fixed 32-byte keys and 64-byte signatures
- Simple, clean API
- Battle-tested in SSH, Signal, and more

## Our Format: Honest and Fast

\`0x2b9def...7a3fdf\`

- **0x prefix**: Signals "this is cryptographic material"
- **64 hex chars**: The full Ed25519 public key
- **66 total chars**: Fixed length, easy to validate

## Developer Experience

\`\`\`python
# Generate
address = "0x" + public_key.hex()

# Validate
if address.startswith("0x") and len(address) == 66:
    public_key = bytes.fromhex(address[2:])
\`\`\`

No special libraries. No base conversions. No checksums. Just hex encoding that every language supports natively.

## Visual Truncation

For display, we show: \`0x2b9d...3fdf\`

First 6 chars + last 4 chars = enough visual distinction for humans while keeping displays clean.

## The Philosophy

Don't pretend to be something you're not. Our addresses aren't Ethereum addresses. They're not Bitcoin addresses. They're ConnectOnion agent addresses - hex-encoded Ed25519 public keys, fast for agents and familiar to developers.`

  return (
    <div className="w-full">
      <main className="p-4 lg:p-8 lg:px-16 pb-20">
        <article className="prose prose-invert max-w-none">
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="heading-1">
                Why We Choose Hex-Encoded Ed25519 Over Ethereum Addresses
              </h1>
              <p className="text-gray-700 text-lg">September 2025 • Design Decision #005</p>
            </div>
            <CopyMarkdownButton content={content} />
          </div>

          <div className="mt-8 space-y-6 text-gray-200">
            <p className="text-lg leading-relaxed text-gray-700 italic">
              When designing agent network identities, we chose hex-encoded Ed25519 public keys with a 0x prefix.
              Familiar to developers, fast for agents, and honest about what it represents.
            </p>

            <h2 className="heading-2">The Address Format Dilemma</h2>

            <p className="text-lg leading-relaxed">
              Every network needs addresses. TCP/IP has IP addresses. Ethereum has wallet addresses.
              ConnectOnion agents need their own addressing scheme. The question: what format serves both humans and machines?
            </p>

            <h2 className="heading-2">Why Not Ethereum Format?</h2>

            <p>
              Ethereum addresses (20 bytes, checksummed) are familiar to crypto developers. But using them creates confusion:
            </p>

            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
              <li>Users expect Ethereum compatibility that doesn't exist</li>
              <li>20 bytes loses security compared to full 32-byte keys</li>
              <li>Checksumming adds complexity without real benefit for agents</li>
            </ul>

            <h2 className="heading-2">Why Not Base58 (Bitcoin/Solana)?</h2>

            <p>
              Base58 is human-friendly - no confusing characters like 0/O or l/1. But:
            </p>

            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
              <li>Requires base conversion (computational overhead)</li>
              <li>Variable length complicates parsing</li>
              <li>Not native to any programming language</li>
            </ul>

            <h2 className="heading-2">Why Ed25519?</h2>

            <div className="grid md:grid-cols-3 gap-6 my-8">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-green-300 mb-4">Performance</h3>
                <p className="text-gray-700 text-sm">
                  Ed25519: ~70,000 sig/sec<br/>
                  Secp256k1: ~20,000 sig/sec
                </p>
                <p className="text-green-400 font-bold mt-2">3.5x faster</p>
              </div>

              <div className="bg-gray-50 border border-blue-500/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-blue-300 mb-4">Security</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>Deterministic signatures</li>
                  <li>Timing attack resistant</li>
                  <li>No RNG vulnerabilities</li>
                </ul>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-400 mb-4">Simplicity</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>Fixed 32B keys, 64B sigs</li>
                  <li>Simple, clean API</li>
                  <li>Used by SSH, Signal</li>
                </ul>
              </div>
            </div>

            <h2 className="heading-2">Our Format: Honest and Fast</h2>

            <div className="bg-gray-500/10 border border-gray-200 rounded-lg p-6 font-mono text-lg text-center my-8">
              <span className="text-gray-500">0x</span><span className="text-gray-700">2b9def...7a3fdf</span>
            </div>

            <div className="grid md:grid-cols-3 gap-4 my-8">
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center">
                <div className="text-gray-500 font-bold mb-2">0x prefix</div>
                <p className="text-gray-700 text-sm">Signals cryptographic material</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center">
                <div className="text-gray-500 font-bold mb-2">64 hex chars</div>
                <p className="text-gray-700 text-sm">Full Ed25519 public key</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center">
                <div className="text-gray-500 font-bold mb-2">66 total chars</div>
                <p className="text-gray-700 text-sm">Fixed length, easy to validate</p>
              </div>
            </div>

            <h2 className="heading-2">Developer Experience</h2>

            <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden my-6">
              <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                <span className="text-sm text-gray-700 font-mono">address.py</span>
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code className="text-gray-400">{`# Generate
address = "0x" + public_key.hex()

# Validate
if address.startswith("0x") and len(address) == 66:
    public_key = bytes.fromhex(address[2:])`}</code>
              </pre>
            </div>

            <p>
              No special libraries. No base conversions. No checksums. Just hex encoding that every language supports natively.
            </p>

            <h2 className="heading-2">Visual Truncation</h2>

            <p>
              For display, we show: <code className="bg-gray-100 text-gray-400 px-2 py-1 rounded font-mono text-sm">0x2b9d...3fdf</code>
            </p>

            <p>
              First 6 chars + last 4 chars = enough visual distinction for humans while keeping displays clean.
            </p>

            <h2 className="heading-2">The Philosophy</h2>

            <div className="bg-gradient-to-r from-gray-500/10 to-gray-500/10 rounded-lg p-6 border border-gray-200">
              <p className="text-lg text-gray-700 leading-relaxed">
                Don't pretend to be something you're not. Our addresses aren't Ethereum addresses.
                They're not Bitcoin addresses. They're ConnectOnion agent addresses -
                hex-encoded Ed25519 public keys, fast for agents and familiar to developers.
              </p>
            </div>

            <div className="border-t border-gray-800 mt-16 pt-8">
              <p className="text-gray-700 italic text-lg">
                The best address format is the one that developers never have to think about.
              </p>
            </div>

            {/* Navigation */}
            <ContentNavigation />
          </div>
        </article>
      </main>
    </div>
  )
}
