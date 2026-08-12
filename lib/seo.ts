const BASE_URL = 'https://docs.connectonion.com'
const SITE_NAME = 'ConnectOnion Docs'
const OG_IMAGE = `${BASE_URL}/onion-logo.png`

export type PageSEO = {
  title: string
  description: string
  path: string
  section?: string
}

// SEO metadata for every page. Used by per-route layout.tsx files.
export const pageSEO: Record<string, PageSEO> = {
  '/': {
    title: 'ConnectOnion - Python AI Agent Framework | Build Agents with Functions',
    description: 'ConnectOnion is an open-source Python framework for building AI agents. Create production-ready agents in 2 lines of code using plain Python functions as tools. Supports OpenAI, Anthropic, and Gemini.',
    path: '/',
    section: 'Home',
  },
  '/quickstart': {
    title: 'Quick Start - Build Your First AI Agent in 60 Seconds | ConnectOnion',
    description: 'Install ConnectOnion and build a working AI agent in under 60 seconds. Step-by-step guide: pip install, write a function, create an agent. No boilerplate needed.',
    path: '/quickstart',
    section: 'Getting Started',
  },
  '/agent': {
    title: 'Agent Class API Reference | ConnectOnion Documentation',
    description: 'Complete API reference for the ConnectOnion Agent class. Constructor parameters, methods like input() and serve(), event hooks, tool execution loop, and configuration options.',
    path: '/agent',
    section: 'Core Concepts',
  },
  '/tools': {
    title: 'Tools - Turn Python Functions into Agent Tools | ConnectOnion',
    description: 'Learn how ConnectOnion automatically converts Python functions into AI agent tools using type hints and docstrings. No decorators or wrappers needed.',
    path: '/tools',
    section: 'Core Concepts',
  },
  '/models': {
    title: 'Supported AI Models - OpenAI, Anthropic, Gemini | ConnectOnion',
    description: 'ConnectOnion supports GPT-4o, Claude, Gemini, and more. Use managed keys with co/ prefix for zero-config setup, or bring your own API keys.',
    path: '/models',
    section: 'Core Concepts',
  },
  '/models/pricing': {
    title: 'Model Pricing & Credits | ConnectOnion',
    description: 'Token costs and credit pricing for ConnectOnion managed models. Free $5 credits included. Compare costs across GPT-4o, Claude, and Gemini models.',
    path: '/models/pricing',
    section: 'Core Concepts',
  },
  '/prompts': {
    title: 'System Prompts - Define Agent Personality | ConnectOnion',
    description: 'Configure AI agent behavior with system prompts in ConnectOnion. Pass prompts as strings, files, or Path objects. Includes prompt engineering best practices.',
    path: '/prompts',
    section: 'Core Concepts',
  },
  '/llm_do': {
    title: 'llm_do() - One-Shot LLM Calls Without Agents | ConnectOnion',
    description: 'Use llm_do() for quick one-shot LLM calls without creating a full agent. Extract data, classify text, or generate content in a single function call.',
    path: '/llm_do',
    section: 'Core Concepts',
  },
  '/on_events': {
    title: 'Event System - 12 Lifecycle Hooks | ConnectOnion',
    description: 'Hook into any point of agent execution with ConnectOnion event system. 12 hooks including before_llm, after_tools, after_each_tool for logging, validation, and control flow.',
    path: '/on_events',
    section: 'Core Concepts',
  },
  '/plugin': {
    title: 'Plugin System - Reusable Agent Behaviors | ConnectOnion',
    description: 'Bundle event handlers into reusable plugins. ConnectOnion plugins are dictionaries of hook functions. Compose multiple plugins for complex agent behaviors.',
    path: '/plugin',
    section: 'Core Concepts',
  },
  '/cli': {
    title: 'CLI Reference - co create, co init, co auth | ConnectOnion',
    description: 'Complete CLI reference for the co command. Create agents, initialize projects, authenticate, check status, and run diagnostics from the terminal.',
    path: '/cli',
    section: 'Getting Started',
  },
  '/cli/ai': {
    title: 'co ai - Built-in AI Coding Assistant | ConnectOnion CLI',
    description: 'Use co ai as an AI coding assistant that understands ConnectOnion. Get help writing agents, debugging tools, and configuring plugins directly in your terminal.',
    path: '/cli/ai',
    section: 'Getting Started',
  },
  '/host': {
    title: 'host() - Deploy Agents as Network Services | ConnectOnion',
    description: 'Make your agent remotely accessible with host(). Supports HTTP, WebSocket, and P2P relay. Deploy from your laptop with no cloud infrastructure needed.',
    path: '/host',
    section: 'Network',
  },
  '/connect': {
    title: 'connect() - Call Remote Agents as Tools | ConnectOnion',
    description: 'Connect to remote agents and use them as tools in your agent. Build multi-agent networks where agents collaborate across machines.',
    path: '/connect',
    section: 'Network',
  },
  '/deploy': {
    title: 'Deploy Agents to Production - Docker, AWS, GCP | ConnectOnion',
    description: 'Deploy ConnectOnion agents to production. Guides for Docker, AWS, GCP, and other platforms. From laptop deployment to cloud-scale infrastructure.',
    path: '/deploy',
    section: 'Network',
  },
  '/xray': {
    title: '@xray Decorator - Debug Agent Execution | ConnectOnion',
    description: 'Debug AI agents with the @xray decorator. Add breakpoints, inspect tool calls, view LLM prompts, and trace execution flow in real time.',
    path: '/xray',
    section: 'Debug',
  },
  '/auto-debug': {
    title: 'Auto Debug - Interactive Agent Debugging | ConnectOnion',
    description: 'Debug agents interactively with auto_debug(). Set breakpoints, step through tool calls, and inspect agent state during execution.',
    path: '/auto-debug',
    section: 'Debug',
  },
  '/auto-debug-exception': {
    title: 'Auto Debug Exception - AI-Powered Crash Analysis | ConnectOnion',
    description: 'Automatically analyze agent crashes with AI. ConnectOnion reads stack traces and suggests fixes using LLM-powered exception analysis.',
    path: '/auto-debug-exception',
    section: 'Debug',
  },
  '/logging': {
    title: 'Logging - Automatic Activity Logs | ConnectOnion',
    description: 'ConnectOnion automatically logs all agent activity to .co/logs/. View tool calls, LLM responses, and execution history for debugging and auditing.',
    path: '/logging',
    section: 'Debug',
  },
  '/memory': {
    title: 'Memory - Persistent Agent Memory | ConnectOnion',
    description: 'Give agents persistent memory that survives across sessions. Store facts, preferences, and context using the built-in memory tool.',
    path: '/memory',
    section: 'Useful Tools',
  },
  '/web-fetch': {
    title: 'WebFetch - Web Scraping and Content Extraction | ConnectOnion',
    description: 'Scrape web pages and extract content with the WebFetch tool. Supports HTML parsing, content extraction, and structured data retrieval for AI agents.',
    path: '/web-fetch',
    section: 'Useful Tools',
  },
  '/useful-tools': {
    title: 'Built-in Tools Overview | ConnectOnion',
    description: 'Overview of all built-in tools: file operations, shell commands, browser automation, email, memory, and more. Ready to use with any ConnectOnion agent.',
    path: '/useful-tools',
    section: 'Useful Tools',
  },
  '/useful-plugins': {
    title: 'Built-in Plugins Overview | ConnectOnion',
    description: 'Overview of all built-in plugins: ReAct reasoning, evaluation, shell approval, Gmail, calendar, subagents, auto-compact, and more.',
    path: '/useful-plugins',
    section: 'Useful Plugins',
  },
  '/useful-plugins/re-act': {
    title: 'ReAct Plugin - Reasoning + Acting | ConnectOnion',
    description: 'Add ReAct (Reasoning + Acting) to your agent. The re_act plugin makes agents reflect and plan after each tool call for better decision-making.',
    path: '/useful-plugins/re-act',
    section: 'Useful Plugins',
  },
  '/useful-plugins/subagents': {
    title: 'Subagents Plugin - Spawn Child Agents | ConnectOnion',
    description: 'Spawn sub-agents with independent tools and prompts. Break complex tasks into smaller pieces handled by specialized child agents.',
    path: '/useful-plugins/subagents',
    section: 'Useful Plugins',
  },
  '/tui': {
    title: 'TUI Components - Terminal UI Library | ConnectOnion',
    description: 'Build beautiful terminal interfaces with ConnectOnion TUI components. Pick menus, text input, dropdowns, status bars, and more for CLI applications.',
    path: '/tui',
    section: 'TUI',
  },
  '/examples': {
    title: 'Example Agents - Calculator, Browser, and More | ConnectOnion',
    description: 'Browse example AI agents built with ConnectOnion. From simple calculators to browser automation, see how to build real agents with working code.',
    path: '/examples',
    section: 'Examples',
  },
  '/blog': {
    title: 'Blog - Design Decisions & Architecture | ConnectOnion',
    description: 'Read about ConnectOnion design decisions, API naming rationale, network protocol architecture, and framework philosophy.',
    path: '/blog',
    section: 'Blog',
  },
  '/blog/stream-claude-code-tools-to-web': {
    title: 'How co ai Streams Claude Code Tool Calls to the Web',
    description: 'Why ConnectOnion uses Claude Code stream-json to show live Read, Edit, and Bash cards in O Chat without confusing observability with permission authority.',
    path: '/blog/stream-claude-code-tools-to-web',
    section: 'Blog',
  },
  '/blog/alpha-beta-rc-before-lts': {
    title: 'Why Alpha, Beta, and RC Come Before ConnectOnion 1.7 LTS',
    description: 'Why ConnectOnion keeps 1.6 stable while testing ACP and coding-agent features through 1.7.0 alpha, beta, and RC releases before LTS.',
    path: '/blog/alpha-beta-rc-before-lts',
    section: 'Blog',
  },
  '/vibe-coding': {
    title: 'Vibe Coding Guide - Build Agents with AI Tools | ConnectOnion',
    description: 'Use Cursor, Claude Code, or other AI coding tools to build ConnectOnion agents. Drag and drop docs for instant context. AI-first development workflow.',
    path: '/vibe-coding',
    section: 'Getting Started',
  },
  '/features/permissions': {
    title: 'Permissions - Unified Permission System | ConnectOnion',
    description: 'Control what tools and commands your agent can use. ConnectOnion unified permission system with allow/deny lists and approval workflows.',
    path: '/features/permissions',
    section: 'Features',
  },
  '/features/skills': {
    title: 'Skills - Reusable Agent Workflows | ConnectOnion',
    description: 'Package reusable workflows as skills with auto permission scoping. Claude Code compatible. Share skills across agents and teams.',
    path: '/features/skills',
    section: 'Features',
  },
  '/features/trust': {
    title: 'Trust System - Agent Security Presets | ConnectOnion',
    description: 'Configure multi-agent trust with open, careful, and strict presets. Control which remote agents can call tools and access resources.',
    path: '/features/trust',
    section: 'Features',
  },
  '/features/transcribe': {
    title: 'Audio Transcription - Speech to Text | ConnectOnion',
    description: 'Transcribe audio to text using Gemini. Built-in speech-to-text capability for voice-driven AI agents.',
    path: '/features/transcribe',
    section: 'Features',
  },
  '/gmail': {
    title: 'Gmail Integration - OAuth Email for Agents | ConnectOnion',
    description: 'Connect your Gmail account to AI agents. OAuth authentication, label management, email sending and receiving with CRM-like features.',
    path: '/gmail',
    section: 'Integrations',
  },
  '/outlook': {
    title: 'Outlook Integration - Microsoft Email for Agents | ConnectOnion',
    description: 'Connect Microsoft Outlook to AI agents. OAuth authentication for email sending, receiving, and calendar access.',
    path: '/outlook',
    section: 'Integrations',
  },
  '/google-integration': {
    title: 'Google Integration - Gmail & Calendar OAuth | ConnectOnion',
    description: 'Set up Google OAuth for Gmail and Google Calendar integration. Step-by-step guide for credentials, scopes, and token management.',
    path: '/google-integration',
    section: 'Integrations',
  },
  '/microsoft-integration': {
    title: 'Microsoft Integration - Outlook & Calendar OAuth | ConnectOnion',
    description: 'Set up Microsoft OAuth for Outlook and Calendar integration. Azure AD app registration, permissions, and authentication flow.',
    path: '/microsoft-integration',
    section: 'Integrations',
  },
  '/roadmap': {
    title: 'Roadmap - Upcoming Features | ConnectOnion',
    description: 'See what is coming next for ConnectOnion. Planned features, improvements, and community-requested enhancements.',
    path: '/roadmap',
    section: 'Other',
  },
  '/threat-model': {
    title: 'Threat Model - Security for Networked Agents | ConnectOnion',
    description: 'Security considerations for deploying networked AI agents. Threat analysis, mitigation strategies, and best practices for agent security.',
    path: '/threat-model',
    section: 'Network',
  },
  '/session-reconnect': {
    title: 'Session Reconnect - WebSocket Recovery | ConnectOnion',
    description: 'Automatic WebSocket session recovery and reconnection for networked agents. Maintain state across network interruptions.',
    path: '/session-reconnect',
    section: 'Network',
  },
  '/websocket-protocol': {
    title: 'WebSocket Protocol Specification | ConnectOnion',
    description: 'Technical specification for the ConnectOnion WebSocket protocol. Message formats, handshake, authentication, and agent communication.',
    path: '/websocket-protocol',
    section: 'Network',
  },
  '/agent-emails': {
    title: 'Agent Emails - Email Send & Receive Overview | ConnectOnion',
    description: 'Overview of email capabilities for AI agents. SMTP sending and IMAP receiving with built-in tools.',
    path: '/agent-emails',
    section: 'Useful Tools',
  },
  '/agent-emails/send': {
    title: 'Send Email - SMTP Email Tool | ConnectOnion',
    description: 'Send emails from AI agents using SMTP. Configure email credentials and send messages programmatically.',
    path: '/agent-emails/send',
    section: 'Useful Tools',
  },
  '/agent-emails/receive': {
    title: 'Receive Email - IMAP Email Tool | ConnectOnion',
    description: 'Fetch and read emails in AI agents using IMAP. Monitor inboxes and process incoming messages automatically.',
    path: '/agent-emails/receive',
    section: 'Useful Tools',
  },
  '/xray/trace': {
    title: 'trace() - Visualize Agent Execution Flow | ConnectOnion',
    description: 'Visualize the complete execution flow of your AI agent. See tool calls, LLM interactions, and timing in a clear visual trace.',
    path: '/xray/trace',
    section: 'Debug',
  },
  '/prompts/formats': {
    title: 'Prompt Formats - Template Syntax | ConnectOnion',
    description: 'Supported prompt template formats in ConnectOnion. Use variables, conditionals, and dynamic content in your system prompts.',
    path: '/prompts/formats',
    section: 'Core Concepts',
  },
  '/prompts/examples': {
    title: 'Prompt Examples - Agent Personality Templates | ConnectOnion',
    description: 'Ready-to-use system prompt examples: math tutor, code reviewer, data analyst, customer support, and more. Copy and customize for your agents.',
    path: '/prompts/examples',
    section: 'Core Concepts',
  },
}

export function getPageMetadata(path: string) {
  const page = pageSEO[path]
  if (!page) {
    // Fallback for pages without specific SEO config
    const cleanPath = path.replace(/^\//, '').replace(/\//g, ' > ')
    return {
      title: `${cleanPath || 'Docs'} | ConnectOnion Documentation`,
      description: `ConnectOnion documentation for ${cleanPath || 'building AI agents with Python'}. Open-source framework for creating production-ready AI agents.`,
      path,
    }
  }
  return page
}

export function buildMetadata(path: string) {
  const page = getPageMetadata(path)
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `${BASE_URL}${page.path}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${BASE_URL}${page.path}`,
      siteName: SITE_NAME,
      type: 'article' as const,
      locale: 'en_US',
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'ConnectOnion Documentation' }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: page.title,
      description: page.description,
      images: [OG_IMAGE],
      creator: '@connectonion',
    },
  }
}

// JSON-LD for documentation pages (TechArticle schema)
export function buildArticleJsonLd(path: string) {
  const page = getPageMetadata(path)
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: page.title,
    description: page.description,
    url: `${BASE_URL}${page.path}`,
    author: {
      '@type': 'Organization',
      name: 'ConnectOnion',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ConnectOnion',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: OG_IMAGE,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}${page.path}`,
    },
    about: {
      '@type': 'SoftwareApplication',
      name: 'ConnectOnion',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Python 3.9+',
    },
    inLanguage: 'en',
  }
}
