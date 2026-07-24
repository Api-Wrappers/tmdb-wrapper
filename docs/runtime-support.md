# Runtime Support

`@api-wrappers/tmdb-wrapper` ships ESM, CommonJS, and TypeScript declaration entry points.

## Supported runtimes

The package supports Node.js 22 and Node.js 24, plus current Bun releases. CI installs the packed npm tarball into clean consumer projects and verifies ESM imports, CommonJS `require`, and Bun imports.

Older Node.js releases are not supported. They are end-of-life and may lack runtime APIs required by the default HTTP transport.

## Package formats

```typescript
import { TMDB } from "@api-wrappers/tmdb-wrapper";
```

```javascript
const { TMDB } = require("@api-wrappers/tmdb-wrapper");
```

The package also exports its own `package.json` for tooling that needs package metadata.
