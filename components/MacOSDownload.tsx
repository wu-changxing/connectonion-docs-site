'use client'

import { FaApple, FaDownload } from 'react-icons/fa'
import { HiOutlineSparkles, HiOutlineCog, HiOutlineChartBar, HiOutlineGlobeAlt } from 'react-icons/hi2'

export function MacOSDownload() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-purple-900/10 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl">
              <FaApple className="w-12 h-12 text-purple-400" />
            </div>
          </div>
          <h2 className="heading-2 mb-4">
            OpenOnion for macOS
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Native menu bar app for managing your AI agents. Beautiful, fast, and always one click away.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="p-6 bg-gray-800/50 border border-purple-500/20 rounded-xl hover:border-purple-500/40 transition-all">
            <HiOutlineSparkles className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Native Design</h3>
            <p className="text-sm text-slate-400">
              Beautiful polished UI following Apple HIG. Feels right at home on macOS.
            </p>
          </div>

          <div className="p-6 bg-gray-800/50 border border-blue-500/20 rounded-xl hover:border-blue-500/40 transition-all">
            <HiOutlineChartBar className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Live Stats</h3>
            <p className="text-sm text-slate-400">
              Track uptime, requests, and status in real-time with elegant stats card.
            </p>
          </div>

          <div className="p-6 bg-gray-800/50 border border-purple-500/20 rounded-xl hover:border-purple-500/40 transition-all">
            <HiOutlineCog className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Full Settings</h3>
            <p className="text-sm text-slate-400">
              Configure models, keys, and preferences through native tabbed interface.
            </p>
          </div>

          <div className="p-6 bg-gray-800/50 border border-blue-500/20 rounded-xl hover:border-blue-500/40 transition-all">
            <HiOutlineGlobeAlt className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Quick Access</h3>
            <p className="text-sm text-slate-400">
              Open chat, view logs, and control agents directly from menu bar.
            </p>
          </div>
        </div>

        {/* Download CTA */}
        <div className="text-center p-8 bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-2xl">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
            Download for macOS
          </h3>
          <p className="text-slate-400 mb-6">
            Fully code-signed and notarized • macOS 12+ • Universal Binary
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://github.com/openonion/co-menubar/releases/latest/download/OOMenuBar.app.zip"
              className="btn btn-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <FaDownload className="w-4 h-4" />
              <span>Download Latest</span>
            </a>

            <a
              href="https://github.com/openonion/co-menubar/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary inline-flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              View All Releases
            </a>
          </div>

          <div className="mt-6 text-xs text-slate-500">
            v0.7.9 • Intel & Apple Silicon
          </div>
        </div>
      </div>
    </section>
  )
}
