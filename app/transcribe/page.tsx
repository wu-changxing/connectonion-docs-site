'use client'
/*
  @date: 2025-12-18
  @description: Transcribe Page - Audio transcription utility documentation
*/
import { useState } from 'react'
import Link from 'next/link'
import CodeWithResult from '../../components/CodeWithResult'
import { ContentNavigation } from '../../components/ContentNavigation'
import { HiOutlineMicrophone } from 'react-icons/hi2'
import { FaCheckCircle } from 'react-icons/fa'
import { PageHeader } from '../../components/PageHeader'

export default function TranscribePage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  return (
    <div className="max-w-4xl mx-auto px-8 py-16 md:py-24 lg:py-16 md:py-24 pt-16 lg:pt-12">
      <PageHeader
        breadcrumbs={[
          { label: 'Docs', href: '/' },
          { label: 'Transcribe' }
        ]}
        icon={HiOutlineMicrophone}
        iconColor="text-purple-400"
        iconBgFrom="from-purple-600/20"
        iconBgTo="to-pink-600/20"
        iconBorderColor="border-purple-500/30"
        title="Audio Transcription"
        description="Convert audio files to text using Gemini's multimodal capabilities. Simple one-function interface for transcription."
        markdownPath="/transcribe/transcribe.md"
        markdownFilename="transcribe.md"
      />

      {/* Quick Start Section */}
      <section className="mb-12">
        <h2 className="heading-2">Quick Start</h2>

        <CodeWithResult
          code={`from connectonion import transcribe

# Simple transcription (uses OpenOnion managed keys)
text = transcribe("meeting.mp3")
print(text)

# With your own Gemini API key
text = transcribe("meeting.mp3", model="gemini-3-flash-preview")`}
          result={`>>> text = transcribe("meeting.mp3")
>>> print(text)
All right, so here we are in front of the elephants...`}
          className="mb-6"
        />

        <p className="text-slate-100">That's it! One function for audio-to-text.</p>
      </section>

      {/* With Context Hints */}
      <section className="mb-12">
        <h2 className="heading-2">With Context Hints</h2>
        <p className="text-slate-100 mb-4">Improve accuracy for domain-specific terms:</p>

        <CodeWithResult
          code={`# Technical meeting with specific names
text = transcribe(
    "standup.mp3",
    prompt="Technical AI discussion. Names: Aaron, Lisa. Terms: ConnectOnion, OpenOnion"
)

# Medical transcription
text = transcribe(
    "consultation.mp3",
    prompt="Medical consultation. Terms: hypertension, metformin, CBC"
)`}
          result={`>>> text = transcribe("standup.mp3", prompt="Technical AI discussion...")
>>> print(text)
Aaron mentioned that ConnectOnion's new feature is ready for review...`}
          className="mb-6"
        />
      </section>

      {/* With Timestamps */}
      <section className="mb-12">
        <h2 className="heading-2">With Timestamps</h2>

        <CodeWithResult
          code={`text = transcribe("podcast.mp3", timestamps=True)
print(text)`}
          result={`>>> text = transcribe("podcast.mp3", timestamps=True)
>>> print(text)
[00:00] Welcome to the show...
[00:15] Today we're discussing AI agents...
[01:30] Let's dive into the first topic...`}
          className="mb-6"
        />
      </section>

      {/* Real Examples */}
      <section className="mb-12">
        <h2 className="heading-2">Real Examples</h2>

        <div className="space-y-8">
          {/* Meeting Minutes */}
          <div>
            <h3 className="text-xl font-semibold text-green-400 mb-4">Meeting Minutes</h3>
            <CodeWithResult
              code={`def get_meeting_minutes(audio_path: str) -> str:
    """Transcribe and summarize a meeting."""
    from connectonion import transcribe, llm_do

    # Step 1: Transcribe
    transcript = transcribe(audio_path, prompt="Business meeting")

    # Step 2: Summarize
    summary = llm_do(
        transcript,
        system_prompt="Extract action items and key decisions as bullet points."
    )
    return summary`}
              result={`>>> summary = get_meeting_minutes("standup.mp3")
>>> print(summary)
**Action Items:**
- Aaron to review PR #123
- Lisa to update documentation

**Key Decisions:**
- Launch date set for Friday`}
              className="mb-4"
            />
          </div>

          {/* Voice Notes Processing */}
          <div>
            <h3 className="text-xl font-semibold text-green-400 mb-4">Voice Notes Processing</h3>
            <CodeWithResult
              code={`from pathlib import Path

def process_voice_notes(folder: str) -> list[str]:
    """Transcribe all voice notes in a folder."""
    from connectonion import transcribe

    results = []
    for audio in Path(folder).glob("*.mp3"):
        text = transcribe(str(audio))
        results.append(f"# {audio.stem}\\n{text}")
    return results`}
              result={`>>> notes = process_voice_notes("voice_notes/")
>>> print(notes[0])
# idea_2024_01
Remember to add the new transcribe feature to the docs...`}
              className="mb-4"
            />
          </div>

          {/* Use as Agent Tool */}
          <div>
            <h3 className="text-xl font-semibold text-green-400 mb-4">Use as Agent Tool</h3>
            <CodeWithResult
              code={`from connectonion import Agent, transcribe

def transcribe_audio(file_path: str) -> str:
    """Transcribe an audio file to text."""
    return transcribe(file_path)

agent = Agent("assistant", tools=[transcribe_audio])
result = agent.input("Transcribe the file meeting.mp3 and summarize it")`}
              result={`>>> result = agent.input("Transcribe meeting.mp3 and summarize it")
>>> print(result)
I've transcribed the meeting. Here's a summary:
The team discussed the Q4 roadmap and agreed to...`}
            />
          </div>
        </div>
      </section>

      {/* Parameters Table */}
      <section className="mb-12">
        <h2 className="heading-2">Parameters</h2>

        <div className="table-wrapper">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-green-400">Parameter</th>
                <th className="text-left py-3 px-4 text-green-400">Type</th>
                <th className="text-left py-3 px-4 text-green-400">Default</th>
                <th className="text-left py-3 px-4 text-green-400">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800">
                <td className="py-3 px-4"><code className="text-purple-400">audio</code></td>
                <td className="py-3 px-4 text-slate-100">str</td>
                <td className="py-3 px-4 text-slate-100">required</td>
                <td className="py-3 px-4 text-slate-100">Path to audio file</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3 px-4"><code className="text-purple-400">prompt</code></td>
                <td className="py-3 px-4 text-slate-100">str</td>
                <td className="py-3 px-4 text-slate-100">None</td>
                <td className="py-3 px-4 text-slate-100">Context hints for accuracy</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3 px-4"><code className="text-purple-400">model</code></td>
                <td className="py-3 px-4 text-slate-100">str</td>
                <td className="py-3 px-4 text-slate-100">"co/gemini-3-flash-preview"</td>
                <td className="py-3 px-4 text-slate-100">Model to use</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3 px-4"><code className="text-purple-400">timestamps</code></td>
                <td className="py-3 px-4 text-slate-100">bool</td>
                <td className="py-3 px-4 text-slate-100">False</td>
                <td className="py-3 px-4 text-slate-100">Include timestamps in output</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Supported Formats */}
      <section className="mb-12">
        <h2 className="heading-2">Supported Formats</h2>

        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex flex-wrap gap-3 mb-4">
            {['WAV', 'MP3', 'AIFF', 'AAC', 'OGG', 'FLAC', 'M4A', 'WebM'].map((format) => (
              <span key={format} className="px-3 py-1 bg-gray-800 rounded-full text-green-400 text-sm font-mono">
                {format}
              </span>
            ))}
          </div>
          <p className="text-slate-100">
            <strong className="text-purple-400">Token cost:</strong> 32 tokens per second of audio (1 minute = 1,920 tokens)
          </p>
        </div>
      </section>

      {/* Models */}
      <section className="mb-12">
        <h2 className="heading-2">Models</h2>

        <CodeWithResult
          code={`# OpenOnion managed keys (default - no API key needed)
transcribe("audio.mp3", model="co/gemini-3-flash-preview")
transcribe("audio.mp3", model="co/gemini-2.5-flash")

# Your own Gemini API key (set GEMINI_API_KEY)
transcribe("audio.mp3", model="gemini-3-flash-preview")
transcribe("audio.mp3", model="gemini-2.5-flash")`}
          result={`>>> transcribe("audio.mp3", model="co/gemini-3-flash-preview")
'This is the transcribed text from your audio file...'

>>> transcribe("audio.mp3", model="gemini-2.5-flash")
'This is the transcribed text using your own API key...'`}
          className="mb-6"
        />
      </section>

      {/* What You Get */}
      <section className="mb-12">
        <h2 className="heading-2">What You Get</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            { text: "Simple API - One function for all transcription needs", icon: <FaCheckCircle className="text-green-400" /> },
            { text: "Context hints - Improve accuracy with domain terms", icon: <FaCheckCircle className="text-green-400" /> },
            { text: "Multiple formats - WAV, MP3, FLAC, and more", icon: <FaCheckCircle className="text-green-400" /> },
            { text: "Timestamps - Optional time markers in output", icon: <FaCheckCircle className="text-green-400" /> },
            { text: "Managed keys - Works out of the box with co/ models", icon: <FaCheckCircle className="text-green-400" /> }
          ].map((item, i) => (
            <div key={i} className="bg-gray-900 rounded-lg p-4 flex items-start gap-3">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-slate-100">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison with Agent */}
      <section className="mb-12">
        <h2 className="heading-2">Comparison with Agent</h2>

        <div className="table-wrapper">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-green-400">Feature</th>
                <th className="text-left py-3 px-4 text-green-400">transcribe()</th>
                <th className="text-left py-3 px-4 text-green-400">Agent()</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800">
                <td className="py-3 px-4 text-slate-100">Purpose</td>
                <td className="py-3 px-4 text-slate-100">Audio to text</td>
                <td className="py-3 px-4 text-slate-100">Multi-step workflows</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3 px-4 text-slate-100">Input</td>
                <td className="py-3 px-4 text-slate-100">Audio files</td>
                <td className="py-3 px-4 text-slate-100">Text prompts</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3 px-4 text-slate-100">Output</td>
                <td className="py-3 px-4 text-slate-100">Plain text</td>
                <td className="py-3 px-4 text-slate-100">Agent responses</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3 px-4 text-slate-100">Best for</td>
                <td className="py-3 px-4 text-slate-100">Transcription</td>
                <td className="py-3 px-4 text-slate-100">Complex tasks</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeWithResult
          code={`# Use transcribe() for audio-to-text
text = transcribe("meeting.mp3")

# Use Agent for complex workflows with multiple tools
agent = Agent("assistant", tools=[search, calculate])
result = agent.input("Research and analyze...")`}
          result={`>>> text = transcribe("meeting.mp3")
>>> print(text[:50])
'All right, so here we are in front of the elepha...'

>>> result = agent.input("Research and analyze...")
>>> print(result)
I'll help you research and analyze...`}
          className="mt-6"
        />
      </section>

      {/* Error Handling */}
      <section className="mb-12">
        <h2 className="heading-2">Error Handling</h2>

        <CodeWithResult
          code={`from connectonion import transcribe

try:
    text = transcribe("nonexistent.mp3")
except FileNotFoundError:
    print("Audio file not found")
except ValueError as e:
    print(f"API error: {e}")`}
          result={`>>> try:
...     text = transcribe("nonexistent.mp3")
... except FileNotFoundError:
...     print("Audio file not found")
Audio file not found`}
          className="mb-6"
        />
      </section>

      {/* Next Steps */}
      <section className="mb-12">
        <h2 className="heading-2">Next Steps</h2>

        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/llm_do" className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors">
            <h3 className="text-lg font-semibold text-white mb-2">Learn about llm_do()</h3>
            <p className="text-sm text-slate-100">For one-shot LLM calls</p>
          </Link>
          <Link href="/agent" className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors">
            <h3 className="text-lg font-semibold text-white mb-2">Explore Agents</h3>
            <p className="text-sm text-slate-100">For multi-step workflows</p>
          </Link>
          <Link href="/tools" className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors">
            <h3 className="text-lg font-semibold text-white mb-2">See Tools</h3>
            <p className="text-sm text-slate-100">For extending agents</p>
          </Link>
        </div>
      </section>

      <ContentNavigation />
    </div>
  )
}
