'use client'

import { useState } from 'react'
import { HiOutlineClipboard, HiOutlineCheck, HiOutlineCommandLine, HiOutlineArrowRight, HiOutlineClock, HiOutlineBolt, HiOutlinePlay, HiOutlineEye } from 'react-icons/hi2'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia as monokai } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Link from 'next/link'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'

export default function XrayTracePage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const examples = {
    simple: {
      title: '1. Simple Single Tool',
      description: 'Minimal example with one tool call',
      code: `from connectonion import Agent, xray

@xray
def greet(name: str) -> str:
    """Simple greeting function."""
    return f"Hello, {name}!"

# Create agent
agent = Agent("greeter", tools=[greet])
result = agent.input("Say hello to Alice")

# View execution trace
xray.trace(agent)`,
      output: `Task: "Say hello to Alice"

[1] • 12ms  greet(name="Alice")
      IN  → name: "Alice"
      OUT ← "Hello, Alice!"

Total: 12ms • 1 step • 1 iteration`
    },
    basic: {
      title: '2. Multiple Tool Chain',
      description: 'Agent uses multiple tools in sequence',
      code: `from connectonion import Agent, xray

@xray
def analyze_text(text: str) -> dict:
    """Analyze text and return metrics."""
    return {
        'word_count': len(text.split()),
        'char_count': len(text),
        'sentiment': 'neutral'
    }

@xray
def generate_summary(text: str, max_words: int = 10) -> str:
    """Generate a summary of the text."""
    words = text.split()[:max_words]
    return f"Summary: {' '.join(words)}..."

# Create and run agent
agent = Agent(
    name="text_processor",
    tools=[analyze_text, generate_summary]
)

result = agent.input("Analyze this sample text and create a summary")

# View the execution trace
xray.trace(agent)`,
      output: `Task: "Analyze this sample text and create a summary"

[1] • 45ms  analyze_text(text="Analyze this sample text and create a summary")
      IN  → text: "Analyze this sample text and create a summary"
      OUT ← {'word_count': 11, 'char_count': 51, 'sentiment': 'neutral'}

[2] • 23ms  generate_summary(text="Analyze this sample text and create a summary", max_words=10)
      IN  → text: "Analyze this sample text and create a summary"
      IN  → max_words: 10
      OUT ← "Summary: Analyze this sample text and create..."

Total: 68ms • 2 steps • 1 iteration`
    },
    error: {
      title: '3. Error Handling & Recovery',
      description: 'How trace displays errors and agent recovery',
      code: `from connectonion import Agent, xray

@xray
def validate_email(email: str) -> dict:
    """Validate email format."""
    if '@' not in email:
        raise ValueError("Invalid email: missing @ symbol")
    parts = email.split('@')
    if len(parts) != 2 or not parts[0] or not parts[1]:
        raise ValueError("Invalid email format")
    return {"email": email, "valid": True}

@xray
def send_notification(email_data: dict) -> str:
    """Send notification to validated email."""
    if not email_data.get("valid"):
        return "❌ Cannot send to invalid email"
    return f"✅ Notification sent to {email_data['email']}"

@xray
def fallback_contact(message: str) -> str:
    """Fallback contact method when email fails."""
    return f"📞 Fallback: {message} (via phone/SMS)"

# Create agent
agent = Agent(
    name="notification_agent",
    tools=[validate_email, send_notification, fallback_contact]
)

result = agent.input("Send notification to user at bad-email-format")

# View trace showing error handling
xray.trace(agent)`,
      output: `Task: "Send notification to user at bad-email-format"

[1] • ERROR validate_email(email="bad-email-format")
      IN  → email: "bad-email-format"
      ERR ✗ ValueError: Invalid email: missing @ symbol

[2] • 18ms  fallback_contact(message="Send notification to user at bad-email-format")
      IN  → message: "Send notification to user at bad-email-format"
      OUT ← "📞 Fallback: Send notification to user at bad-email-format (via phone/SMS)"

Total: 18ms • 2 steps • 1 iteration • 1 error`
    },
    performance: {
      title: '4. Performance Bottleneck Analysis',
      description: 'Identify slow operations and optimization opportunities',
      code: `from connectonion import Agent, xray
import time
import random

@xray
def fetch_user_data(user_id: str) -> dict:
    """Fast database lookup."""
    time.sleep(0.05)  # 50ms DB query
    return {"user_id": user_id, "name": "John Doe", "tier": "premium"}

@xray
def complex_calculation(data: dict) -> dict:
    """CPU intensive calculation."""
    time.sleep(1.2)  # 1.2s processing
    score = random.randint(750, 850)
    return {"score": score, "calculation_time": "1.2s", "tier": data["tier"]}

@xray
def external_api_call(user_data: dict, score_data: dict) -> dict:
    """Slow external API call."""
    time.sleep(0.8)  # 800ms network call
    return {
        "recommendation": f"Premium package for {user_data['name']}",
        "api_response_time": "800ms",
        "confidence": 0.95
    }

@xray
def format_response(user_data: dict, score_data: dict, recommendation: dict) -> str:
    """Fast formatting step."""
    time.sleep(0.01)  # 10ms formatting
    return f"""
    🎯 Analysis Complete:
    User: {user_data['name']} (ID: {user_data['user_id']})
    Score: {score_data['score']} ({score_data['tier']} tier)
    Recommendation: {recommendation['recommendation']}
    Confidence: {recommendation['confidence']*100:.0f}%
    """

# Create agent
agent = Agent(
    name="analytics_engine",
    tools=[fetch_user_data, complex_calculation, external_api_call, format_response]
)

result = agent.input("Generate analytics report for user ID 12345")

# Analyze performance bottlenecks
xray.trace(agent)`,
      output: `Task: "Generate analytics report for user ID 12345"

[1] • 52ms   fetch_user_data(user_id="12345")
      IN  → user_id: "12345"
      OUT ← {"user_id": "12345", "name": "John Doe", "tier": "premium"}

[2] • 1.2s   complex_calculation(data={...}) ⚠️ SLOW
      IN  → data: {"user_id": "12345", "name": "John Doe", "tier": "premium"}
      OUT ← {"score": 823, "calculation_time": "1.2s", "tier": "premium"}

[3] • 803ms  external_api_call(user_data={...}, score_data={...}) ⚠️ SLOW
      IN  → user_data: {"user_id": "12345", "name": "John Doe", "tier": "premium"}
      IN  → score_data: {"score": 823, "calculation_time": "1.2s", "tier": "premium"}
      OUT ← {"recommendation": "Premium package for John Doe", "api_response_time": "800ms", "confidence": 0.95}

[4] • 11ms   format_response(user_data={...}, score_data={...}, recommendation={...})
      IN  → user_data: {"user_id": "12345", "name": "John Doe", "tier": "premium"}
      IN  → score_data: {"score": 823, "calculation_time": "1.2s", "tier": "premium"}
      IN  → recommendation: {"recommendation": "Premium package for John Doe", ... (2 more)}
      OUT ← "🎯 Analysis Complete:\\nUser: John Doe (ID: 12345)\\nScore: 823 (premium tier)..."

Total: 2.07s • 4 steps • 1 iteration

⚠️  Performance Issues Detected:
    • Step 2: complex_calculation (1.2s) - Consider caching or async processing
    • Step 3: external_api_call (803ms) - Implement timeout/retry logic`
    },
    ide: {
      title: '5. IDE Breakpoint Debugging',
      description: 'Advanced debugging with IDE breakpoints and live context inspection',
      code: `from connectonion import Agent, xray

@xray
def process_order(order_data: dict) -> dict:
    """Process customer order with validation."""
    # 🔴 SET BREAKPOINT HERE - Debug order validation
    # In IDE debugger console:
    # >>> xray.trace()  # See current execution state
    # >>> xray.agent.name  # Current agent name
    # >>> xray.task  # Original user request
    # >>> order_data  # Inspect current parameters
    
    if not order_data.get("items"):
        return {"error": "No items in order", "status": "failed"}
    
    # Calculate totals
    total = sum(item.get("price", 0) * item.get("qty", 1) 
                for item in order_data["items"])
    
    # 🔴 BREAKPOINT OPPORTUNITY - Check calculations
    # >>> xray.trace()  # Updated trace
    # >>> total  # Inspect calculated total
    
    return {
        "order_id": f"ORD-\{hash(str(order_data)) % 10000:04d}",
        "total": total,
        "status": "validated",
        "items_count": len(order_data["items"])
    }

@xray
def apply_discounts(validated_order: dict) -> dict:
    """Apply business rules and discounts."""
    # 🔴 BREAKPOINT - Discount logic debugging
    # >>> xray.trace()  # See previous tool results
    # >>> validated_order  # Inspect order from previous step
    
    if validated_order.get("error"):
        return validated_order  # Pass through errors
    
    total = validated_order["total"]
    discount = 0
    
    # Business rules
    if total > 100:
        discount = total * 0.1  # 10% discount for orders > $100
    if validated_order["items_count"] >= 5:
        discount = max(discount, total * 0.15)  # 15% for bulk orders
    
    # 🔴 BREAKPOINT - Final calculations
    # >>> discount  # Check discount amount
    # >>> xray.trace()  # See full execution flow
    
    final_total = total - discount
    
    return {
        **validated_order,
        "original_total": total,
        "discount": discount,
        "final_total": final_total,
        "discount_percent": (discount / total * 100) if total > 0 else 0
    }

@xray
def generate_invoice(order: dict) -> str:
    """Generate final invoice."""
    # 🔴 FINAL BREAKPOINT - Invoice generation
    # >>> xray.trace()  # Complete execution trace
    # >>> order  # Final order data
    
    if order.get("error"):
        return f"❌ Order failed: \{order['error']}"
    
    return f"""
    🧾 INVOICE #\{order['order_id']}
    ═══════════════════════════
    Items: \{order['items_count']}
    Subtotal: $\{order['original_total']:.2f}
    Discount (\{order['discount_percent']:.1f}%): -$\{order['discount']:.2f}
    ───────────────────────────
    TOTAL: $\{order['final_total']:.2f}
    """

# Create agent for step-by-step debugging
agent = Agent(
    name="order_processor",
    tools=[process_order, apply_discounts, generate_invoice]
)

# Complex order to debug
order_data = {
    "customer": "Alice Smith",
    "items": [
        {"name": "Laptop", "price": 899.99, "qty": 1},
        {"name": "Mouse", "price": 29.99, "qty": 2},
        {"name": "Keyboard", "price": 79.99, "qty": 1},
        {"name": "Monitor", "price": 299.99, "qty": 2},
        {"name": "Cables", "price": 15.99, "qty": 3}
    ]
}

# Run with IDE breakpoints set at marked locations
result = agent.input(f"Process this order: \{order_data}")

# Final comprehensive trace
xray.trace(agent)`,
      output: `💻 IDE Debugging Session - Order Processing:

🔴 Breakpoint 1: process_order() - Line 8
   >>> xray.trace()
   Task: "Process this order: {'customer': 'Alice Smith', 'items': [...]}"
   
   [Starting] • process_order(order_data={...})
         IN  → order_data: {"customer": "Alice Smith", "items": [...] (5 items)}
         Context: agent='order_processor', iteration=1
         Variables: order_data={'customer': 'Alice Smith', 'items': [5 items]}

🔴 Breakpoint 2: process_order() - Line 20
   >>> total
   1385.93
   >>> xray.trace()
   [1] • process_order(order_data={...}) [IN PROGRESS]
         IN  → order_data: {"customer": "Alice Smith", "items": [...] (5 items)}
         Progress: Calculated total=1385.93, processing...

🔴 Breakpoint 3: apply_discounts() - Line 35
   >>> validated_order
   {'order_id': 'ORD-3847', 'total': 1385.93, 'status': 'validated', 'items_count': 5}
   >>> xray.trace()
   [1] ✓ 156ms process_order(order_data={...})
         IN  → order_data: {"customer": "Alice Smith", "items": [...] (5 items)}
         OUT ← {"order_id": "ORD-3847", "total": 1385.93, "status": "validated", "items_count": 5}
   
   [2] • apply_discounts(validated_order={...}) [IN PROGRESS]
         IN  → validated_order: {"order_id": "ORD-3847", "total": 1385.93, ... (3 more)}

🔴 Breakpoint 4: apply_discounts() - Line 47  
   >>> discount
   207.89
   >>> xray.trace()
   [1] ✓ 156ms process_order(order_data={...})
         OUT ← {"order_id": "ORD-3847", "total": 1385.93, "status": "validated", "items_count": 5}
   
   [2] • apply_discounts(validated_order={...}) [IN PROGRESS]
         Progress: Applied 15% bulk discount (5+ items), discount=207.89

🔴 Breakpoint 5: generate_invoice() - Line 60
   >>> order
   {'order_id': 'ORD-3847', 'original_total': 1385.93, 'discount': 207.89, 'final_total': 1178.04, 'discount_percent': 15.0}
   >>> xray.trace()
   [1] ✓ 156ms process_order(order_data={...})
         OUT ← {"order_id": "ORD-3847", "total": 1385.93, "status": "validated", "items_count": 5}
   
   [2] ✓ 89ms  apply_discounts(validated_order={...})
         OUT ← {"order_id": "ORD-3847", "original_total": 1385.93, "discount": 207.89, "final_total": 1178.04, "discount_percent": 15.0, ... (4 more)}
   
   [3] • generate_invoice(order={...}) [IN PROGRESS]
         IN  → order: {"order_id": "ORD-3847", "original_total": 1385.93, ... (6 more)}

🎯 Final Complete Trace:
   [1] ✓ 156ms process_order(order_data={...})
         IN  → order_data: {"customer": "Alice Smith", "items": [...] (5 items)}
         OUT ← {"order_id": "ORD-3847", "total": 1385.93, "status": "validated", "items_count": 5}
   
   [2] ✓ 89ms  apply_discounts(validated_order={...})
         IN  → validated_order: {"order_id": "ORD-3847", "total": 1385.93, ... (3 more)}
         OUT ← {"order_id": "ORD-3847", "original_total": 1385.93, "discount": 207.89, "final_total": 1178.04, ... (6 more)}
   
   [3] ✓ 23ms  generate_invoice(order={...})
         IN  → order: {"order_id": "ORD-3847", "original_total": 1385.93, "discount": 207.89, ... (6 more)}
         OUT ← "🧾 INVOICE #ORD-3847\\n═══════════════════════════\\nItems: 5\\nSubtotal: $1385.93..."

   Total: 268ms • 3 steps • 1 iteration

🧠 Debugging Insights:
   • Order validation: 5 items totaling $1385.93
   • Discount logic: 15% bulk discount applied (items >= 5)
   • Final total: $1178.04 (saved $207.89)
   • Use breakpoints to inspect variables at each step
   • xray.trace() shows live execution state during debugging`
    }
  }

  const markdownContent = `# xray.trace() Guide

Visual execution tracing for ConnectOnion agents. See exactly what happened during agent execution with timing, inputs, outputs, and errors.

## Overview

\`xray.trace()\` displays a visual trace of tool execution flow showing:
- Complete sequence of tool calls with timing
- Input parameters and return values
- Error tracking and failure details
- Performance insights and bottlenecks
- IDE breakpoint debugging integration

## 5 Progressive Examples

Learn through practical examples that increase in complexity:

### 1. Simple Single Tool
Basic one-step execution with minimal complexity

### 2. Multiple Tool Chain  
Agent uses multiple tools in sequence to complete tasks

### 3. Error Handling & Recovery
How trace displays errors and agent recovery strategies

### 4. Performance Bottleneck Analysis
Identify slow operations and optimization opportunities with timing warnings

### 5. IDE Breakpoint Debugging
Advanced debugging with live context inspection using IDE breakpoints

## Installation

\`\`\`bash
pip install connectonion
\`\`\`

## Basic Usage

\`\`\`python
from connectonion import Agent, xray

# Create agent with @xray decorated tools
@xray
def my_tool(data: str) -> str:
    return f"Processed: {data}"

agent = Agent("my_agent", tools=[my_tool])
result = agent.input("Process this")

# View execution trace
xray.trace(agent)
\`\`\`

## Key Features

### Visual Format
- \`•\` - Successful execution
- \`ERROR\` - Failed execution  
- \`IN →\` - Input parameters
- \`OUT ←\` - Return values
- \`ERR ✗\` - Error messages

### Smart Truncation
- Long strings automatically abbreviated
- Large objects shown with size info
- DataFrames show dimensions
- Images display format and size

### Performance Timing
- Sub-millisecond precision for fast ops
- Clear timing for each tool call
- Total execution time summary

## Advanced Features

### Error Tracking
Failed tool calls are clearly marked with error details and stack traces.

### Data Type Handling
Special formatting for:
- Large dictionaries and lists
- DataFrames (pandas)
- Images and binary data
- Long text content

### Multi-Step Analysis
Perfect for understanding complex agent workflows with multiple tool calls and iterations.

## Best Practices

1. **Development**: Use @xray decorator during development
2. **Production**: Remove @xray decorators for optimal performance
3. **Debugging**: Combine with other xray features for complete visibility
4. **Performance**: Use trace() to identify slow operations

## Integration

Works seamlessly with:
- ConnectOnion logging system
- Other @xray context features
- Agent activity tracking
- Multi-agent debugging

## Troubleshooting

**"No tool execution history available"**
- Ensure tools have @xray decorator
- Check agent.input() was called before trace()
- Pass agent instance to trace()

**Timing shows 0ms**  
- Very fast operations may show 0.00ms
- This is normal for simple operations
- Check total time for aggregate performance
`

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
      {/* Header with Copy Button */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-8">
        <div className="flex-1">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700 mb-4 overflow-x-auto">
            <Link href="/" className="hover:text-gray-900 transition-colors whitespace-nowrap">Home</Link>
            <HiOutlineArrowRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <Link href="/xray" className="hover:text-gray-900 transition-colors whitespace-nowrap">@xray</Link>
            <HiOutlineArrowRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="text-gray-900 whitespace-nowrap">trace()</span>
          </nav>

          <h1 className="heading-1">
            <HiOutlineEye className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500 flex-shrink-0" />
            <span>xray.trace()</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl">
            Visual execution tracing for ConnectOnion agents. See exactly what happened during agent execution with timing, inputs, outputs, and errors.
          </p>
        </div>
        
        <CopyMarkdownButton 
          content={markdownContent}
          filename="xray-trace-guide.md"
          className="lg:ml-8 flex-shrink-0 self-start"
        />
      </div>

      {/* Key Features */}
      <section className="mb-12 sm:mb-16">
        <h2 className="h2text-xl sm:"heading-2>Key Features</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: HiOutlineCommandLine, title: 'Visual Flow', desc: 'See all tool calls in sequence', color: 'text-gray-500' },
            { icon: HiOutlineClock, title: 'Performance', desc: 'Execution timing for each step', color: 'text-gray-500' },
            { icon: HiOutlineEye, title: 'Smart Display', desc: 'Intelligent data truncation', color: 'text-gray-500' },
            { icon: HiOutlineBolt, title: 'Error Tracking', desc: 'Clear error display and details', color: 'text-gray-500' }
          ].map((feature, i) => {
            const IconComponent = feature.icon
            return (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition-colors">
                <IconComponent className={`w-8 h-8 ${feature.color} mx-auto mb-4`} />
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-700 text-sm">{feature.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Progressive Examples */}
      <section className="mb-12 sm:mb-16">
        <h2 className="h2text-xl sm:"heading-2>Progressive Examples</h2>
        <p className="text-gray-700 mb-8">
          Learn xray.trace() from simple to advanced with these progressive examples. Each builds on the previous concepts.
        </p>
        
        <div className="space-y-12">
          {Object.entries(examples).map(([id, example], index) => (
            <div key={id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-6 lg:p-8">
              {/* Example Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-r from-gray-500 to-gray-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    {index + 1}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">{example.title}</h3>
                    <p className="text-gray-700 text-xs sm:text-sm">{example.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(example.code, id)}
                  className="text-gray-700 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100 flex items-center gap-2 self-start sm:self-auto"
                >
                  {copiedId === id ? (
                    <>
                      <HiOutlineCheck className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 text-sm hidden sm:inline">Copied!</span>
                    </>
                  ) : (
                    <>
                      <HiOutlineClipboard className="w-4 h-4" />
                      <span className="text-sm hidden sm:inline">Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {/* Code Panel */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-700 bg-gray-800">
                    <HiOutlinePlay className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-300">Python Code</span>
                  </div>
                  
                  <div className="overflow-x-auto max-h-[400px] sm:max-h-[500px] lg:max-h-[600px]">
                    <SyntaxHighlighter 
                      language="python" 
                      style={monokai}
                      customStyle={{
                        background: 'transparent',
                        padding: '1rem',
                        margin: 0,
                        fontSize: '0.75rem',
                        lineHeight: '1.4',
                        overflowX: 'auto'
                      }}
                      wrapLongLines={false}
                      showLineNumbers={true}
                      lineNumberStyle={{ 
                        color: '#6b7280', 
                        paddingRight: '1rem',
                        userSelect: 'none',
                        fontSize: '0.75rem'
                      }}
                    >
                      {example.code}
                    </SyntaxHighlighter>
                  </div>
                </div>

                {/* Output Panel */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-700 bg-gray-800">
                    <HiOutlineCommandLine className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-300">Trace Output</span>
                  </div>
                  
                  <div className="p-2 sm:p-4">
                    <div className="bg-black/70 rounded-lg p-2 sm:p-4 font-mono text-[0.65rem] sm:text-xs overflow-x-auto max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] border border-gray-600">
                      <div 
                        className="whitespace-pre leading-relaxed overflow-x-auto"
                        dangerouslySetInnerHTML={{
                          __html: example.output
                            .replace(/💡|🔸|🎯|⚡|✓|•|ERROR|→|←|✗/g, '<span class="text-yellow-300">$&</span>')
                            .replace(/Task:/g, '<span class="text-blue-400 font-semibold">Task:</span>')
                            .replace(/\[(\d+)\]/g, '<span class="text-cyan-400">[$1]</span>')
                            .replace(/IN\s*→/g, '<span class="text-blue-400">IN  →</span>')
                            .replace(/OUT\s*←/g, '<span class="text-green-400">OUT ←</span>')
                            .replace(/ERR\s*✗/g, '<span class="text-red-400">ERR ✗</span>')
                            .replace(/(\d+(?:\.\d+)?)(ms|s)/g, '<span class="text-cyan-300">$1$2</span>')
                            .replace(/Total:/g, '<span class="text-gray-500 font-semibold">Total:</span>')
                            .replace(/Context:/g, '<span class="text-yellow-400">Context:</span>')
                            .replace(/\[Starting\]/g, '<span class="text-orange-400">[Starting]</span>')
                            .replace(/Pro tip:/g, '<span class="text-green-300 font-semibold">💡 Pro tip:</span>')
                            .replace(/IDE Debugging Session:/g, '<span class="text-gray-400 font-bold text-base">💡 IDE Debugging Session:</span>')
                            .replace(/Breakpoint at/g, '<span class="text-orange-300">🔸 Breakpoint at</span>')
                            .replace(/Final trace/g, '<span class="text-green-300">🎯 Final trace</span>')
                            .replace(/⚠️\s+SLOW/g, '<span class="text-yellow-400 font-semibold">⚠️ SLOW</span>')
                            .replace(/Performance Issues Detected:/g, '<span class="text-red-400 font-semibold">⚠️ Performance Issues Detected:</span>')
                            .replace(/Debugging Insights:/g, '<span class="text-blue-400 font-semibold">🧠 Debugging Insights:</span>')
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Indicator */}
              {index < Object.entries(examples).length - 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex items-center gap-2 text-gray-500">
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <HiOutlineArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Visual Format Reference */}
      <section className="mb-12 sm:mb-16">
        <h2 className="h2text-xl sm:"heading-2>Visual Format Reference</h2>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Status Indicators</h4>
              <div className="space-y-2 font-mono text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">•</span>
                  <span className="text-gray-700">Successful execution</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400">ERROR</span>
                  <span className="text-gray-700">Failed execution</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">...</span>
                  <span className="text-gray-700">Pending/in-progress</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Data Flow</h4>
              <div className="space-y-2 font-mono text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">IN  →</span>
                  <span className="text-gray-700">Input parameters</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">OUT ←</span>
                  <span className="text-gray-700">Return values</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400">ERR ✗</span>
                  <span className="text-gray-700">Error messages</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Timing Display</h4>
              <div className="space-y-2 font-mono text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">0.03ms</span>
                  <span className="text-gray-700">Sub-millisecond</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">45ms</span>
                  <span className="text-gray-700">Typical operations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">2.3s</span>
                  <span className="text-gray-700">Longer operations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className="flex justify-between items-center pt-8 border-t border-gray-200">
        <Link 
          href="/xray" 
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <HiOutlineArrowRight className="w-4 h-4 rotate-180" />
          @xray Overview
        </Link>
        <Link 
          href="/examples" 
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          Complete Examples
          <HiOutlineArrowRight className="w-4 h-4" />
        </Link>
      </nav>
    </div>
  )
}
