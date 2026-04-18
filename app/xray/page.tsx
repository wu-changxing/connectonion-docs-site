'use client'

import { motion } from 'framer-motion'
import { HiOutlineBolt, HiOutlineArrowRight, HiOutlineChartBar, HiOutlineBugAnt, HiOutlineEye, HiOutlineCodeBracket, HiOutlineCpuChip, HiOutlineChatBubbleOvalLeft, HiOutlineArrowPath, HiOutlineSquare3Stack3D, HiOutlineClock } from 'react-icons/hi2'
import { FaRocket, FaSearch, FaChartBar, FaShieldAlt } from 'react-icons/fa'
import CodeWithResult from '../../components/CodeWithResult'
import { ContentNavigation } from '../../components/ContentNavigation'
import { PageHeader } from '../../components/PageHeader'

export default function XrayPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: '@xray Debugging' }
          ]}
          icon={HiOutlineBugAnt}
          iconColor="icon-ui"
          title="@xray Debugging"
          description="See what your AI agent is thinking. Add one decorator and unlock debugging superpowers."
          markdownPath="/debug/xray.md"
          markdownFilename="xray.md"
        />

        {/* Visual Flow Diagram */}
        <section className="mb-16">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 md:p-8">
            <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6 flex items-center gap-2">
              <HiOutlineCodeBracket className="text-blue-400 w-4 h-4 md:w-5 md:h-5" />
              How @xray works
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center">
                  <HiOutlineCodeBracket className="icon-ui w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="text-gray-700">Your Function</span>
              </div>
              <HiOutlineArrowRight className="text-gray-500 rotate-90 md:rotate-0" />
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center">
                  <HiOutlineBugAnt className="text-gray-500 w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="text-gray-700">@xray decorator</span>
              </div>
              <HiOutlineArrowRight className="text-gray-500 rotate-90 md:rotate-0" />
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 border border-blue-500 rounded-lg flex items-center justify-center">
                  <HiOutlineCpuChip className="text-blue-400 w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="text-gray-700">Agent Context</span>
              </div>
              <HiOutlineArrowRight className="text-gray-500 rotate-90 md:rotate-0" />
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center">
                  <HiOutlineEye className="icon-ui w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="text-gray-700">Full Visibility</span>
              </div>
            </div>
          </div>
        </section>

        {/* Examples Section */}
        <section className="mb-16">
          <h2 className="heading-2">
            <HiOutlineChartBar className="w-6 h-6 text-gray-500" />
            Examples
          </h2>

          <div className="space-y-12">
            {/* Basic Usage */}
            <div>
              <h3 className="heading-3">
                <HiOutlineEye className="w-6 h-6 icon-ui" />
                Basic Usage
              </h3>
              <p className="text-gray-700 mb-6">
                Add the @xray decorator to see inside the agent's mind. Access agent name, task, and iteration count.
              </p>
              <CodeWithResult
                code={`from connectonion import xray

@xray
def my_tool(text: str) -> str:
    """Process some text."""

    # Now you can see inside the agent's mind!
    print(xray.agent.name)    # "my_assistant"
    print(xray.task)          # "Process this document"
    print(xray.iteration)     # 1, 2, 3...

    return f"Processed: {text}"`}
                result={`my_assistant
Process this document
1

Processed: sample data`}
                language="python"
              />
            </div>

            {/* Execution Trace */}
            <div>
              <h3 className="heading-3">
                <HiOutlineClock className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                Execution Trace
              </h3>
              <p className="text-gray-700 mb-6">
                Call xray.trace() to see the complete execution flow of your agent. Perfect for understanding multi-step processes.
              </p>
              <CodeWithResult
                code={`@xray
def analyze_data(text: str) -> str:
    """Analyze data and show execution trace."""

    # Show what happened so far
    xray.trace()

    return "Analysis complete"`}
                result={`Task: "Find Python tutorials and summarize them"

[1] • 89ms • search_database(query="Python tutorials")
    IN  → query: "Python tutorials"
    OUT ← "Found 5 results for Python tutorials"

[2] • 234ms • summarize_text(text="Found 5 results...", max_words=50)
    IN  → text: "Found 5 results..."
          max_words: 50
    OUT ← "5 Python tutorials found covering basics to advanced topics"

Total: 323ms • 2 steps • 1 iteration

Analysis complete`}
                language="python"
              />
            </div>

            {/* IDE Debug */}
            <div>
              <h3 className="heading-3">
                <HiOutlineBugAnt className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />
                IDE Debug
              </h3>
              <p className="text-gray-700 mb-6">
                Set breakpoints in your IDE and inspect the xray context. Access the full agent state including messages and previous tool calls.
              </p>
              <CodeWithResult
                code={`@xray
def analyze_sentiment(text: str) -> str:
    # Set breakpoint on next line
    sentiment = "positive"  # When stopped here in debugger:
                           # >>> xray
                           # <XrayContext active>
                           #   agent: 'my_bot'
                           #   task: 'How do people feel about Python?'

    return sentiment`}
                result={`🔴 Breakpoint hit at line 3

>>> xray
<XrayContext active>
  agent: 'my_bot'
  task: 'How do people feel about Python?'

>>> xray.messages
[{'role': 'user', 'content': 'How do people feel about Python?'}, ...]

>>> xray.previous_tools
['search_web', 'analyze_results']

positive`}
                language="python"
              />
            </div>
          </div>
        </section>

        {/* What You Can Access Section */}
        <section className="mb-16">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-6 h-6 text-gray-500" />
            What You Can Access
          </h2>

          {/* Visual API Map */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold flex items-center justify-center gap-2">
                <HiOutlineCodeBracket className="text-blue-400" />
                xray context object
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <HiOutlineCpuChip className="w-6 h-6 md:w-8 md:h-8 text-blue-400 mx-auto mb-2" />
                <div className="font-mono text-gray-700">xray.agent</div>
                <div className="text-gray-700 text-xs mt-1">Agent Instance</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <HiOutlineChatBubbleOvalLeft className="w-8 h-8 icon-ui mx-auto mb-2" />
                <div className="font-mono text-gray-700">xray.task</div>
                <div className="text-gray-700 text-xs mt-1">User Request</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <HiOutlineClock className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <div className="font-mono text-gray-400">xray.messages</div>
                <div className="text-gray-700 text-xs mt-1">Chat History</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'xray.agent', desc: 'The Agent instance calling this tool', icon: HiOutlineCpuChip, color: 'text-blue-400' },
              { name: 'xray.task', desc: 'Original request from user', icon: HiOutlineChatBubbleOvalLeft, color: 'icon-ui' },
              { name: 'xray.messages', desc: 'Full conversation history', icon: HiOutlineClock, color: 'text-gray-500' },
              { name: 'xray.iteration', desc: 'Which round of tool calls (1-10)', icon: HiOutlineArrowPath, color: 'icon-ui' },
              { name: 'xray.previous_tools', desc: 'Tools called before this one', icon: HiOutlineSquare3Stack3D, color: 'icon-ui' },
              { name: 'xray.trace()', desc: 'Visual execution trace', icon: HiOutlineChartBar, color: 'text-gray-500' }
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.name}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-400 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-gray-100 ${item.color}`}>
                      <IconComponent className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div>
                      <h3 className={`font-mono ${item.color} font-bold mb-2`}>{item.name}</h3>
                      <p className="text-gray-700">{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="mb-16">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-6 h-6 text-gray-500" />
            Practical Use Cases
          </h2>

          <div className="space-y-8">
            {/* Understand Context */}
            <div>
              <h3 className="font-bold text-xl mb-2">Understand Context</h3>
              <p className="text-gray-700 mb-4">See why a tool was called and what led to it</p>
              <CodeWithResult
                code={`@xray
def emergency_shutdown():
    print(f"Shutdown: {xray.task}")
    print(f"After: {xray.previous_tools}")

    if xray.iteration == 1:
        return "Try restarting first"

    return "System shutdown complete"`}
                result={`Shutdown: Server is not responding, please help
After: ['check_server_status', 'restart_service']

System shutdown complete`}
              />
            </div>

            {/* Adaptive Behavior */}
            <div>
              <h3 className="font-bold text-xl mb-2">Adaptive Behavior</h3>
              <p className="text-gray-700 mb-4">Change tool behavior based on execution context</p>
              <CodeWithResult
                code={`@xray
def fetch_data(source: str) -> str:
    # Use cache on repeated calls
    if "fetch_data" in xray.previous_tools:
        return "Using cached data"

    # Fresh fetch on first call
    return f"Fresh data from {source}"`}
                result={`# First call:
Fresh data from database

# Second call (same agent session):
Using cached data`}
              />
            </div>

            {/* Debug Complex Flows */}
            <div>
              <h3 className="font-bold text-xl mb-2">Debug Complex Flows</h3>
              <p className="text-gray-700 mb-4">Get full visibility into multi-step agent processes</p>
              <CodeWithResult
                code={`@xray
def process_order(order_id: str) -> str:
    if xray.agent:
        print(f"Agent: {xray.agent.name}")
        print(f"Request: {xray.task}")
        print(f"Messages: {len(xray.messages)}")

    return f"Order {order_id} processed"`}
                result={`Agent: sales_assistant
Request: Process order ABC123 for customer
Messages: 5

Order ABC123 processed`}
              />
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="mb-16">
          <h2 className="heading-2">Pro Tips</h2>

          <div className="space-y-4">
            {[
              { icon: <FaRocket className="text-blue-400" />, tip: 'Development Only', detail: 'Remove @xray in production for best performance' },
              { icon: <FaSearch className="icon-ui" />, tip: 'Combine with IDE', detail: 'Set breakpoints for interactive debugging' },
              { icon: <FaChartBar className="text-gray-500" />, tip: 'Use trace()', detail: 'Call xray.trace() after runs to see full flow' },
              { icon: <FaShieldAlt className="icon-ui" />, tip: 'Check context', detail: 'Always verify xray.agent exists before using' }
            ].map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 glass-subtle rounded-lg p-4"
              >
                <span className="text-2xl">{tip.icon}</span>
                <div>
                  <h4 className="font-bold text-gray-500">{tip.tip}</h4>
                  <p className="text-gray-700">{tip.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Next Steps */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="heading-2 justify-center">Ready to debug like a pro?</h2>

            <div className="flex flex-wrap justify-center gap-4">
              {['Getting Started', 'Examples', 'API Reference'].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-subtle hover:glass rounded-lg px-6 py-3 flex items-center gap-2 transition-all duration-300"
                >
                  {item}
                  <HiOutlineArrowRight className="w-4 h-4" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
