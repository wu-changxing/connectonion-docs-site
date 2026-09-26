'use client'

import { HiOutlineQuestionMarkCircle } from 'react-icons/hi2'
import { PageHeader } from '../PageHeader'

/** PageHeader takes an icon function, which a server page cannot pass. */
export function GuideHeader({ title, description, markdown }: { title: string; description: string; markdown: string }) {
  return (
    <PageHeader
      breadcrumbs={[{ label: 'Docs', href: '/' }, { label: 'Guides', href: '/guides' }, { label: title }]}
      icon={HiOutlineQuestionMarkCircle}
      iconColor="icon-ui"
      title={title}
      description={description}
      markdownContent={markdown}
    />
  )
}
