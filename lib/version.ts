/**
 * The public package channels this site advertises.
 *
 * These are copies in a different repository from the package that ships, so
 * connectonion's test_the_version_agrees_with_itself.py checks the matching
 * channel during a release. Preview publication must never replace the stable
 * version shown on the homepage or in structured metadata.
 */
export const STABLE_VERSION = '1.8.3'
export const PREVIEW_VERSION: string | null = null
// 1.7.0 finished stabilizing and became the stable channel; nothing is
// currently between a preview and stable.
export const STABILIZING_VERSION: string | null = null

// Product pages advertise the stable channel. Preview releases remain opt-in.
export const VERSION = STABLE_VERSION
