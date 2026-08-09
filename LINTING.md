# Linting baseline

The site uses the supported ESLint flat configuration from Next.js 16. Run:

```bash
npm run lint
```

The `Quality` GitHub Actions workflow runs the same command together with a
clean install, dependency audit, type-check, and production build.

The migration exposed 635 errors that predate the flat-config setup. They are
not hidden globally. `eslint.config.mjs` scopes each temporary exception to the
exact legacy files and rules that already violated it, while the official
rules remain enabled for every other file.

When fixing a listed file, remove it from the matching baseline array. Do not
add a new file merely to make lint pass: new errors must satisfy the official
Next.js rules. Existing warnings remain visible and should be reduced in
ordinary cleanup work. The error baseline should only shrink.
