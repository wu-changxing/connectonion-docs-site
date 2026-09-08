# 1.8.4a2 documentation checks

The final local production build passed the blog source/build and TypeScript
checks. ESLint completed with no errors and existing warnings. A headless Chromium
checked /releases and /blog/gmail-kept-the-body-and-changed-the-id at 1440px and
with iPhone 13 device emulation: expected text was present, each page had one H1,
and neither page overflowed horizontally. The release page includes the final
QuickConnect repair wording. Screenshots contain no account data.

Source: docs branch 34c13e5 plus the companion Markdown release-channel update.
