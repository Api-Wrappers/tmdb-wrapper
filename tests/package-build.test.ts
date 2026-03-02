import { beforeAll, describe, expect, it } from "bun:test";
import { execSync } from "child_process";
import { createRequire } from "module";
import { existsSync, readFileSync } from "fs";
import path from "path";
import { pathToFileURL } from "url";

describe("Package Build", () => {
	beforeAll(() => {
		execSync("bun run build", {
			cwd: process.cwd(),
			stdio: "pipe",
		});
	});

	describe("Build Outputs", () => {
		it("builds the package successfully", () => {
			const distPath = path.join(process.cwd(), "dist");
			expect(existsSync(distPath)).toBe(true);
		});

		it("generates expected build outputs", () => {
			const distPath = path.join(process.cwd(), "dist");

			// Keep this list aligned to what your `dist/` actually contains.
			const expectedFiles = [
				"index.mjs",
				"index.cjs",
				"index.d.mts",
				"index.d.cts",
			];

			for (const file of expectedFiles) {
				const filePath = path.join(distPath, file);
				expect(existsSync(filePath)).toBe(true);
			}
		});

		it("emits declaration files that include the TMDB class", () => {
			const dtsMtsPath = path.join(process.cwd(), "dist", "index.d.mts");
			const dtsCtsPath = path.join(process.cwd(), "dist", "index.d.cts");

			const mts = readFileSync(dtsMtsPath, "utf-8");
			const cts = readFileSync(dtsCtsPath, "utf-8");

			expect(mts).toContain("TMDB");
			expect(cts).toContain("TMDB");
		});
	});

	describe("Built Entry Points Load", () => {
		it("loads built ESM entry (dist/index.mjs)", async () => {
			const fileUrl = pathToFileURL(
				path.join(process.cwd(), "dist", "index.mjs"),
			).href;

			const mod = await import(fileUrl);

			expect(mod.TMDB).toBeDefined();
			expect(typeof mod.TMDB).toBe("function");

			const client = new mod.TMDB("test-token");
			expect(client).toBeInstanceOf(mod.TMDB);
		});

		it("loads built CJS entry (dist/index.cjs)", () => {
			const require = createRequire(import.meta.url);
			const mod = require(path.join(process.cwd(), "dist", "index.cjs"));

			expect(mod.TMDB).toBeDefined();
			expect(typeof mod.TMDB).toBe("function");

			const client = new mod.TMDB("test-token");
			expect(client).toBeInstanceOf(mod.TMDB);
		});
	});

	describe("package.json Configuration", () => {
		it("has expected fields and exports pointing to dist outputs", () => {
			const packageJsonPath = path.join(process.cwd(), "package.json");
			const packageJson = JSON.parse(
				readFileSync(packageJsonPath, "utf-8"),
			);

			expect(packageJson.name).toBe("@tdanks2000/tmdb-wrapper");
			expect(packageJson.version).toBeDefined();
			expect(packageJson.description).toBeDefined();

			expect(packageJson.module).toBe("./dist/index.mjs");
			expect(packageJson.main).toBe("./dist/index.cjs");
			expect(packageJson.types).toBe("./dist/index.d.mts");

			expect(packageJson.exports).toBeDefined();
			expect(packageJson.exports["."]).toBeDefined();
			expect(packageJson.exports["."].import).toBe("./dist/index.mjs");
			expect(packageJson.exports["."].require).toBe("./dist/index.cjs");
			expect(packageJson.exports["."].types).toBe("./dist/index.d.mts");
		});

		it("has the build script configured", () => {
			const packageJsonPath = path.join(process.cwd(), "package.json");
			const packageJson = JSON.parse(
				readFileSync(packageJsonPath, "utf-8"),
			);

			expect(packageJson.scripts).toBeDefined();
			expect(packageJson.scripts.build).toBe("tsdown");
		});
	});
});
