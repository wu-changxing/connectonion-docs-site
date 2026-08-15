/**
 * The public package channels this site advertises.
 *
 * These are copies in a different repository from the package that ships, so
 * connectonion's test_the_version_agrees_with_itself.py checks the matching
 * channel during a release. Preview publication must never replace the stable
 * version shown on the homepage or in structured metadata.
 */
export const STABLE_VERSION = '1.6.9'
export const PREVIEW_VERSION: string | null = '1.7.0a6'

// Product pages advertise the stable channel. Preview releases remain opt-in.
export const VERSION = STABLE_VERSION
