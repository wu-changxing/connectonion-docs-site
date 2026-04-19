'use client'

import React from 'react'
import { HiOutlinePhoto, HiOutlineArrowRight, HiOutlineEye, HiOutlineCamera, HiOutlineSparkles } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import Link from 'next/link'
import CodeWithResult from '../../../components/CodeWithResult'
import { PageHeader } from '../../../components/PageHeader'

export default function ImageResultFormatterPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Useful Plugins', href: '/useful-plugins' },
            { label: 'image_result_formatter' },
          ]}
          icon={HiOutlinePhoto}
          iconColor="icon-ui"
          title="image_result_formatter"
          description="Enable vision models to see images from tool results"
          markdownPath="/useful-plugins/image_result_formatter.md"
          markdownFilename="image-result-formatter.md"
        />

        {/* What it does */}
        <section className="mb-12">
          <h2 className="heading-2">What it does</h2>
          <p className="text-gray-700 mb-6">
            When a tool returns a base64-encoded image (screenshot, generated image, etc.), this plugin:
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineEye className="w-5 h-5 text-gray-500" />
                <h3 className="font-semibold">Detects base64 images</h3>
              </div>
              <p className="text-sm text-gray-700">Recognizes data URLs (<code>data:image/png;base64,...</code>) and plain base64 strings.</p>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineSparkles className="w-5 h-5 icon-ui" />
                <h3 className="font-semibold">Converts to vision format</h3>
              </div>
              <p className="text-sm text-gray-700">Transforms the tool result into OpenAI vision API format so the LLM can see the image visually.</p>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="heading-2">Quick Start</h2>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import image_result_formatter

def take_screenshot(url: str) -> str:
    """Take a screenshot of a webpage."""
    # Returns base64-encoded PNG
    return capture_screenshot(url)

agent = Agent(
    "vision_assistant",
    tools=[take_screenshot],
    plugins=[image_result_formatter],
    model="gpt-4o"  # Use a vision model
)

agent.input("Take a screenshot of example.com and describe what you see")`}
            result={`[Tool: take_screenshot("example.com")]
🖼️  Formatted 'take_screenshot' result as image
The screenshot shows a simple webpage with the heading "Example Domain"...`}
            language="python"
          />
          <p className="text-gray-700 mt-4 text-sm">
            Want to customize? Run <Link href="/cli" className="text-gray-500 hover:text-gray-700"><code className="bg-gray-100 px-2 py-1 rounded">co copy image_result_formatter</code></Link> to get an editable copy.
          </p>
        </section>

        {/* Without vs With */}
        <section className="mb-12">
          <h2 className="heading-2">Without vs With Plugin</h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Without Plugin</h3>
              <p className="text-sm text-gray-700 mb-2">The LLM receives raw base64 text:</p>
              <code className="text-xs text-gray-700 block bg-gray-100 border border-gray-200 p-2 rounded overflow-x-auto">
                Tool result: "iVBORw0KGgoAAAANSUhEUgAAA..."
              </code>
              <p className="text-sm text-gray-700 mt-2">LLM cannot interpret this as an image!</p>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">With Plugin</h3>
              <p className="text-sm text-gray-700 mb-2">The LLM receives proper image format:</p>
              <code className="text-xs text-gray-700 block bg-gray-100 border border-gray-200 p-2 rounded overflow-x-auto">
                {`{type: "image_url", url: "data:image/png;..."}`}
              </code>
              <p className="text-sm text-gray-700 mt-2">LLM can see and analyze the image!</p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mb-12">
          <h2 className="heading-2">How it works</h2>
          <CodeWithResult
            code={`@after_tools
def _format_image_result(agent):
    trace = agent.current_session['trace'][-1]

    if trace['type'] != 'tool_execution' or trace['status'] != 'success':
        return

    result = trace['result']
    is_image, mime_type, base64_data = _is_base64_image(result)

    if not is_image:
        return

    # Find and modify the tool result message
    messages = agent.current_session['messages']
    for i, msg in enumerate(reversed(messages)):
        if msg['role'] == 'tool' and msg.get('tool_call_id') == trace['call_id']:
            # Shorten tool message (save tokens)
            msg['content'] = "Screenshot captured (image provided below)"

            # Insert user message with actual image
            messages.insert(len(messages) - i, {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Tool returned an image. See below."},
                    {"type": "image_url", "image_url": {"url": f"data:{mime_type};base64,{base64_data}"}}
                ]
            })
            break`}
            language="python"
          />
        </section>

        {/* Supported formats */}
        <section className="mb-12">
          <h2 className="heading-2">Supported Formats</h2>
          <div className="bg-gray-100 rounded-lg p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th scope="col" className="text-left py-2 text-gray-700">Format</th>
                  <th scope="col" className="text-left py-2 text-gray-700">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200/50">
                  <td className="py-2">PNG</td>
                  <td className="py-2 text-gray-700"><code>data:image/png;base64,...</code></td>
                </tr>
                <tr className="border-b border-gray-200/50">
                  <td className="py-2">JPEG</td>
                  <td className="py-2 text-gray-700"><code>data:image/jpeg;base64,...</code></td>
                </tr>
                <tr className="border-b border-gray-200/50">
                  <td className="py-2">WebP</td>
                  <td className="py-2 text-gray-700"><code>data:image/webp;base64,...</code></td>
                </tr>
                <tr className="border-b border-gray-200/50">
                  <td className="py-2">GIF</td>
                  <td className="py-2 text-gray-700"><code>data:image/gif;base64,...</code></td>
                </tr>
                <tr>
                  <td className="py-2">Plain base64</td>
                  <td className="py-2 text-gray-700">Long base64 strings (defaults to PNG)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-12">
          <h2 className="heading-2">Use Cases</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <HiOutlineCamera className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <span><strong>Screenshots:</strong> Browser automation tools that capture pages</span>
            </li>
            <li className="flex items-start gap-2">
              <HiOutlineCamera className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <span><strong>Image generation:</strong> Tools that create images (charts, diagrams)</span>
            </li>
            <li className="flex items-start gap-2">
              <HiOutlineCamera className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <span><strong>Visual analysis:</strong> Any tool returning visual data for LLM interpretation</span>
            </li>
          </ul>
        </section>

        {/* Events used */}
        <section className="mb-12">
          <h2 className="heading-2">Events Used</h2>
          <div className="bg-gray-100 rounded-lg p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th scope="col" className="text-left py-2 text-gray-700">Event</th>
                  <th scope="col" className="text-left py-2 text-gray-700">Handler</th>
                  <th scope="col" className="text-left py-2 text-gray-700">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2"><code className="text-gray-900">after_tools</code></td>
                  <td className="py-2">_format_image_result</td>
                  <td className="py-2 text-gray-700">Convert base64 to vision format</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-700 mt-4">
            Uses <code>after_tools</code> (not <code>after_each_tool</code>) because message modification must happen after all tools complete.
          </p>
        </section>

        {/* Source */}
        <section className="mb-12">
          <h2 className="heading-2">Source</h2>
          <p className="text-gray-700">
            <code className="bg-gray-100 px-2 py-1 rounded">connectonion/useful_plugins/image_result_formatter.py</code>
          </p>
          <CodeWithResult
            code={`# The plugin is just a list with one event handler
image_result_formatter = [after_tools(_format_image_result)]`}
            language="python"
          />
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
