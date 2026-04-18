/**
 * @purpose Reusable page header component with breadcrumbs, icon, title, description, and copy button
 * @llm-note
 *   Dependencies: imports from [next/link, react-icons, CopyMarkdownButton, react] | imported by [28+ page files]
 *   Data flow: receives {breadcrumbs, icon, title, description, badge?, markdownPath?} → renders header structure
 *   State/Effects: pure render component | no state | CopyMarkdownButton handles copy state
 *   Integration: exposes PageHeader component | accepts Lucide or react-icons icon components
 *   UX: icon background | breadcrumb navigation | optional CopyMarkdownButton for markdown path
 */
'use client'

import Link from 'next/link'
import { HiOutlineArrowRight } from 'react-icons/hi2'
import { CopyMarkdownButton } from './CopyMarkdownButton'
import { ReactNode, ComponentType } from 'react'

interface BreadcrumbItem {
  label: string
  href?: string
}

type IconComponent = ComponentType<{ className?: string }>

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[]
  icon: IconComponent
  iconColor?: string
  iconBgFrom?: string
  iconBgTo?: string
  iconBorderColor?: string
  title: string
  description: string
  badge?: ReactNode
  markdownPath?: string
  markdownFilename?: string
}

export function PageHeader({
  breadcrumbs,
  icon: Icon,
  iconColor = 'icon-ui',
  iconBgFrom,
  iconBgTo,
  iconBorderColor,
  title,
  description,
  badge,
  markdownPath,
  markdownFilename,
}: PageHeaderProps) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        {breadcrumbs.map((crumb, index) => (
          <span key={index} className="flex items-center gap-2">
            {index > 0 && <HiOutlineArrowRight className="w-3.5 h-3.5 text-gray-400" />}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-gray-800 transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium">{crumb.label}</span>
            )}
          </span>
        ))}
      </div>

      {/* Header */}
      <div className="mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-100 rounded-xl border border-gray-200">
              <Icon className={`w-8 h-8 ${iconColor}`} />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="heading-1">{title}</h1>
                {badge}
              </div>
              <p className="text-lg text-gray-500 font-[family-name:var(--font-instrument-serif)] italic">{description}</p>
            </div>
          </div>
          {markdownPath && (
            <CopyMarkdownButton
              markdownPath={markdownPath}
              filename={markdownFilename}
              className="flex-shrink-0"
            />
          )}
        </div>
      </div>
    </>
  )
}
