import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// Next 16 surfaced long-standing violations in these exact legacy files. Keep
// the official rules enabled everywhere else so new pages cannot extend the
// baseline. Remove a file from a list as soon as its violations are fixed.
const unescapedEntityBaseline = [
  "app/agent-emails/receive/page.tsx",
  "app/agent-emails/send/page.tsx",
  "app/agent/page.tsx",
  "app/auto-debug-exception/page.tsx",
  "app/auto-debug/page.tsx",
  "app/blog/agent-address-format/page.tsx",
  "app/blog/auto-debug-evolution/page.tsx",
  "app/blog/cli-ux-progressive-disclosure/page.tsx",
  "app/blog/input-method/page.tsx",
  "app/blog/llm-do/page.tsx",
  "app/blog/naming-is-hard/page.tsx",
  "app/blog/network-protocol-design/page.tsx",
  "app/blog/trust-keyword/page.tsx",
  "app/cli/ai/page.tsx",
  "app/cli/auth/page.tsx",
  "app/cli/call/page.tsx",
  "app/cli/copy/page.tsx",
  "app/cli/create/page.tsx",
  "app/cli/init/page.tsx",
  "app/examples/browser/page.tsx",
  "app/examples/calculator/page.tsx",
  "app/features/permissions/page.tsx",
  "app/features/skills/page.tsx",
  "app/features/transcribe/page.tsx",
  "app/features/trust/page.tsx",
  "app/gmail/page.tsx",
  "app/google-integration/page.tsx",
  "app/host/page.tsx",
  "app/llm_do/page.tsx",
  "app/logging/page.tsx",
  "app/microsoft-integration/page.tsx",
  "app/models/page.tsx",
  "app/models/pricing/page.tsx",
  "app/on_events/page.tsx",
  "app/outlook/page.tsx",
  "app/page.tsx",
  "app/prompts/examples/friendly-assistant/page.tsx",
  "app/prompts/examples/math-tutor/page.tsx",
  "app/prompts/examples/technical-writer/page.tsx",
  "app/prompts/formats/page.tsx",
  "app/prompts/page.tsx",
  "app/session-reconnect/page.tsx",
  "app/threat-model/page.tsx",
  "app/tools/browser/page.tsx",
  "app/tools/page.tsx",
  "app/tui/keys/page.tsx",
  "app/tui/pick/page.tsx",
  "app/useful-plugins/calendar-plugin/page.tsx",
  "app/useful-plugins/eval/page.tsx",
  "app/useful-plugins/gmail-plugin/page.tsx",
  "app/useful-plugins/image-result-formatter/page.tsx",
  "app/useful-plugins/shell-approval/page.tsx",
  "app/useful-plugins/skills/page.tsx",
  "app/useful-plugins/tool-approval/page.tsx",
  "app/useful-plugins/ulw/page.tsx",
  "app/useful-tools/bash/page.tsx",
  "app/useful-tools/browser-tools/page.tsx",
  "app/useful-tools/codex/page.tsx",
  "app/useful-tools/diff-writer/page.tsx",
  "app/useful-tools/file-tools/page.tsx",
  "app/useful-tools/shell/page.tsx",
  "app/useful-tools/slash-command/page.tsx",
  "app/useful-tools/terminal/page.tsx",
  "app/useful-tools/todo-list/page.tsx",
  "app/xray/page.tsx",
];

const staticComponentBaseline = [
  "app/agent-emails/send/page.tsx",
  "app/auto-debug-exception/page.tsx",
  "app/logging/page.tsx",
];

const stateInEffectBaseline = [
  "app/threat-model/page.tsx",
  "components/CopyMarkdownButton.tsx",
  "components/DocsSidebar.tsx",
  "components/GitHubStarBanner.tsx",
  "components/MobileDocsNav.tsx",
  "components/MobileSectionJump.tsx",
  "components/Navigation.tsx",
  "components/OnThisPage.tsx",
];

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  {
    files: unescapedEntityBaseline,
    rules: { "react/no-unescaped-entities": "off" },
  },
  {
    files: staticComponentBaseline,
    rules: { "react-hooks/static-components": "off" },
  },
  {
    files: stateInEffectBaseline,
    rules: { "react-hooks/set-state-in-effect": "off" },
  },
  {
    files: ["app/threat-model/page.tsx", "components/DocsSidebar.tsx"],
    rules: { "@typescript-eslint/no-explicit-any": "off" },
  },
  {
    files: ["app/threat-model/page.tsx"],
    rules: { "react-hooks/immutability": "off" },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
