/**
 * @purpose CLI handoff command documentation
 * @context Where a handoff page's "Try it free" lands (o.openonion.ai/h/<id>): what handoff does, how to start,
 *          what leaves your machine and how it is encrypted, the commands. The engineering detail stays in the
 *          framework's docs/cli/handoff.md, published here as the markdown copy.
 */

'use client'

import { HiOutlineArrowsRightLeft, HiOutlineBolt, HiOutlineCommandLine, HiOutlineLockClosed, HiOutlineQuestionMarkCircle, HiOutlineShieldCheck, HiOutlineUserGroup } from 'react-icons/hi2'
import CodeWithResult from '../../../components/CodeWithResult'
import { CommandBlock } from '../../../components/CommandBlock'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'

const code = 'bg-gray-100 px-1 rounded'

export default function CliHandoffPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <section className="mb-16">
          <PageHeader
            breadcrumbs={[
              { label: 'Docs', href: '/' },
              { label: 'CLI', href: '/cli' },
              { label: 'co handoff' }
            ]}
            icon={HiOutlineArrowsRightLeft}
            iconColor="icon-ui"
            title="co handoff"
            description="Hand your Codex or Claude Code session to a teammate's agent: every message you wrote, the AI's replies, and where the code is. Redacted first, encrypted on your machine, sent only on your yes."
            markdownPath="/cli/handoff.md"
            markdownFilename="handoff.md"
          />

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-900">
              Tell your agent: <span className="text-green-700">&ldquo;Hand this to Bob.&rdquo;</span> Bob pastes one line into his own Codex or Claude Code, and it picks up where you stopped.
            </p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-gray-700" />
            Quick Start
          </h2>

          <CodeWithResult
            code={`# the skill, for Codex, Claude Code and the other agents npx skills supports
npx skills add openonion/handoff

# the co CLI it runs (1.9.3rc5 or later encrypts handoffs)
pip install --upgrade --pre connectonion`}
            language="bash"
          />

          <p className="text-gray-600 mt-4">
            Then, in the session you want to hand off, say <strong>&ldquo;hand this to bob@example.com&rdquo;</strong>. Your agent writes the handoff, shows you exactly what will leave, and sends it only when you say yes.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineUserGroup className="w-8 h-8 text-gray-700" />
            What Bob gets
          </h2>

          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            <li>A short note from you, from your own Gmail or Outlook when you&apos;ve connected one, with a link to the handoff and one line to copy.</li>
            <li>He pastes the line into a new Codex or Claude Code conversation, in the folder where he wants the code. His agent installs co if it&apos;s missing, accepts, and reads your conversation.</li>
            <li>When something isn&apos;t in the session, his agent asks yours, and yours answers from the session. Decisions only you can make come to you.</li>
            <li>When it&apos;s done, his agent sends the result back, a patch included, and you see it in <code className={code}>co handoff status</code>.</li>
          </ol>
          <p className="text-gray-600 mt-4">Bob needs no account and no setup first: Codex or Claude Code, and network for the one install.</p>
        </section>

        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineShieldCheck className="w-8 h-8 text-gray-700" />
            What leaves your machine
          </h2>

          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            <li><strong>Nothing goes until you approve.</strong> You see the exact text in the preview first.</li>
            <li><strong>Private sentences come out first, by your own agent.</strong> Your Codex or Claude Code reads every sentence and replaces each one about health, family, money, visas or someone else&apos;s affairs with <code className={code}>[removed: why]</code>. The preview lists where; you can put any back.</li>
            <li><strong>Secrets stop the send.</strong> Anything credential-shaped, and the values of your secret environment variables.</li>
            <li><strong>Other people stay out.</strong> Their email addresses, phone numbers and IPs are masked, and so are the names in your co rem notebook.</li>
            <li><strong>Only the conversation goes.</strong> The commands your agent ran, and their output, stay on your machine.</li>
            <li><strong>You can take it back.</strong> <code className={code}>co handoff withdraw &lt;id&gt;</code> removes the page and the pickup.</li>
          </ul>
        </section>

        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineLockClosed className="w-8 h-8 text-gray-700" />
            Encrypted on your machine
          </h2>

          <p className="text-gray-700 mb-4">
            co seals the handoff before it leaves your machine (AES-256-GCM, a fresh key for each one). The key travels only in the link you send, after the <code className={code}>#</code>, which a browser never sends to a server. ConnectOnion&apos;s server stores ciphertext it can&apos;t read; the handoff page decrypts in Bob&apos;s browser, and <code className={code}>co handoff accept</code> decrypts on his machine.
          </p>
          <p className="text-gray-700 mb-4">
            Once his agent accepts, every message between your two agents is end-to-end encrypted to each agent&apos;s own key: questions, answers, results and their files.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-gray-700 text-sm space-y-2">
            <p className="font-semibold text-gray-900">Where the key goes</p>
            <p>The note to Bob is ordinary mail and carries the link. Sent from your own Gmail or Outlook, the key never touches us. With neither connected, the note goes from your agent&apos;s mailbox, through ConnectOnion&apos;s mail service, and the preview says so.</p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCommandLine className="w-8 h-8 text-gray-700" />
            Commands
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Sending</h3>
              <CommandBlock
                commands={[
                  'co handoff send bob@example.com "the slugify rules"',
                  'co handoff send bob@example.com --draft ho-1a2b3c4d --yes',
                  'co handoff status ho-1a2b3c4d --wait',
                  'co handoff answer ho-1a2b3c4d "30 days, sliding"',
                  'co handoff withdraw ho-1a2b3c4d',
                ]}
              />
              <p className="text-gray-600 text-sm mt-3">
                <code className={code}>send</code> only previews; <code className={code}>--draft &lt;id&gt; --yes</code> sends exactly the previewed draft. <code className={code}>--since &lt;N&gt;</code> starts at message N, <code className={code}>--edit</code> changes the draft first, <code className={code}>--lang en|zh</code> picks the language of the report and the note. <code className={code}>status --wait</code> returns when they accept, ask or finish.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Receiving</h3>
              <CommandBlock
                commands={[
                  'co handoff accept "https://o.openonion.ai/h/<id>/codex#k=<key>"',
                  'co handoff ask <code> "Per folder or global?"',
                  'co handoff done <code> "Numbered per parent folder" --file result.patch',
                ]}
              />
              <p className="text-gray-600 text-sm mt-3">
                The pasted line has the agent run these itself. <code className={code}>accept</code> takes the whole link, <code className={code}>#k=</code> part included, or the code it prints.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineQuestionMarkCircle className="w-8 h-8 text-gray-700" />
            Questions
          </h2>

          <div className="space-y-6 text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Which agents work?</h3>
              <p>Send from a Codex, Claude Code, Gemini CLI, opencode, droid, Cursor or Grok session. Bob receives in Codex or Claude Code.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">What if Bob is offline?</h3>
              <p>The handoff waits for him. One nobody accepts expires after a week; once accepted it&apos;s kept for 30 days.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Can I send one session to several people?</h3>
              <p>Send one handoff each. The first agent to accept a handoff holds it; anyone else with a forwarded link is told it&apos;s taken.</p>
            </div>
          </div>
          <p className="text-gray-600 mt-8 text-sm">
            The skill and its README: <a className="text-green-700 underline" href="https://github.com/openonion/handoff">github.com/openonion/handoff</a>. Every detail of the format, the code and the transport is in the markdown copy of this page.
          </p>
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
