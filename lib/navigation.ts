/**
 * @purpose Central navigation data structure defining all docs pages, sections, and routing
 * @llm-note
 *   Dependencies: imports from [react-icons/hi2, react-icons/vsc, react-icons/fa]
 *   Imported by: [DocsSidebar.tsx, MobileDocsNav.tsx, ContentNavigation.tsx, Footer.tsx, ClientLayout.tsx, app/quickstart/page.tsx]
 *   Data flow: exports navigation[] array → consumed by sidebar, content nav, and search components
 *   State/Effects: pure data module | no side effects | defines 70+ navigation items with prev/next links
 *   Integration: exposes navigation[], getPageByHref(), getPagesBySection(), getExamplePages()
 *   Structure: each item has {title, href, icon, section, keywords[], prev, next, difficulty?, parent?, hidden?}
 */
import {
  HiOutlineHome, HiOutlineRocketLaunch, HiOutlineCommandLine, HiOutlineChatBubbleBottomCenterText, HiOutlineCodeBracket, HiOutlineChartBar, HiOutlineSparkles, HiOutlineShieldCheck, HiOutlineBugAnt,
  HiOutlineArrowsRightLeft, HiOutlineDocumentText, HiOutlineFolderOpen, HiOutlineCalculator, HiOutlineCloud, HiOutlineBookOpen,
  HiOutlineUsers, HiOutlineCog, HiOutlineSquares2X2, HiOutlineCpuChip, HiOutlineGlobeAlt, HiOutlineCamera, HiOutlineLink, HiOutlineEnvelope, HiOutlineWifi, HiOutlineChartBarSquare, HiOutlinePuzzlePiece, HiOutlineCalendar, HiOutlineInbox, HiOutlineArrowUpTray, HiOutlineWrench, HiOutlinePhoto, HiOutlineCursorArrowRays, HiOutlineChevronDown, HiOutlinePresentationChartBar, HiOutlineSquare3Stack3D, HiOutlineMinus, HiOutlineMagnifyingGlass, HiOutlineRectangleGroup
} from 'react-icons/hi2'
import { VscComment, VscGitMerge, VscFileCode, VscKey, VscServerProcess } from 'react-icons/vsc'
import { FaChrome } from 'react-icons/fa'

// Simple, flat navigation structure with all metadata in one place
export const navigation = [
  // Getting Started
  {
    title: 'Introduction',
    href: '/',
    icon: HiOutlineHome,
    section: 'Getting Started',
    keywords: ['intro', 'overview', 'start', 'begin'],
    prev: null,
    next: { href: '/quickstart', title: 'Quick Start' }
  },
  {
    title: 'Quick Start',
    href: '/quickstart',
    icon: HiOutlineRocketLaunch,
    section: 'Getting Started',
    keywords: ['setup', 'install', 'begin', 'tutorial'],
    prev: { href: '/', title: 'Introduction' },
    next: { href: '/vibe-coding', title: 'Vibe Coding Guide' }
  },
  {
    title: 'Vibe Coding Guide',
    href: '/vibe-coding',
    icon: VscFileCode,
    section: 'Getting Started',
    keywords: ['cursor', 'ai', 'vibe', 'coding', 'drag', 'drop', 'docs'],
    prev: { href: '/quickstart', title: 'Quick Start' },
    next: { href: '/cli', title: 'CLI Reference' }
  },
  {
    title: 'Deploy',
    href: '/deploy',
    icon: HiOutlineArrowUpTray,
    section: 'Getting Started',
    difficulty: 'New',
    hidden: true, // Hide from sidebar - coming soon
    keywords: ['deploy', 'hosting', 'cloud', 'production', 'docker', 'gcp', 'agents'],
    prev: { href: '/cli', title: 'CLI Reference' },
    next: { href: '/agent', title: 'Agent' }
  },

  // Core Concepts
  {
    title: 'Agent',
    href: '/agent',
    icon: HiOutlineUsers,
    section: 'Core Concepts',
    difficulty: 'Essential',
    keywords: ['agent', 'create', 'orchestrator', 'core', 'llm', 'conversation', 'iteration'],
    prev: { href: '/deploy', title: 'Deploy' },
    next: { href: '/prompts', title: 'System Prompts' }
  },
  {
    title: 'System Prompts',
    href: '/prompts',
    icon: HiOutlineChatBubbleBottomCenterText,
    section: 'Core Concepts',
    difficulty: 'Start Here',
    keywords: ['template', 'prompt', 'system', 'message', 'personality', 'behavior'],
    prev: { href: '/agent', title: 'Agent' },
    next: { href: '/tools', title: 'Tools' }
  },
  {
    title: 'Tools',
    href: '/tools',
    icon: HiOutlineCodeBracket,
    section: 'Core Concepts',
    keywords: ['function', 'utility', 'actions', 'capabilities', 'tools'],
    prev: { href: '/prompts', title: 'System Prompts' },
    next: { href: '/useful-tools', title: 'Useful Tools' }
  },

  // Useful Tools
  {
    title: 'Useful Tools',
    href: '/useful-tools',
    icon: HiOutlineWrench,
    section: 'Useful Tools',
    keywords: ['tools', 'useful_tools', 'integrations', 'gmail', 'outlook', 'memory', 'calendar'],
    prev: { href: '/tools', title: 'Tools' },
    next: { href: '/memory', title: 'Memory' }
  },
  {
    title: 'Agent Emails',
    href: '/agent-emails',
    icon: HiOutlineEnvelope,
    section: 'Useful Tools',
    difficulty: 'New',
    keywords: ['email', 'send', 'receive', 'mail', 'notification', 'inbox', 'imap'],
    prev: { href: '/useful-tools', title: 'Useful Tools' },
    next: { href: '/agent-emails/send', title: 'Send Email' }
  },
  {
    title: 'Send Email',
    href: '/agent-emails/send',
    icon: HiOutlineEnvelope,
    section: 'Useful Tools',
    parent: '/agent-emails',
    keywords: ['email', 'send', 'mail', 'notification', 'alert', 'message', 'smtp'],
    prev: { href: '/agent-emails', title: 'Agent Emails' },
    next: { href: '/agent-emails/receive', title: 'Receive Emails' }
  },
  {
    title: 'Receive Emails',
    href: '/agent-emails/receive',
    icon: HiOutlineInbox,
    section: 'Useful Tools',
    parent: '/agent-emails',
    keywords: ['email', 'get', 'inbox', 'imap', 'read', 'fetch', 'mail', 'receive'],
    prev: { href: '/agent-emails/send', title: 'Send Email' },
    next: { href: '/gmail', title: 'Gmail' }
  },
  {
    title: 'Diff Writer',
    href: '/useful-tools/diff-writer',
    icon: HiOutlineCodeBracket,
    section: 'Useful Tools',
    keywords: ['diff', 'write', 'file', 'code', 'approval', 'human', 'loop'],
    prev: { href: '/microsoft-integration', title: 'Microsoft Integration' },
    next: { href: '/useful-tools/shell', title: 'Shell' }
  },
  {
    title: 'Gmail',
    href: '/gmail',
    icon: HiOutlineEnvelope,
    section: 'Useful Tools',
    difficulty: 'New',
    keywords: ['gmail', 'google', 'email', 'inbox', 'oauth', 'labels', 'archive', 'crm', 'contacts'],
    prev: { href: '/agent-emails/receive', title: 'Receive Emails' },
    next: { href: '/outlook', title: 'Outlook' }
  },
  {
    title: 'Memory',
    href: '/memory',
    icon: HiOutlineCpuChip,
    section: 'Useful Tools',
    difficulty: 'New',
    keywords: ['memory', 'storage', 'persistence', 'remember', 'database', 'rag'],
    prev: { href: '/useful-tools', title: 'Useful Tools' },
    next: { href: '/agent-emails', title: 'Agent Emails' }
  },
  {
    title: 'Outlook',
    href: '/outlook',
    icon: HiOutlineEnvelope,
    section: 'Useful Tools',
    difficulty: 'New',
    keywords: ['outlook', 'microsoft', 'email', 'inbox', 'oauth', 'office', '365', 'graph', 'send'],
    prev: { href: '/gmail', title: 'Gmail' },
    next: { href: '/google-integration', title: 'Google Integration' }
  },
  {
    title: 'Google Integration',
    href: '/google-integration',
    icon: HiOutlineCalendar,
    section: 'Integrations',
    difficulty: 'New',
    keywords: ['google', 'gmail', 'calendar', 'oauth', 'integration', 'schedule', 'meeting'],
    prev: { href: '/outlook', title: 'Outlook' },
    next: { href: '/microsoft-integration', title: 'Microsoft Integration' }
  },
  {
    title: 'Microsoft Integration',
    href: '/microsoft-integration',
    icon: HiOutlineCalendar,
    section: 'Integrations',
    difficulty: 'New',
    keywords: ['microsoft', 'outlook', 'calendar', 'oauth', 'integration', 'office', '365', 'azure', 'teams'],
    prev: { href: '/google-integration', title: 'Google Integration' },
    next: { href: '/useful-tools/diff-writer', title: 'Diff Writer' }
  },
  {
    title: 'Shell',
    href: '/useful-tools/shell',
    icon: HiOutlineCommandLine,
    section: 'Useful Tools',
    keywords: ['shell', 'command', 'bash', 'terminal', 'execute', 'run'],
    prev: { href: '/useful-tools/diff-writer', title: 'Diff Writer' },
    next: { href: '/useful-tools/slash-command', title: 'Slash Command' }
  },
  {
    title: 'Slash Command',
    href: '/useful-tools/slash-command',
    icon: HiOutlineCommandLine,
    section: 'Useful Tools',
    keywords: ['slash', 'command', 'custom', 'markdown', 'prompt'],
    prev: { href: '/useful-tools/shell', title: 'Shell' },
    next: { href: '/useful-tools/terminal', title: 'Terminal' }
  },
  {
    title: 'Terminal',
    href: '/useful-tools/terminal',
    icon: HiOutlineCommandLine,
    section: 'Useful Tools',
    keywords: ['terminal', 'pick', 'menu', 'input', 'browse', 'files', 'autocomplete'],
    prev: { href: '/useful-tools/slash-command', title: 'Slash Command' },
    next: { href: '/useful-tools/todo-list', title: 'Todo List' }
  },
  {
    title: 'Todo List',
    href: '/useful-tools/todo-list',
    icon: HiOutlineDocumentText,
    section: 'Useful Tools',
    keywords: ['todo', 'task', 'list', 'progress', 'track', 'manage'],
    prev: { href: '/useful-tools/terminal', title: 'Terminal' },
    next: { href: '/web-fetch', title: 'WebFetch' }
  },
  {
    title: 'WebFetch',
    href: '/web-fetch',
    icon: HiOutlineGlobeAlt,
    section: 'Useful Tools',
    difficulty: 'New',
    keywords: ['web', 'fetch', 'scrape', 'html', 'parse', 'http', 'research', 'analyze'],
    prev: { href: '/useful-tools/todo-list', title: 'Todo List' },
    next: { href: '/tui', title: 'TUI Components' }
  },

  // TUI Components
  {
    title: 'TUI Components',
    href: '/tui',
    icon: HiOutlineCommandLine,
    section: 'TUI',
    difficulty: 'NEW',
    keywords: ['tui', 'terminal', 'ui', 'input', 'pick', 'dropdown', 'status', 'keyboard', 'rich'],
    prev: { href: '/web-fetch', title: 'WebFetch' },
    next: { href: '/tui/pick', title: 'pick' }
  },
  {
    title: 'pick',
    href: '/tui/pick',
    icon: HiOutlineChevronDown,
    section: 'TUI',
    keywords: ['pick', 'select', 'menu', 'choice', 'single', 'keyboard', 'navigation'],
    prev: { href: '/tui', title: 'TUI Components' },
    next: { href: '/tui/input', title: 'Input' }
  },
  {
    title: 'Input',
    href: '/tui/input',
    icon: HiOutlineCursorArrowRays,
    section: 'TUI',
    keywords: ['input', 'text', 'autocomplete', 'trigger', 'type', 'file', 'command'],
    prev: { href: '/tui/pick', title: 'pick' },
    next: { href: '/tui/dropdown', title: 'Dropdown' }
  },
  {
    title: 'Dropdown',
    href: '/tui/dropdown',
    icon: HiOutlineChevronDown,
    section: 'TUI',
    keywords: ['dropdown', 'list', 'selection', 'autocomplete', 'item', 'menu'],
    prev: { href: '/tui/input', title: 'Input' },
    next: { href: '/tui/status-bar', title: 'StatusBar' }
  },
  {
    title: 'StatusBar',
    href: '/tui/status-bar',
    icon: HiOutlinePresentationChartBar,
    section: 'TUI',
    keywords: ['status', 'bar', 'powerline', 'segment', 'progress', 'display'],
    prev: { href: '/tui/dropdown', title: 'Dropdown' },
    next: { href: '/tui/footer', title: 'Footer' }
  },
  {
    title: 'Footer',
    href: '/tui/footer',
    icon: HiOutlineRectangleGroup,
    section: 'TUI',
    keywords: ['footer', 'tips', 'hints', 'help', 'display'],
    prev: { href: '/tui/status-bar', title: 'StatusBar' },
    next: { href: '/tui/divider', title: 'Divider' }
  },
  {
    title: 'Divider',
    href: '/tui/divider',
    icon: HiOutlineMinus,
    section: 'TUI',
    keywords: ['divider', 'separator', 'line', 'horizontal', 'visual'],
    prev: { href: '/tui/footer', title: 'Footer' },
    next: { href: '/tui/fuzzy', title: 'Fuzzy Matching' }
  },
  {
    title: 'Fuzzy Matching',
    href: '/tui/fuzzy',
    icon: HiOutlineMagnifyingGlass,
    section: 'TUI',
    keywords: ['fuzzy', 'match', 'search', 'score', 'highlight', 'autocomplete'],
    prev: { href: '/tui/divider', title: 'Divider' },
    next: { href: '/tui/keys', title: 'Keyboard Input' }
  },
  {
    title: 'Keyboard Input',
    href: '/tui/keys',
    icon: VscKey,
    section: 'TUI',
    keywords: ['keyboard', 'input', 'getch', 'read_key', 'arrow', 'escape', 'enter'],
    prev: { href: '/tui/fuzzy', title: 'Fuzzy Matching' },
    next: { href: '/tui/providers', title: 'Providers' }
  },
  {
    title: 'Providers',
    href: '/tui/providers',
    icon: HiOutlineSquare3Stack3D,
    section: 'TUI',
    keywords: ['provider', 'file', 'static', 'autocomplete', 'data', 'source'],
    prev: { href: '/tui/keys', title: 'Keyboard Input' },
    next: { href: '/auto-debug', title: 'Interactive Debugging' }
  },

  // Debugging Tools
  {
    title: 'Interactive Debugging',
    href: '/auto-debug',
    icon: HiOutlineBugAnt,
    section: 'Debug',
    difficulty: 'Essential',
    keywords: ['debug', 'auto_debug', 'interactive', 'breakpoint', 'xray', 'inspect', 'pause', 'repl', 'python', 'variables', 'state', 'agent debugging', 'llm debugging'],
    prev: { href: '/tui/providers', title: 'Providers' },
    next: { href: '/auto-debug-exception', title: 'Auto Debug Exception' }
  },
  {
    title: 'Auto Debug Exception',
    href: '/auto-debug-exception',
    icon: HiOutlineBugAnt,
    section: 'Debug',
    keywords: ['debug', 'exception', 'crash', 'error', 'ai', 'runtime', 'inspection', 'traceback', 'fix'],
    prev: { href: '/auto-debug', title: 'Interactive Debugging' },
    next: { href: '/tools/browser', title: 'Browser Screenshots' }
  },
  {
    title: 'Browser Screenshots',
    href: '/tools/browser',
    icon: HiOutlineCamera,
    section: 'Debug',
    keywords: ['browser', 'screenshot', 'debug', 'capture', 'viewport', 'playwright', 'test', 'responsive'],
    prev: { href: '/auto-debug-exception', title: 'Auto Debug Exception' },
    next: { href: '/logging', title: 'Logging' }
  },
  {
    title: 'Logging',
    href: '/logging',
    icon: HiOutlineDocumentText,
    section: 'Debug',
    keywords: ['logging', 'log', 'file', 'output', 'debug', 'audit', 'record', 'trace', 'monitor', 'activity'],
    prev: { href: '/tools/browser', title: 'Browser Screenshots' },
    next: { href: '/models', title: 'Models' }
  },

  {
    title: 'Models',
    href: '/models',
    icon: HiOutlineCpuChip,
    section: 'Core Concepts',
    keywords: ['model', 'gpt', 'gemini', 'claude', 'anthropic', 'openai', 'google', 'llm', 'ai'],
    prev: { href: '/logging', title: 'Logging' },
    next: { href: '/llm_do', title: 'LLM Function' }
  },
  {
    title: 'LLM Function',
    href: '/llm_do',
    icon: HiOutlineSparkles,
    section: 'Core Concepts',
    keywords: ['ai', 'model', 'openai', 'language', 'llm_do', 'direct', 'gemini', 'anthropic', 'claude'],
    prev: { href: '/models', title: 'Models' },
    next: { href: '/trust', title: 'Trust Parameter' }
  },
  {
    title: 'Trust Parameter',
    href: '/trust',
    icon: HiOutlineShieldCheck,
    section: 'Network',
    keywords: ['security', 'safety', 'trust', 'permission', 'multi-agent'],
    prev: { href: '/llm_do', title: 'LLM Function' },
    next: { href: '/xray', title: '@xray Decorator' }
  },
  {
    title: '@xray Decorator',
    href: '/xray',
    icon: HiOutlineBugAnt,
    section: 'Debug',
    keywords: ['debug', 'xray', 'decorator', 'trace', 'monitor', 'visibility'],
    prev: { href: '/trust', title: 'Trust Parameter' },
    next: { href: '/on_events', title: 'Event System (on_events)' }
  },
  {
    title: 'Event System (on_events)',
    href: '/on_events',
    icon: HiOutlineChartBarSquare,
    section: 'Core Concepts',
    difficulty: 'NEW',
    keywords: ['events', 'on_events', 'hooks', 'lifecycle', 'monitoring', 'after_llm', 'before_tool', 'after_tool', 'on_error', 'after_user_input', 'before_llm'],
    prev: { href: '/xray', title: '@xray Decorator' },
    next: { href: '/plugin', title: 'Plugin System' }
  },
  {
    title: 'Useful Plugins',
    href: '/useful-plugins',
    icon: HiOutlineSquares2X2,
    section: 'Useful Plugins',
    difficulty: 'NEW',
    keywords: ['plugins', 'useful_plugins', 're_act', 'eval', 'image_result_formatter', 'gmail_plugin', 'calendar_plugin', 'shell_approval'],
    prev: { href: '/plugin', title: 'Plugin System' },
    next: { href: '/useful-plugins/re-act', title: 're_act' }
  },
  {
    title: 're_act',
    href: '/useful-plugins/re-act',
    icon: HiOutlineCpuChip,
    section: 'Useful Plugins',
    parent: '/useful-plugins',
    keywords: ['react', 'reasoning', 'plan', 'reflect', 'think'],
    prev: { href: '/useful-plugins', title: 'Useful Plugins' },
    next: { href: '/useful-plugins/eval', title: 'eval' }
  },
  {
    title: 'eval',
    href: '/useful-plugins/eval',
    icon: HiOutlineChartBar,
    section: 'Useful Plugins',
    parent: '/useful-plugins',
    keywords: ['eval', 'evaluate', 'debug', 'test', 'expected'],
    prev: { href: '/useful-plugins/re-act', title: 're_act' },
    next: { href: '/useful-plugins/image-result-formatter', title: 'image_result_formatter' }
  },
  {
    title: 'image_result_formatter',
    href: '/useful-plugins/image-result-formatter',
    icon: HiOutlinePhoto,
    section: 'Useful Plugins',
    parent: '/useful-plugins',
    keywords: ['image', 'vision', 'base64', 'screenshot', 'format'],
    prev: { href: '/useful-plugins/eval', title: 'eval' },
    next: { href: '/useful-plugins/shell-approval', title: 'shell_approval' }
  },
  {
    title: 'shell_approval',
    href: '/useful-plugins/shell-approval',
    icon: HiOutlineShieldCheck,
    section: 'Useful Plugins',
    parent: '/useful-plugins',
    keywords: ['shell', 'approval', 'security', 'command', 'permission'],
    prev: { href: '/useful-plugins/image-result-formatter', title: 'image_result_formatter' },
    next: { href: '/useful-plugins/gmail-plugin', title: 'gmail_plugin' }
  },
  {
    title: 'gmail_plugin',
    href: '/useful-plugins/gmail-plugin',
    icon: HiOutlineEnvelope,
    section: 'Useful Plugins',
    parent: '/useful-plugins',
    keywords: ['gmail', 'email', 'approval', 'crm', 'plugin'],
    prev: { href: '/useful-plugins/shell-approval', title: 'shell_approval' },
    next: { href: '/useful-plugins/calendar-plugin', title: 'calendar_plugin' }
  },
  {
    title: 'calendar_plugin',
    href: '/useful-plugins/calendar-plugin',
    icon: HiOutlineCalendar,
    section: 'Useful Plugins',
    parent: '/useful-plugins',
    keywords: ['calendar', 'events', 'approval', 'google', 'microsoft', 'plugin'],
    prev: { href: '/useful-plugins/gmail-plugin', title: 'gmail_plugin' },
    next: { href: '/host', title: 'host()' }
  },
  {
    title: 'Plugin System',
    href: '/plugin',
    icon: HiOutlinePuzzlePiece,
    section: 'Core Concepts',
    difficulty: 'NEW',
    keywords: ['plugin', 'plugins', 'extension', 'reusable', 'events', 'custom', 'create', 'build'],
    prev: { href: '/on_events', title: 'Event System (on_events)' },
    next: { href: '/useful-plugins', title: 'Useful Plugins' }
  },

  // Networking
  {
    title: 'host()',
    href: '/host',
    icon: HiOutlineWifi,
    section: 'Network',
    difficulty: 'Essential',
    keywords: ['host', 'serve', 'network', 'remote', 'relay', 'websocket', 'distributed', 'http', 'api', 'ed25519'],
    prev: { href: '/useful-plugins/calendar-plugin', title: 'calendar_plugin' },
    next: { href: '/connect', title: 'Connect to Agents' }
  },
  {
    title: 'Connect to Agents',
    href: '/connect',
    icon: VscServerProcess,
    section: 'Network',
    difficulty: 'Essential',
    keywords: ['connect', 'remote', 'network', 'relay', 'distributed', 'client', 'remote agent', 'proxy'],
    prev: { href: '/host', title: 'host()' },
    next: { href: '/cli', title: 'CLI Reference' }
  },
  {
    title: 'CLI Reference',
    href: '/cli',
    icon: HiOutlineCommandLine,
    section: 'Network',
    keywords: ['command', 'terminal', 'co', 'commands'],
    prev: { href: '/connect', title: 'Connect to Agents' },
    next: { href: '/xray/trace', title: 'trace() Visual Flow' }
  },

  // Advanced Features
  {
    title: 'trace() Visual Flow',
    href: '/xray/trace',
    icon: VscGitMerge,
    section: 'Debug',
    parent: '/xray', // Nested under @xray Decorator
    keywords: ['trace', 'flow', 'visual', 'debug', 'execution'],
    prev: { href: '/cli', title: 'CLI Reference' },
    next: { href: '/prompts/formats', title: 'Prompt Formats' }
  },
  {
    title: 'Prompt Formats',
    href: '/prompts/formats',
    icon: HiOutlineDocumentText,
    section: 'Core Concepts',
    parent: '/prompts', // Nested under System Prompts
    keywords: ['format', 'prompt', 'template', 'syntax'],
    prev: { href: '/xray/trace', title: 'trace() Visual Flow' },
    next: { href: '/threat-model', title: 'Threat Model' }
  },

  // Security
  {
    title: 'Threat Model',
    href: '/threat-model',
    icon: HiOutlineShieldCheck,
    section: 'Network',
    keywords: ['security', 'threat', 'risk', 'safety', 'vulnerability'],
    prev: { href: '/prompts/formats', title: 'Prompt Formats' },
    next: { href: '/examples', title: 'All Examples' }
  },

  // Examples
  {
    title: 'All Examples',
    href: '/examples',
    icon: HiOutlineFolderOpen,
    section: 'Examples',
    difficulty: 'Browse',
    keywords: ['examples', 'samples', 'demos', 'tutorials'],
    prev: { href: '/threat-model', title: 'Threat Model' },
    next: { href: '/examples/calculator', title: 'Calculator' }
  },
  {
    title: 'Calculator',
    href: '/examples/calculator',
    icon: HiOutlineCalculator,
    section: 'Examples',
    difficulty: 'Beginner',
    keywords: ['calculator', 'math', 'compute', 'arithmetic', 'tools', 'functions'],
    prev: { href: '/examples', title: 'All Examples' },
    next: { href: '/examples/browser', title: 'Browser Automation' },
    exampleIndex: 0,
    totalExamples: 2
  },
  {
    title: 'Browser Automation',
    href: '/examples/browser',
    icon: FaChrome,
    section: 'Examples',
    difficulty: 'Intermediate',
    keywords: ['browser', 'automation', 'screenshot', 'playwright', 'web', 'scraping'],
    prev: { href: '/examples/calculator', title: 'Calculator' },
    next: { href: '/blog', title: 'All Posts' },
    exampleIndex: 1,
    totalExamples: 2
  },

  // Blog - Design Decisions in chronological order
  {
    title: 'All Posts',
    href: '/blog',
    icon: HiOutlineBookOpen,
    section: 'Blog',
    keywords: ['blog', 'posts', 'articles', 'news'],
    prev: { href: '/examples/ecommerce-manager', title: 'E-commerce Manager' },
    next: { href: '/blog/input-method', title: 'Why `input()` Over `run()`' }
  },
  {
    title: 'Why `input()` Over `run()`',
    href: '/blog/input-method',
    icon: HiOutlineCommandLine,
    section: 'Blog',
    difficulty: 'Design Decision',
    keywords: ['input', 'run', 'api', 'mental', 'model', 'ux'],
    prev: { href: '/blog', title: 'All Posts' },
    next: { href: '/blog/llm-do', title: 'Why `llm_do()` Over `llm()`' }
  },
  {
    title: 'Why `llm_do()` Over `llm()`',
    href: '/blog/llm-do',
    icon: HiOutlineCodeBracket,
    section: 'Blog',
    difficulty: 'Design Decision',
    keywords: ['llm', 'function', 'naming', 'api', 'design'],
    prev: { href: '/blog/input-method', title: 'Why `input()` Over `run()`' },
    next: { href: '/blog/trust-keyword', title: 'Why We Chose "Trust"' }
  },
  {
    title: 'Why We Chose "Trust"',
    href: '/blog/trust-keyword',
    icon: HiOutlineUsers,
    section: 'Blog',
    difficulty: 'Design Decision',
    keywords: ['trust', 'design', 'decision', 'authentication'],
    prev: { href: '/blog/llm-do', title: 'Why `llm_do()` Over `llm()`' },
    next: { href: '/blog/network-protocol-design', title: 'Network Protocol Design' }
  },
  {
    title: 'Network Protocol Design',
    href: '/blog/network-protocol-design',
    icon: VscGitMerge,
    section: 'Blog',
    difficulty: 'Architecture',
    keywords: ['network', 'protocol', 'architecture', 'design'],
    prev: { href: '/blog/trust-keyword', title: 'Why We Chose "Trust"' },
    next: { href: '/blog/agent-address-format', title: 'Agent Address Format' }
  },
  {
    title: 'Agent Address Format',
    href: '/blog/agent-address-format',
    icon: HiOutlineShieldCheck,
    section: 'Blog',
    difficulty: 'Design Decision',
    keywords: ['address', 'public', 'key', 'ed25519', 'identity', 'hex'],
    prev: { href: '/blog/network-protocol-design', title: 'Network Protocol Design' },
    next: { href: '/blog/naming-is-hard', title: 'Why "Address" Over "Identity"' }
  },
  {
    title: 'Why "Address" Over "Identity"',
    href: '/blog/naming-is-hard',
    icon: VscComment,
    section: 'Blog',
    difficulty: 'Design Decision',
    keywords: ['naming', 'identity', 'address', 'terminology', 'ux'],
    prev: { href: '/blog/agent-address-format', title: 'Agent Address Format' },
    next: { href: '/blog/cli-ux-progressive-disclosure', title: 'Progressive Disclosure CLI' }
  },
  {
    title: 'Progressive Disclosure CLI',
    href: '/blog/cli-ux-progressive-disclosure',
    icon: HiOutlineCommandLine,
    section: 'Blog',
    difficulty: 'Design Decision',
    keywords: ['cli', 'ux', 'progressive', 'disclosure', 'initialization'],
    prev: { href: '/blog/naming-is-hard', title: 'Why "Address" Over "Identity"' },
    next: { href: '/blog/auto-debug-evolution', title: 'Auto-Debug Design Evolution' }
  },
  {
    title: 'Auto-Debug Design Evolution',
    href: '/blog/auto-debug-evolution',
    icon: HiOutlineBugAnt,
    section: 'Blog',
    difficulty: 'Design Decision',
    keywords: ['debug', 'auto-debug', 'ux', 'design', 'iteration', 'unix', 'steve jobs', 'simplicity'],
    prev: { href: '/blog/cli-ux-progressive-disclosure', title: 'Progressive Disclosure CLI' },
    next: { href: '/roadmap', title: 'Coming Soon Features' }
  },

  // Roadmap
  {
    title: 'Coming Soon Features',
    href: '/roadmap',
    icon: HiOutlineRocketLaunch,
    section: 'Roadmap',
    difficulty: 'Preview',
    keywords: ['roadmap', 'future', 'upcoming', 'features', 'soon'],
    prev: { href: '/blog/input-method', title: 'Why `input()` Over `run()`' },
    next: { href: '/links', title: 'All Links' }
  },

  // Links
  {
    title: 'All Links',
    href: '/links',
    icon: HiOutlineLink,
    section: 'Connect',
    keywords: ['links', 'social', 'media', 'discord', 'github', 'twitter', 'instagram', 'tiktok', 'youtube', 'contact'],
    prev: { href: '/roadmap', title: 'Coming Soon Features' },
    next: null
  },

  // Other pages not in main nav flow
  {
    title: 'Website Maintenance',
    href: '/website-maintenance',
    icon: HiOutlineCog,
    section: 'Admin',
    keywords: ['website', 'maintenance', 'admin'],
    prev: null,
    next: null
  }
]

// Helper to get page by href
export function getPageByHref(href: string) {
  return navigation.find(page => page.href === href)
}

// Helper to get all pages in a section
export function getPagesBySection(section: string) {
  return navigation.filter(page => page.section === section)
}

// Helper to get example pages
export function getExamplePages() {
  return navigation.filter(page => page.section === 'Examples' && page.exampleIndex !== undefined)
}