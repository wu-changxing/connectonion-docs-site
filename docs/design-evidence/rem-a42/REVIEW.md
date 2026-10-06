# a42 release card review

Headless Chrome against the production build, 100% zoom. The [390×844 phone](releases-phone.png) and [1440×900 desktop](releases-desktop.png) show the preview card with its exact install pin and the retained-discovery behavior. Neither viewport has horizontal document overflow. The matching public package and GitHub Release are required before this branch deploys.

`npm run lint`, `npm run test:blog`, `npm run build`, and `npm run test:blog:build` passed. The inherited production dependency audit passed after the source-map-js update.
