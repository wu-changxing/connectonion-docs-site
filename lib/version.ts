/**
 * The public package channels this site advertises.
 *
 * These are copies in a different repository from the package that ships, so
 * connectonion's test_the_version_agrees_with_itself.py checks the matching
 * channel during a release. Preview publication must never replace the stable
 * version shown on the homepage or in structured metadata.
 */
export const STABLE_VERSION = '1.8.4'
// 1.8.5a1 is an opt-in preview of a permission-policy change: an unattended
// agent could not run `head`, and an explicit grant was being ignored. Stable
// stays 1.8.4 and nothing is currently between a preview and stable.
export const PREVIEW_VERSION: string | null = '1.8.5a1'
export const STABILIZING_VERSION: string | null = null

// Product pages advertise the stable channel. Preview releases remain opt-in.
export const VERSION = STABLE_VERSION
