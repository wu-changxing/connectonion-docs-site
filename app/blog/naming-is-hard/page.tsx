'use client'

import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../../components/ContentNavigation'

export default function NamingIsHardPage() {

  const content = `# Why We Call It "Address" Instead of "Identity"

*September 2025 • Design Decision #004*

Naming is hard. We spent days debating whether to call it an "address" or "identity". The answer came from asking: what mental model serves developers best?

## The Identity Trap

"Identity" sounds sophisticated. It implies persistence, uniqueness, authenticity. But it also carries baggage:

- Identity suggests claims about who or what something is
- Identity systems usually involve trust, verification, attestation
- Identity feels permanent and heavy

When a developer sees "identity", they expect complexity: identity providers, OIDC flows, JWT tokens, claims, scopes. They expect bureaucracy.

## The Beauty of "Address"

Everyone understands addresses. Your house has one. Your email has one. Your server has one. An address is simply **where to find something**.

### Addresses are:
- **Functional**: They route messages
- **Simple**: Just a string that points somewhere
- **Temporary**: Can be changed or discarded
- **Neutral**: No claims about identity or trust

## The Mental Model Test

| With "Identity" | With "Address" |
|----------------|----------------|
| "Generate an identity for the agent" | "Generate an address for the agent" |
| "Verify the agent's identity" | "Send message to this address" |
| "The agent's identity is..." | "The agent's address is..." |
| Feels heavy, permanent, complex | Feels simple, functional, clear |

## Prior Art Supports "Address"

- **Ethereum**: Wallet address (not wallet identity)
- **Bitcoin**: Bitcoin address (not Bitcoin identity)
- **TCP/IP**: IP address (not computer identity)
- **Email**: Email address (not email identity)

The pattern is clear: networks use addresses for routing, not identities for authentication.

## The Code Tells the Truth

\`\`\`python
# What we generate
address = "0x" + public_key.hex()

# What it does
send_message(to=address, content=data)

# What it doesn't do
# verify_identity(address)
# get_claims(address)
# trust_score(address)
\`\`\`

It's just a public key. It routes messages. It doesn't make claims. That's an address, not an identity.

## When We Almost Used "Identity"

For 48 hours, our code used \`agent_identity\`. Then a user asked:

> "For people not familiar with agent development, it will be confusing what is address"

They were right, but backwards. People unfamiliar with crypto understand "address" perfectly. It's "identity" that confuses them. Everyone has mailed a letter. Not everyone has contemplated digital identity systems.

## The Final Decision

We call it an **address** because that's what it is: a way to reach an agent. Nothing more, nothing less.

If we add identity features later (reputation, attestations, trust scores), those will be separate layers built on top of addresses. The address just gets you there. What you find when you arrive is a different question.`

  return (
    <div className="w-full">
      <main className="p-4 lg:p-8 lg:px-16 pb-20">
        <article className="prose prose-gray max-w-2xl mx-auto">
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="heading-1">
                Why We Call It "Address" Instead of "Identity"
              </h1>
              <p className="text-gray-700 text-lg">September 2025 • Design Decision #004</p>
            </div>
            <CopyMarkdownButton content={content} />
          </div>

          <div className="mt-8 space-y-6 text-gray-700">
            <p className="text-xl leading-relaxed text-gray-600 italic">
              Naming is hard. We spent days debating whether to call it an "address" or "identity".
              The answer came from asking: what mental model serves developers best?
            </p>

            <h2 className="heading-2">The Identity Trap</h2>

            <p className="text-lg leading-relaxed">
              "Identity" sounds sophisticated. It implies persistence, uniqueness, authenticity. But it also carries baggage:
            </p>

            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
              <li>Identity suggests claims about who or what something is</li>
              <li>Identity systems usually involve trust, verification, attestation</li>
              <li>Identity feels permanent and heavy</li>
            </ul>

            <div className="bg-red-900/20 border border-red-200 rounded-lg p-6 my-6">
              <p className="text-red-800">
                When a developer sees "identity", they expect complexity: identity providers, OIDC flows,
                JWT tokens, claims, scopes. They expect bureaucracy.
              </p>
            </div>

            <h2 className="heading-2">The Beauty of "Address"</h2>

            <p className="text-lg leading-relaxed">
              Everyone understands addresses. Your house has one. Your email has one. Your server has one.
              An address is simply <strong className="text-gray-900">where to find something</strong>.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-8">
              <h3 className="text-xl font-semibold text-gray-400 mb-4">Addresses are:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-gray-500 font-bold">Functional</span>
                  <span className="text-gray-700">They route messages</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-500 font-bold">Simple</span>
                  <span className="text-gray-700">Just a string that points somewhere</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-500 font-bold">Temporary</span>
                  <span className="text-gray-700">Can be changed or discarded</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-500 font-bold">Neutral</span>
                  <span className="text-gray-700">No claims about identity or trust</span>
                </div>
              </div>
            </div>

            <h2 className="heading-2">The Mental Model Test</h2>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                <h3 className="text-red-700 font-semibold mb-4">With "Identity"</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>"Generate an identity for the agent"</li>
                  <li>"Verify the agent's identity"</li>
                  <li>"The agent's identity is..."</li>
                </ul>
                <p className="text-gray-500 text-xs mt-4">Feels heavy, permanent, complex</p>
              </div>

              <div className="bg-gray-500/10 border border-gray-200 rounded-lg p-6">
                <h3 className="text-green-700 font-semibold mb-4">With "Address"</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>"Generate an address for the agent"</li>
                  <li>"Send message to this address"</li>
                  <li>"The agent's address is..."</li>
                </ul>
                <p className="text-gray-500 text-xs mt-4">Feels simple, functional, clear</p>
              </div>
            </div>

            <h2 className="heading-2">Prior Art Supports "Address"</h2>

            <div className="space-y-4 my-8">
              {[
                { name: 'Ethereum', term: 'Wallet address (not wallet identity)' },
                { name: 'Bitcoin', term: 'Bitcoin address (not Bitcoin identity)' },
                { name: 'TCP/IP', term: 'IP address (not computer identity)' },
                { name: 'Email', term: 'Email address (not email identity)' },
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center gap-4">
                  <strong className="text-gray-500 min-w-[100px]">{item.name}</strong>
                  <span className="text-gray-700">{item.term}</span>
                </div>
              ))}
            </div>

            <p>The pattern is clear: networks use addresses for routing, not identities for authentication.</p>

            <h2 className="heading-2">The Code Tells the Truth</h2>

            <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden my-6">
              <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                <span className="text-sm text-gray-700 font-mono">address.py</span>
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code className="text-gray-400">{`# What we generate
address = "0x" + public_key.hex()

# What it does
send_message(to=address, content=data)

# What it doesn't do
# verify_identity(address)
# get_claims(address)
# trust_score(address)`}</code>
              </pre>
            </div>

            <p>
              It's just a public key. It routes messages. It doesn't make claims.
              That's an address, not an identity.
            </p>

            <h2 className="heading-2">When We Almost Used "Identity"</h2>

            <p>
              For 48 hours, our code used <code className="bg-gray-100 text-gray-400 px-2 py-1 rounded font-mono text-sm">agent_identity</code>.
              Then a user asked:
            </p>

            <div className="bg-gray-500/10 border border-yellow-500/20 rounded-lg p-6 my-6">
              <p className="text-gray-700 italic text-lg">
                "For people not familiar with agent development, it will be confusing what is address"
              </p>
            </div>

            <p>
              They were right, but backwards. People unfamiliar with crypto understand "address" perfectly.
              It's "identity" that confuses them. Everyone has mailed a letter. Not everyone has contemplated
              digital identity systems.
            </p>

            <h2 className="heading-2">The Final Decision</h2>

            <div className="bg-gradient-to-r from-gray-500/10 to-gray-500/10 rounded-lg p-6 border border-gray-200">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We call it an <strong className="text-gray-900">address</strong> because that's what it is:
                a way to reach an agent. Nothing more, nothing less.
              </p>
              <p className="text-gray-700">
                If we add identity features later (reputation, attestations, trust scores), those will be
                separate layers built on top of addresses. The address just gets you there.
                What you find when you arrive is a different question.
              </p>
            </div>

            <div className="border-t border-gray-800 mt-16 pt-8">
              <p className="text-gray-700 italic text-lg">
                The best naming decisions make users forget they're making a decision at all.
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
