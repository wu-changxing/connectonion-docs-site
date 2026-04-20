'use client'

import { FaApple, FaDownload } from 'react-icons/fa'
import { HiOutlineSparkles, HiOutlineCog, HiOutlineChartBar, HiOutlineGlobeAlt } from 'react-icons/hi2'

export function MacOSDownload() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-50 border-y border-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gray-100 rounded-2xl">
              <FaApple className="w-10 h-10 text-gray-700" />
            </div>
          </div>
          <h2 className="heading-2 mb-3">OpenOnion for macOS</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Native menu bar app for managing your AI agents. Beautiful, fast, and always one click away.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="p-5 bg-white border border-gray-200 rounded-xl card-interactive">
            <HiOutlineSparkles className="w-7 h-7 text-green-600 mb-3" />
            <h3 className="text-base font-semibold text-gray-900 mb-1">Native Design</h3>
            <p className="text-sm text-gray-500">Beautiful polished UI following Apple HIG.</p>
          </div>

          <div className="p-5 bg-white border border-gray-200 rounded-xl card-interactive">
            <HiOutlineChartBar className="w-7 h-7 text-green-600 mb-3" />
            <h3 className="text-base font-semibold text-gray-900 mb-1">Live Stats</h3>
            <p className="text-sm text-gray-500">Track uptime and requests in real-time.</p>
          </div>

          <div className="p-5 bg-white border border-gray-200 rounded-xl card-interactive">
            <HiOutlineCog className="w-7 h-7 text-green-600 mb-3" />
            <h3 className="text-base font-semibold text-gray-900 mb-1">Full Settings</h3>
            <p className="text-sm text-gray-500">Configure models, keys, and preferences.</p>
          </div>

          <div className="p-5 bg-white border border-gray-200 rounded-xl card-interactive">
            <HiOutlineGlobeAlt className="w-7 h-7 text-green-600 mb-3" />
            <h3 className="text-base font-semibold text-gray-900 mb-1">Quick Access</h3>
            <p className="text-sm text-gray-500">Open chat and control agents from menu bar.</p>
          </div>
        </div>

        {/* Download CTA */}
        <div className="text-center p-8 bg-white border border-gray-200 rounded-2xl">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Download for macOS
          </h3>
          <p className="text-gray-500 mb-6 text-sm">
            Fully code-signed and notarized · macOS 12+ · Universal Binary
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

          <div className="mt-5 text-xs text-gray-500">
            v0.7.9 · Intel & Apple Silicon
          </div>
        </div>
      </div>
    </section>
  )
}
