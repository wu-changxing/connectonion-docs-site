# Agent Building Examples

Master ConnectOnion through practical examples, from simple fundamentals to advanced automation.

## Progressive Learning Path

1.  **Calculator Agent**: Learn the basics (Function tools, Input validation, Error handling)
2.  **Browser Automation**: Advanced automation (Browser control, Screenshots, Web scraping)

## Available Examples

### Calculator Agent
Learn the fundamentals with a simple math calculator that demonstrates tool creation, input validation, and error handling.

*   **Difficulty**: Beginner
*   **Concepts**: Function tools, Input validation, Error handling, Safe evaluation

```python
def calculate(expression: str) -> str:
    # Validate input safety
    allowed = set('0123456789+-*/()., ')
    if not all(c in allowed for c in expression):
        return "Error: Invalid characters"
    
    try:
        result = eval(expression)
        return str(result)
    except:
        return "Error: Invalid expression"
```

### Browser Automation
Control web browsers with natural language using Playwright integration for screenshots, scraping, and automation.

*   **Difficulty**: Intermediate
*   **Concepts**: Browser control, Screenshots, Web scraping, Natural language commands

```python
# Control browser with natural language
agent.input("Navigate to example.com")
agent.input("Take a screenshot")
agent.input("Extract all links from the page")
agent.input("Fill search box with 'AI' and submit")
```
