'use client'

import { HiOutlinePlay } from 'react-icons/hi2'
import { PageHeader } from '../../components/PageHeader'

/** The header is a client component and takes an icon function, which a
    server page cannot pass across the boundary; this wrapper owns it. */
export function QuickStartHeader() {
  return (
    <PageHeader
      breadcrumbs={[
        { label: 'Docs', href: '/' },
        { label: 'Quick Start' }
      ]}
      icon={HiOutlinePlay}
      iconColor="icon-ui"
      title="Quick Start"
      description="CLI is all you need: identity, email, Gmail, a real browser, chat apps and Claude Code — one co command each."
      markdownPath="/quickstart/quickstart.md"
      markdownFilename="quickstart.md"
    />
  )
}
