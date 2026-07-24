#!/usr/bin/env bash
set -euo pipefail

python3 - <<'PY'
import json
from pathlib import Path

package_path = Path('package.json')
package = json.loads(package_path.read_text())
package['exports'] = {
    '.': {
        'import': {'types': './dist/index.d.mts', 'default': './dist/index.mjs'},
        'require': {'types': './dist/index.d.cts', 'default': './dist/index.cjs'},
    },
    './package.json': './package.json',
}
package['sideEffects'] = False
package['engines'] = {'node': '>=22'}
package['scripts']['smoke:package'] = 'node ./scripts/smoke-package.mjs'
package['scripts']['verify'] = 'bun run check && bun run typecheck && bun run test && bun run build && bun pm pack --dry-run && bun run smoke:package'
package_path.write_text(json.dumps(package, indent=2) + '\n')

readme = Path('README.md')
readme.write_text(readme.read_text().replace(
    'a Node `>=16` engine target, with Bun used for local development and tests.',
    'compatibility checks for Node.js 22 and 24 plus Bun, with Bun used for local development and tests.',
))

docs = Path('docs/index.md')
docs_text = docs.read_text()
anchor = '| Create a client with a token or API key | [Authentication](./authentication.md) |\n'
if '[Runtime Support](./runtime-support.md)' not in docs_text:
    docs_text = docs_text.replace(anchor, anchor + '| Check supported runtimes and package formats | [Runtime Support](./runtime-support.md) |\n')
docs.write_text(docs_text)

tests = Path('tests/package-build.test.ts')
test_text = tests.read_text().replace(
    'expect(packageJson.exports["."].import).toBe("./dist/index.mjs");\n\t\t\texpect(packageJson.exports["."].require).toBe("./dist/index.cjs");\n\t\t\texpect(packageJson.exports["."].types).toBe("./dist/index.d.mts");',
    'expect(packageJson.exports["."].import.default).toBe("./dist/index.mjs");\n\t\t\texpect(packageJson.exports["."].import.types).toBe("./dist/index.d.mts");\n\t\t\texpect(packageJson.exports["."].require.default).toBe("./dist/index.cjs");\n\t\t\texpect(packageJson.exports["."].require.types).toBe("./dist/index.d.cts");\n\t\t\texpect(packageJson.exports["./package.json"]).toBe("./package.json");\n\t\t\texpect(packageJson.engines.node).toBe(">=22");\n\t\t\texpect(packageJson.sideEffects).toBe(false);',
)
tests.write_text(test_text)
PY

mkdir -p scripts docs .changeset .github/workflows

cat > scripts/smoke-package.mjs <<'EOF'
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const root = process.cwd();
const temporaryRoot = mkdtempSync(join(tmpdir(), "tmdb-wrapper-package-"));

try {
	const output = execFileSync("npm", ["pack", "--json", "--pack-destination", temporaryRoot], { cwd: root, encoding: "utf8" });
	const [{ filename }] = JSON.parse(output);
	const tarball = resolve(temporaryRoot, filename);
	const consumer = join(temporaryRoot, "consumer");
	mkdirSync(consumer);
	writeFileSync(join(consumer, "package.json"), JSON.stringify({ name: "tmdb-wrapper-smoke", private: true, type: "module" }));
	execFileSync("npm", ["install", "--ignore-scripts", tarball], { cwd: consumer, stdio: "inherit" });
	writeFileSync(join(consumer, "esm.mjs"), 'import { TMDB } from "@api-wrappers/tmdb-wrapper";\nconst client = new TMDB("test-token");\nif (!client.movies || !client.tvShows) throw new Error("ESM smoke failed");\n');
	writeFileSync(join(consumer, "cjs.cjs"), 'const { TMDB } = require("@api-wrappers/tmdb-wrapper");\nconst client = new TMDB("test-token");\nif (!client.movies || !client.tvShows) throw new Error("CJS smoke failed");\n');
	execFileSync(process.execPath, ["esm.mjs"], { cwd: consumer, stdio: "inherit" });
	execFileSync(process.execPath, ["cjs.cjs"], { cwd: consumer, stdio: "inherit" });
} finally {
	rmSync(temporaryRoot, { recursive: true, force: true });
}
EOF

cat > docs/runtime-support.md <<'EOF'
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
EOF

cat > .github/workflows/package-compatibility.yml <<'EOF'
name: Package Compatibility

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read

jobs:
  package:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: 24
          package-manager-cache: false
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
      - run: bun install --frozen-lockfile
      - run: bun run verify
      - run: mkdir -p package-artifact && npm pack --json --pack-destination package-artifact
      - uses: actions/upload-artifact@v4
        with:
          name: tmdb-wrapper-package
          path: package-artifact/*.tgz
          if-no-files-found: error

  node-consumer:
    needs: package
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        node-version: [22, 24]
    steps:
      - uses: actions/setup-node@v6
        with:
          node-version: ${{ matrix.node-version }}
          package-manager-cache: false
      - uses: actions/download-artifact@v4
        with:
          name: tmdb-wrapper-package
          path: package-artifact
      - name: Test ESM and CommonJS
        shell: bash
        run: |
          tarball=$(find package-artifact -name '*.tgz' -print -quit)
          mkdir consumer && cd consumer
          npm init -y >/dev/null
          npm install --ignore-scripts "../$tarball"
          printf '%s\n' 'import { TMDB } from "@api-wrappers/tmdb-wrapper";' 'const client = new TMDB("test-token");' 'if (!client.movies) throw new Error("ESM consumer failed");' > esm.mjs
          printf '%s\n' 'const { TMDB } = require("@api-wrappers/tmdb-wrapper");' 'const client = new TMDB("test-token");' 'if (!client.movies) throw new Error("CJS consumer failed");' > cjs.cjs
          node esm.mjs
          node cjs.cjs

  bun-consumer:
    needs: package
    runs-on: ubuntu-latest
    steps:
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
      - uses: actions/download-artifact@v4
        with:
          name: tmdb-wrapper-package
          path: package-artifact
      - name: Test Bun
        shell: bash
        run: |
          tarball=$(find package-artifact -name '*.tgz' -print -quit)
          mkdir consumer && cd consumer
          bun init -y >/dev/null
          bun add "../$tarball"
          printf '%s\n' 'import { TMDB } from "@api-wrappers/tmdb-wrapper";' 'const client = new TMDB("test-token");' 'if (!client.movies) throw new Error("Bun consumer failed");' > smoke.ts
          bun run smoke.ts
EOF

cat > .github/workflows/ci.yml <<'EOF'
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: 24
          package-manager-cache: false
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
      - run: bun install --frozen-lockfile
      - name: Lint
        run: bun run check
      - name: Typecheck
        run: bun run typecheck
      - name: Run tests
        run: bun run test
      - name: Build
        run: bun run build
      - name: Package smoke test
        run: bun run smoke:package
EOF

cat > .changeset/clean-packages-runtime.md <<'EOF'
---
"@api-wrappers/tmdb-wrapper": major
---

Require Node.js 22 or newer, add packed-package compatibility tests for Node.js and Bun, and correct conditional ESM/CommonJS declaration exports.
EOF
