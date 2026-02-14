# Auto Debug Exception

AI debugger for uncaught exceptions with runtime inspection

## Important Notice

**Debugs ONLY uncaught exceptions**

This feature only works for uncaught exceptions - crashes, raised exceptions, and failed assertions. For logic errors that don't crash, use `raise` or `assert` to convert them to exceptions.

## Quick Start

One line to enable. Automatic AI analysis on crashes.

```python
from connectonion import auto_debug_exception

# Enable AI debugging for exceptions
auto_debug_exception()

# Your code - any uncaught exception triggers AI analysis
data = {"users": []}
average = sum(u["age"] for u in data["users"]) / len(data["users"])  # Crashes!
```

### When this crashes, the AI will:

1. Show the normal Python traceback first
2. Execute code in the crashed context to understand what happened
3. Test potential fixes with your actual data
4. Provide a working solution you can copy-paste

## What Makes This Special

### Live Runtime Access

The AI isn't just reading your code - it has access to the actual runtime state when the crash occurred. It can execute any Python expression using your variables and see the real values that caused the problem.

### Verified Solutions

Every fix is tested with your actual data before being suggested. No more "this might work" - only proven solutions that actually work with your data.

### Precise Analysis

The AI can explore your data structures, check types, validate assumptions, and trace variables through the call stack to find the root cause.

## Runtime Inspection Tools

The AI has access to powerful tools for investigating the crashed state:

### execute_in_frame(code)

Run any Python code in the exception context. Check variables, test expressions, explore the state.

### inspect_object(name)

Deep dive into any object - see its type, attributes, methods, and values.

### test_fix(original, fixed)

Test a potential fix using the actual runtime data before suggesting it to you.

### validate_assumption(hypothesis)

Test hypotheses about what caused the crash by running code in the crashed context.

### trace_variable(var_name)

See how a variable's value changed through the call stack leading to the crash.

## Real-World Examples

### 1. Empty Collection Crash

```python
from connectonion import auto_debug_exception
auto_debug_exception()

def calculate_metrics(scores):
    return {
        'average': sum(scores) / len(scores),  # Crashes if empty!
        'maximum': max(scores),
        'minimum': min(scores)
    }

result = calculate_metrics([])  # 💥 Multiple issues!
```

**AI Runtime Debug Analysis:**

**What I found:**
- Executed: `len(scores) → 0`
- Executed: `sum(scores) → 0`
- The division 0/0 causes ZeroDivisionError
- Also tested: `max([])` raises ValueError

**Why it failed:** Empty list causes division by zero and max()/min() to fail

**Verified fix (tested with your data):**
```python
def calculate_metrics(scores):
    if not scores:
        return {
            'average': 0,
            'maximum': None,
            'minimum': None
        }
    return {
        'average': sum(scores) / len(scores),
        'maximum': max(scores),
        'minimum': min(scores)
    }
```

### 2. Nested Dictionary Access

```python
from connectonion import auto_debug_exception
auto_debug_exception()

# API response with unexpected structure
response = {
    'data': {
        'user': {
            'profile': {'name': 'Alice'}
            # Missing 'settings' key!
        }
    }
}

# Try to access nested key
theme = response['data']['user']['settings']['theme']  # 💥 KeyError!
```

**AI Runtime Debug Analysis:**

**What I found:**
- Executed: `response['data']['user'].keys() → ['profile']`
- Missing key: 'settings' not in user dict
- Available: only 'profile' exists

**Verified fix:**
```python
# Use .get() with default value
theme = response.get('data', {}).get('user', {}).get('settings', {}).get('theme', 'light')

# Or check existence first
if 'settings' in response['data']['user']:
    theme = response['data']['user']['settings']['theme']
else:
    theme = 'light'  # Default
```

### 3. Debugging Logic Errors with Assert

For logic errors that don't crash, use `assert` to trigger AI debugging:

```python
from connectonion import auto_debug_exception, Agent
auto_debug_exception()

# Create a sentiment analyzer
agent = Agent("sentiment", system_prompt="Analyze sentiment. Return ONLY 'positive', 'negative', or 'neutral'.")

text = "This product is terrible!"
result = agent.input(text)

# Validate output with assertion
valid_sentiments = ["positive", "negative", "neutral"]
actual = result.strip().lower()

assert actual in valid_sentiments, f"Invalid sentiment: '{actual}'"
assert actual == "negative", f"Wrong sentiment for '{text}': got '{actual}'"  # 💥 Triggers if wrong!
```

**Pro Tip:** Use `assert` statements to catch logic errors and wrong AI outputs. When an assertion fails, auto_debug_exception kicks in with full runtime access to help you understand what went wrong.

## What It Debugs

### Debugs These

✓ Crashes: KeyError, TypeError, ZeroDivisionError, etc.  
✓ Raised exceptions: `raise ValueError("invalid")`  
✓ Failed assertions: `assert x > 0, "must be positive"`  
✓ Any uncaught exception that reaches sys.excepthook

### Doesn't Debug These

✗ Logic errors that don't raise exceptions  
✗ Wrong outputs (unless you assert they're correct)  
✗ Performance issues (slow code that runs fine)  
✗ Infinite loops (code that never raises an exception)

**Solution:** To debug logic errors, convert them to exceptions using `raise` or `assert`. This triggers auto_debug_exception and gives you AI analysis with runtime inspection.

## Configuration

### Choose AI Model

```python
# Default: o4-mini (fast and cheap)
auto_debug_exception()

# Use a more powerful model
auto_debug_exception(model="co/gpt-4o")

# Use Claude for complex analysis
auto_debug_exception(model="co/claude-sonnet-4")
```

### Disable Temporarily

Set environment variable to disable:

```bash
# In your .env file
CONNECTONION_AUTO_DEBUG=false

# Or in terminal
export CONNECTONION_AUTO_DEBUG=false
```

## Philosophy

**No more guessing. Get verified solutions.**

Traditional debugging tools show you *what* crashed. We show you *why* it crashed and *how* to fix it - tested with your actual data.

The AI has live access to your program's runtime state. It can execute code, inspect objects, and test fixes before suggesting them. Every solution is verified to work with your data.

**From crash to solution in seconds.**

