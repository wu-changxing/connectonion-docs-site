/**
 * The version this site advertises.
 *
 * Not a source of truth — a copy, in a different repo from the one that ships.
 * It said 1.4.0 for the whole 1.5.0 cycle, and 1.5.5 while PyPI served 1.5.11,
 * because calling a copy "the single source of truth" is what stops anyone
 * checking it against the original.
 *
 * connectonion's tests/unit/test_the_version_agrees_with_itself.py reads this
 * file and fails when it disagrees with the package being released.
 */
export const VERSION = '1.5.19'
