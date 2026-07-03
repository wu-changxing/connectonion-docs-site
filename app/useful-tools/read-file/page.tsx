'use client'

import { HiOutlineDocumentText, HiOutlineBolt, HiOutlineTableCells, HiOutlineEye, HiOutlineCube } from 'react-icons/hi2'
import CodeWithResult from '../../../components/CodeWithResult'
import { CommandBlock } from '../../../components/CommandBlock'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'
import Link from 'next/link'

export default function ReadFilePage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Useful Tools', href: '/useful-tools' },
            { label: 'read_file' }
          ]}
          icon={HiOutlineDocumentText}
          iconColor="icon-ui"
          title="read_file"
          description="One copyable tool that reads any file — text, images, PDF, PowerPoint, Word, audio, video — and hands the extracted content to the agent."
          markdownPath="/useful-tools/read_file.md"
          markdownFilename="read_file.md"
        />

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-16">
          <p className="text-lg font-semibold text-gray-700">
            Point it at a file path and get the content back — the agent decides what to do with it. Images even enter the model&apos;s vision, so it can <em>see</em> and describe them.
          </p>
        </div>

        {/* Quick Start */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-gray-400" />
            Quick Start
          </h2>
          <p className="text-gray-700 mb-4">
            <code className="bg-gray-100 px-2 py-1 rounded">read_file</code> is a copyable tool — it isn&apos;t imported from the package. Copy it into your project:
          </p>
          <CommandBlock commands={['co copy read_file        # → ./tools/read_file.py']} />

          <p className="text-gray-700 mb-4 mt-8">
            Pass it to your agent. Add the <Link href="/useful-plugins/image-result-formatter" className="text-gray-700 underline hover:text-gray-900">image_result_formatter</Link> plugin so images reach the vision model:
          </p>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import image_result_formatter
from tools.read_file import read_file

agent = Agent(
    "assistant",
    tools=[read_file],
    plugins=[image_result_formatter],   # required so images reach the vision model
)

agent.input("What's in report.pdf?")
agent.input("Describe diagram.png")     # the model actually sees the image`}
            language="python"
          />
        </section>

        {/* Supported formats */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineTableCells className="w-8 h-8 text-gray-400" />
            Supported Formats
          </h2>
          <p className="text-gray-700 mb-4">One tool, dispatched by file extension:</p>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700">Extension</th>
                  <th className="text-left px-4 py-3 text-gray-700">Returns</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">.txt .md .csv .json .tex + code</td>
                  <td className="px-4 py-3 text-gray-700">the file&apos;s text, as-is (UTF-8, or GB18030 for Chinese)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">.png .jpg .jpeg .gif .webp</td>
                  <td className="px-4 py-3 text-gray-700">a <code className="bg-gray-100 px-1 rounded">data:image/…;base64,…</code> URL the vision model sees</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">.pdf</td>
                  <td className="px-4 py-3 text-gray-700">extracted text, one section per page</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">.pptx</td>
                  <td className="px-4 py-3 text-gray-700">the text of each slide</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">.docx</td>
                  <td className="px-4 py-3 text-gray-700">the document&apos;s text</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">.mp3 .wav .m4a … (audio)</td>
                  <td className="px-4 py-3 text-gray-700">a transcript (via <code className="bg-gray-100 px-1 rounded">transcribe()</code>)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">.mp4 .mov .mkv … (video)</td>
                  <td className="px-4 py-3 text-gray-700">a transcript of the <strong>audio</strong> track (ffmpeg → <code className="bg-gray-100 px-1 rounded">transcribe()</code>)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 text-sm mt-4">
            Legacy binary <code className="bg-gray-100 px-1 rounded">.ppt</code> / <code className="bg-gray-100 px-1 rounded">.doc</code>, scanned (text-less) PDFs, and a missing <code className="bg-gray-100 px-1 rounded">ffmpeg</code> return an actionable <code className="bg-gray-100 px-1 rounded">Error: …</code> string. Video reads the audio only — a silent screen recording has nothing to transcribe.
          </p>
        </section>

        {/* Supersedes note */}
        <section className="mb-20">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Supersedes the built-in read_file</h3>
            <p className="text-gray-700 text-sm">
              This tool shares the name <code className="bg-gray-100 px-1 rounded">read_file</code> with the lightweight built-in text reader in <Link href="/useful-tools/file-tools" className="text-gray-700 underline hover:text-gray-900">FileTools</Link> (text + line numbers). Copy this one in when you need the heavier formats — and pass one or the other, not both.
            </p>
          </div>
        </section>

        {/* How images reach the vision model */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineEye className="w-8 h-8 text-gray-400" />
            How Images Reach the Vision Model
          </h2>
          <p className="text-gray-700 mb-4">
            Reading an image is <strong>not</strong> the tool doing OCR or captioning. <code className="bg-gray-100 px-2 py-1 rounded">read_file</code> only produces the image <em>data</em>; a separate plugin turns that into something the model can actually see:
          </p>
          <CodeWithResult
            code={`read_file("diagram.png")
      │  returns  "data:image/png;base64,iVBORw0KGgo…"   (raw image bytes, base64)
      ▼
tool result  →  a normal text tool-message in the conversation
      ▼
image_result_formatter plugin        (runs on the after_tools event)
      │  1. detects the  data:image/…;base64,…  URL in the result
      │  2. replaces the tool message with a short placeholder
      │  3. inserts a user message: { "type": "image_url", "image_url": {...} }
      ▼
next LLM call  →  the model SEES the image (vision), not base64 text`}
            language="text"
          />
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-3 text-sm text-gray-700">
            <p>
              <strong>Why a plugin, and not read_file itself?</strong> A tool&apos;s return value can only become a <em>text</em> tool-message. Putting an image into the conversation means mutating the message list, which is only safe on the <code className="bg-gray-100 px-1 rounded">after_tools</code> event — so a plugin does it. This is the same path browser screenshots use.
            </p>
            <p>
              <strong>Consequence:</strong> images only reach the model if the agent has the <Link href="/useful-plugins/image-result-formatter" className="text-gray-700 underline hover:text-gray-900">image_result_formatter</Link> plugin. The <code className="bg-gray-100 px-1 rounded">minimal</code> template enables it by default; a bare <code className="bg-gray-100 px-1 rounded">Agent(...)</code> does not — add <code className="bg-gray-100 px-1 rounded">plugins=[image_result_formatter]</code>.
            </p>
          </div>
        </section>

        {/* Dependencies */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCube className="w-8 h-8 text-gray-400" />
            Dependencies
          </h2>
          <p className="text-gray-700 mb-4">
            Python packages ship with connectonion (no lazy imports, no &quot;package missing&quot; fallbacks — they&apos;re real dependencies):
          </p>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li className="flex items-start gap-2"><span className="text-gray-400 mt-1">•</span><span><code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">pypdf</code> — PDF text</span></li>
            <li className="flex items-start gap-2"><span className="text-gray-400 mt-1">•</span><span><code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">python-pptx</code> — PowerPoint slide text</span></li>
            <li className="flex items-start gap-2"><span className="text-gray-400 mt-1">•</span><span><code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">python-docx</code> — Word document text</span></li>
            <li className="flex items-start gap-2"><span className="text-gray-400 mt-1">•</span><span><code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">charset-normalizer</code> — text encoding detection</span></li>
          </ul>
          <p className="text-gray-700">
            System tool: <strong>ffmpeg</strong> on <code className="bg-gray-100 px-1 rounded">PATH</code>, for video only (not a pip package — <code className="bg-gray-100 px-1 rounded">brew install ffmpeg</code> / <code className="bg-gray-100 px-1 rounded">apt install ffmpeg</code>). Audio and video transcription use the Gemini-based <code className="bg-gray-100 px-1 rounded">transcribe()</code>, which needs <code className="bg-gray-100 px-1 rounded">co auth</code> (a managed key); audio needs no ffmpeg.
          </p>
        </section>

        {/* See Also */}
        <section className="mb-20">
          <h2 className="heading-2">See Also</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2"><span className="text-gray-400 mt-1">•</span><span><Link href="/useful-plugins/image-result-formatter" className="text-gray-700 underline hover:text-gray-900">image_result_formatter</Link> — turns the image data URL into a real image the vision model sees</span></li>
            <li className="flex items-start gap-2"><span className="text-gray-400 mt-1">•</span><span><Link href="/useful-tools/file-tools" className="text-gray-700 underline hover:text-gray-900">FileTools</Link> — the built-in lightweight text read_file (line numbers, read-before-edit)</span></li>
          </ul>
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
