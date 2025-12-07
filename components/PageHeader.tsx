'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CopyMarkdownButton } from './CopyMarkdownButton'
import { ReactNode, ComponentType } from 'react'

interface BreadcrumbItem {
  label: string
  href?: string
}

// Accept both Lucide icons and react-icons
type IconComponent = ComponentType<{ className?: string }>

interface PageHeaderProps {
  // Breadcrumb navigation
  breadcrumbs: BreadcrumbItem[]
  // Page icon (Lucide or react-icons)
  icon: IconComponent
  iconColor?: string // e.g., "text-purple-400"
  iconBgFrom?: string // e.g., "from-purple-600/20"
  iconBgTo?: string // e.g., "to-pink-600/20"
  iconBorderColor?: string // e.g., "border-purple-500/30"
  // Title and description
  title: string
  description: string
  // Optional badge next to title
  badge?: ReactNode
  // Optional markdown path for copy/download buttons (fetches from public/)
  markdownPath?: string
  markdownFilename?: string
}

export function PageHeader({
  breadcrumbs,
  icon: Icon,
  iconColor = 'text-purple-400',
  iconBgFrom = 'from-purple-600/20',
  iconBgTo = 'to-pink-600/20',
  iconBorderColor = 'border-purple-500/30',
  title,
  description,
  badge,
  markdownPath,
  markdownFilename,
}: PageHeaderProps) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-100 mb-8">
        {breadcrumbs.map((crumb, index) => (
          <span key={index} className="flex items-center gap-2">
            {index > 0 && <ArrowRight className="w-4 h-4" />}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-purple-400 transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-white">{crumb.label}</span>
            )}
          </span>
        ))}
      </div>

      {/* Header */}
      <div className="mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 bg-gradient-to-br ${iconBgFrom} ${iconBgTo} rounded-xl border ${iconBorderColor}`}>
              <Icon className={`w-8 h-8 ${iconColor}`} />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="heading-1">{title}</h1>
                {badge}
              </div>
              <p className="text-lg text-slate-100">{description}</p>
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
