'use client'

import type { MouseEvent } from 'react'

/** Keep the reviewed Markdown as the source while exposing its copy controls. */
export function CliGuideBody({ html }: { html: string }) {
  const content = html
    .replaceAll('<h2 ', '<h2 class="heading-2" ')
    .replaceAll('<h3 ', '<h3 class="heading-3" ')
    .replaceAll('<pre>', '<pre style="position:relative;padding-top:3.5rem"><button type="button" data-copy-code aria-label="Copy code" class="absolute right-3 top-2 min-h-11 rounded border border-white/30 px-3 font-sans text-xs text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white">Copy code</button>')

  async function copyCode(event: MouseEvent<HTMLDivElement>) {
    if (!(event.target instanceof Element)) return
    const button = event.target.closest<HTMLButtonElement>('button[data-copy-code]')
    const code = button?.closest('pre')?.querySelector('code')
    if (!button || !code) return
    await navigator.clipboard.writeText(code.textContent || '')
    button.textContent = 'Copied'
    button.setAttribute('aria-label', 'Code copied')
    setTimeout(() => {
      button.textContent = 'Copy code'
      button.setAttribute('aria-label', 'Copy code')
    }, 2000)
  }

  return <div onClick={copyCode} className="blog-prose break-words [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:mb-8" dangerouslySetInnerHTML={{ __html: content }} />
}
