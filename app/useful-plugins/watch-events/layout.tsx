import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'watch_events — ConnectOnion',
  description: 'Deliver fresh events to a running Agent at the next iteration boundary.',
  alternates: { canonical: 'https://docs.connectonion.com/useful-plugins/watch-events' },
  openGraph: { url: 'https://docs.connectonion.com/useful-plugins/watch-events' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
