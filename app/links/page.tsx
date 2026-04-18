'use client'

import { useState, useEffect } from 'react'
import { HiOutlineCube, HiOutlineBookOpen, HiOutlineEnvelope, HiOutlineGlobeAlt, HiOutlineArrowTopRightOnSquare, HiOutlineClipboard, HiOutlineCheck, HiOutlineShare, HiOutlineLink as LinkIcon, HiOutlineHeart, HiOutlineSparkles, HiOutlineCodeBracket, HiOutlineDocumentText, HiOutlineArrowRight, HiOutlineQrCode } from 'react-icons/hi2'
import {
  FaRocket, FaComments, FaBook, FaMobile, FaHandshake,
  FaGithub, FaDiscord, FaTwitter, FaYoutube, FaLinkedin,
  FaInstagram, FaTiktok, FaUsers
} from 'react-icons/fa'
import Link from 'next/link'
import { ContentNavigation } from '../../components/ContentNavigation'
import { CopyMarkdownButton } from '../../components/CopyMarkdownButton'
import QRCode from 'qrcode'

interface LinkItem {
  title: string
  description?: string
  url: string
  icon: React.ElementType
  color: string
  bgColor: string
  borderColor: string
  external?: boolean
  available?: boolean
}

interface LinkSection {
  title: string | React.ReactElement
  description?: string
  links: LinkItem[]
}

export default function LinksPage() {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [showQR, setShowQR] = useState(false)
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('')

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const url = 'https://docs.connectonion.com/links'
        const dataUrl = await QRCode.toDataURL(url, {
          width: 256,
          margin: 1,
          color: {
            dark: '#6B46C1',
            light: '#FFFFFF'
          },
          errorCorrectionLevel: 'H',
        })
        setQrCodeDataUrl(dataUrl)
      } catch (err) {
        console.error('Error generating QR code:', err)
      }
    }
    
    generateQRCode()
  }, [])

  const handleCopyLink = (url: string, title: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(title)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  const handleSharePage = () => {
    const url = window.location.href
    if (navigator.share) {
      navigator.share({
        title: 'ConnectOnion - All Links',
        text: 'Check out ConnectOnion - Build AI agents with simple, powerful Python code',
        url: url
      })
    } else {
      handleCopyLink(url, 'page')
    }
  }

  const linkSections: LinkSection[] = [
    {
      title: (
        <span className="flex items-center gap-2">
          <FaRocket className="inline-flex w-5 h-5 text-gray-500" />
          Core Platform
        </span>
      ),
      description: 'Essential ConnectOnion resources',
      links: [
        {
          title: 'GitHub Repository',
          description: 'Source code, issues, and contributions',
          url: 'https://github.com/wu-changxing/connectonion',
          icon: FaGithub,
          color: 'text-gray-500',
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-400/30',
          external: true,
          available: true
        },
        {
          title: 'PyPI Package',
          description: 'Install via pip',
          url: 'https://pypi.org/project/connectonion/',
          icon: HiOutlineCube,
          color: 'text-gray-500',
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-400/30',
          external: true,
          available: true
        },
        {
          title: 'Documentation',
          description: 'Complete guides and API reference',
          url: 'https://docs.connectonion.com',
          icon: HiOutlineBookOpen,
          color: 'text-gray-500',
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-400/30',
          external: true,
          available: true
        }
      ]
    },
    {
      title: (
        <span className="flex items-center gap-2">
          <FaComments className="inline-flex w-5 h-5 text-green-400" />
          Community
        </span>
      ),
      description: 'Join our growing community',
      links: [
        {
          title: 'Discord Server',
          description: 'Chat with the community',
          url: 'https://discord.gg/4xfD9k8AUF',
          icon: FaDiscord,
          color: 'text-gray-500',
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-400/30',
          external: true,
          available: true
        },
        {
          title: 'GitHub Discussions',
          description: 'Ask questions and share ideas',
          url: 'https://github.com/wu-changxing/connectonion/discussions',
          icon: FaUsers,
          color: 'text-gray-500',
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-400/30',
          external: true,
          available: true
        }
      ]
    },
    {
      title: (
        <span className="flex items-center gap-2">
          <FaMobile className="inline-flex w-5 h-5 text-gray-500" />
          Social Media
        </span>
      ),
      description: 'Follow us for updates and content',
      links: [
        {
          title: 'Twitter / X',
          description: 'Latest news and updates',
          url: 'https://x.com/ConnectOnionAI',
          icon: FaTwitter,
          color: 'text-gray-500',
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-400/30',
          external: true,
          available: true
        },
        {
          title: 'YouTube',
          description: 'Video tutorials and demos',
          url: 'https://www.youtube.com/@openonionai',
          icon: FaYoutube,
          color: 'text-gray-500',
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-400/30',
          external: true,
          available: true
        },
        {
          title: 'LinkedIn',
          description: 'Professional updates',
          url: 'https://www.linkedin.com/company/openonion/',
          icon: FaLinkedin,
          color: 'text-gray-500',
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-400/30',
          external: true,
          available: true
        },
        {
          title: 'Instagram',
          description: 'Behind the scenes',
          url: 'https://www.instagram.com/openonionai/',
          icon: FaInstagram,
          color: 'text-gray-500',
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-400/30',
          external: true,
          available: true
        },
        {
          title: 'TikTok',
          description: 'Quick tips and demos',
          url: 'https://www.tiktok.com/@closeonion',
          icon: FaTiktok,
          color: 'text-gray-500',
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-400/30',
          external: true,
          available: true
        }
      ]
    },
    {
      title: (
        <span className="flex items-center gap-2">
          <FaBook className="inline-flex w-5 h-5 text-gray-500" />
          Resources
        </span>
      ),
      description: 'Learn and explore',
      links: [
        {
          title: 'Blog',
          description: 'Design decisions and insights',
          url: 'https://docs.connectonion.com/blog',
          icon: HiOutlineDocumentText,
          color: 'text-gray-500',
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-400/30',
          external: true,
          available: true
        },
        {
          title: 'Examples',
          description: 'Sample projects and tutorials',
          url: 'https://docs.connectonion.com/examples',
          icon: HiOutlineCodeBracket,
          color: 'text-gray-500',
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-400/30',
          external: true,
          available: true
        },
        {
          title: 'API Reference',
          description: 'Technical documentation',
          url: 'https://docs.connectonion.com/tools',
          icon: HiOutlineDocumentText,
          color: 'text-gray-500',
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-400/30',
          external: true,
          available: true
        }
      ]
    },
    {
      title: (
        <span className="flex items-center gap-2">
          <FaHandshake className="inline-flex w-5 h-5 text-green-400" />
          Support
        </span>
      ),
      description: 'Get help and contribute',
      links: [
        {
          title: 'Report Issues',
          description: 'Bug reports and feature requests',
          url: 'https://github.com/wu-changxing/connectonion/issues',
          icon: HiOutlineSparkles,
          color: 'text-gray-500',
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-400/30',
          external: true,
          available: true
        },
        {
          title: 'Email Contact',
          description: 'Reach out directly',
          url: 'mailto:contact@connectonion.com',
          icon: HiOutlineEnvelope,
          color: 'text-gray-700',
          bgColor: 'bg-gray-800/30',
          borderColor: 'border-gray-600/30',
          external: true,
          available: false
        }
      ]
    }
  ]

  const LinkCard = ({ link }: { link: LinkItem }) => {
    const Icon = link.icon
    const isClickable = link.available && link.url !== '#'
    
    const cardClasses = "relative group w-full p-6 rounded-2xl transition-all duration-300 " +
      link.bgColor + " " + link.borderColor + " border-2 backdrop-blur-sm " +
      (isClickable ? "hover:bg-gray-800 hover:border-gray-400 hover:shadow-xl cursor-pointer" : "opacity-50 cursor-not-allowed")

    const content = (
      <div className={cardClasses}>
        {!link.available && (
          <div className="absolute -top-2 -right-2 px-3 py-1 bg-gray-800 border border-gray-600 rounded-full flex items-center gap-1">
            <span className="text-xs font-medium text-gray-700">🔒 Coming Soon</span>
          </div>
        )}
        
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gray-900/80 backdrop-blur-sm border border-gray-700/50">
            <Icon className={"w-6 h-6 " + link.color} />
          </div>
          <div className="flex-1">
            <h3 className="heading-4 text-white mb-1 flex items-center gap-2">
              {link.title}
              {link.external && isClickable && (
                <>
                  <HiOutlineArrowTopRightOnSquare className="w-4 h-4 text-gray-700" />
                  <span className="sr-only">opens in new tab</span>
                </>
              )}
            </h3>
            {link.description && (
              <p className="text-sm text-gray-700">{link.description}</p>
            )}
          </div>
        </div>
        
        {isClickable && (
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleCopyLink(link.url, link.title)
            }}
            className="absolute top-4 right-4 p-2 min-w-[44px] min-h-[44px] rounded-lg bg-gray-50 border border-gray-200/50 hover:bg-gray-900/80 hover:border-gray-400/50 focus:outline-none focus:ring-2 focus:ring-gray-400/50 transition-all flex items-center justify-center"
            aria-label={"Copy " + link.title + " link"}
            title={"Copy " + link.title + " link"}
          >
            {copiedUrl === link.title ? (
              <HiOutlineCheck className="w-4 h-4 text-green-400" />
            ) : (
              <HiOutlineClipboard className="w-4 h-4 text-gray-700 group-hover:text-white" />
            )}
          </button>
        )}
      </div>
    )
    
    if (!isClickable) {
      return content
    }
    
    if (link.external) {
      return (
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {content}
        </a>
      )
    }
    
    return (
      <Link href={link.url} className="block">
        {content}
      </Link>
    )
  }

  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-gray-700 mb-8">
          <Link href="/" className="hover:text-gray-500 transition-colors">
            Docs
          </Link>
          <HiOutlineArrowRight className="w-4 h-4" />
          <span className="text-gray-900">Links</span>
        </div>

        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-gray-700/20 to-pink-600/20 rounded-xl border border-gray-200">
                <LinkIcon className="w-8 h-8 text-gray-500" />
              </div>
              <div>
                <h1 className="heading-1">ConnectOnion Links</h1>
                <p className="text-lg text-gray-700">
                  All our platforms and resources in one place. Build AI agents with simple, powerful Python code.
                </p>
              </div>
            </div>
            <CopyMarkdownButton markdownPath="/links.md" filename="links.md" className="flex-shrink-0" />
          </div>
        </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleSharePage}
              className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-800 text-white rounded-lg transition-colors font-medium min-h-[44px]"
              aria-label="Share this page via system share menu or copy link"
            >
              <HiOutlineShare className="w-5 h-5" />
              Share Page
            </button>
            <button
              onClick={() => setShowQR(!showQR)}
              className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium min-h-[44px]"
              aria-expanded={showQR}
              aria-label={showQR ? "Hide QR code" : "Show QR code for this page"}
            >
              <HiOutlineQrCode className="w-5 h-5" />
              QR Code
            </button>
          </div>
          
          {showQR && qrCodeDataUrl && (
            <div className="mt-8 inline-block animate-fadeIn">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-pink-600 to-blue-600 rounded-3xl blur-xl opacity-60 animate-pulse"></div>
                
                <div className="relative bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-1 rounded-3xl shadow-2xl">
                  <div className="bg-white rounded-2xl p-6">
                    <div className="relative">
                      <img 
                        src={qrCodeDataUrl}
                        alt="QR Code for ConnectOnion Links" 
                        className="w-64 h-64 rounded-lg"
                      />
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white rounded-xl p-2 shadow-lg">
                          <img
                            src="/onion-logo.png"
                            alt="ConnectOnion logo overlay on QR code"
                            width={48}
                            height={48}
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <HiOutlineQrCode className="w-5 h-5 text-gray-700" />
                        <p className="text-lg font-semibold text-gray-800">Scan to Connect</p>
                      </div>
                      <p className="text-sm text-gray-600">
                        docs.connectonion.com/links
                      </p>
                      <div className="mt-3 flex items-center justify-center gap-3">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <HiOutlineSparkles className="w-3 h-3" />
                          <span>Quick Access</span>
                        </div>
                        <div className="text-gray-700">•</div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <LinkIcon className="w-3 h-3" />
                          <span>All Links</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-gray-300 rounded-tl-lg"></div>
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-gray-300 rounded-tr-lg"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-gray-300 rounded-bl-lg"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-gray-300 rounded-br-lg"></div>
              </div>
            </div>
          )}
        
        <div className="space-y-12 mt-12">
          {linkSections.map((section, idx) => (
            <div key={idx}>
              <div className="mb-6">
                <h2 className="heading-2">
                  {section.title}
                </h2>
                {section.description && (
                  <p className="text-base text-gray-700">{section.description}</p>
                )}
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.links.map((link, linkIdx) => (
                  <LinkCard key={linkIdx} link={link} />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-700 mb-4">
            ConnectOnion is open source and community-driven
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>Made with</span>
            <HiOutlineHeart className="w-4 h-4 text-red-500 fill-current" />
            <span>by the ConnectOnion team</span>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <HiOutlineSparkles className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">
              Add your link? Contact us on Discord!
            </span>
          </div>
        </div>
        
        <ContentNavigation />
      </div>
    </div>
  )
}