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
