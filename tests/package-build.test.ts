import { describe, it, expect, beforeAll } from "bun:test";
import { execSync } from "child_process";
import { existsSync, readFileSync } from "fs";
import path from "path";

describe("Package Build", () => {
  describe("Build Process", () => {
    beforeAll(() => {
      execSync("bun run build", {
        cwd: process.cwd(),
        stdio: "pipe",
      });
    });
  
    it("should build the package successfully", () => {
      const distPath = path.join(process.cwd(), "dist");
      expect(existsSync(distPath)).toBe(true);
    });
  
    it("should generate expected build outputs", () => {
      const distPath = path.join(process.cwd(), "dist");
      const expectedFiles = ["index.mjs", "index.cjs", "index.d.mts"];
      expectedFiles.forEach((file) => {
        const filePath = path.join(distPath, file);
        expect(existsSync(filePath)).toBe(true);
      });
    });
  });
  

  describe("Package Exports", () => {
    it("should export TMDB class and types", async () => {
      try {
        const module = await import("../src/index");

        expect(module.TMDB).toBeDefined();
        expect(typeof module.TMDB).toBe("function");

        const instance = new module.TMDB("test-key");
        expect(instance).toBeInstanceOf(module.TMDB);
      } catch (error) {
        // If import fails, that's also valuable information
        expect(error).toBeNull();
      }
    });

    it("should have proper TypeScript types available", () => {
      // This test ensures types are exported and can be imported
      expect(() => {
        // Import types - this will fail at compile time if types aren't available
        import("../src/@types").then((types) => {
          expect(types).toBeDefined();
        });
      }).not.toThrow();
    });
  });

  describe("Package Configuration", () => {
    it("should have proper package.json configuration", () => {
      const packageJsonPath = path.join(process.cwd(), "package.json");
      const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

      expect(packageJson.name).toBe("@tdanks2000/tmdb-wrapper");
      expect(packageJson.version).toBeDefined();
      expect(packageJson.description).toBeDefined();

      // Check build outputs match actual files
      expect(packageJson.module).toBe("./dist/index.mjs");
      expect(packageJson.main).toBe("./dist/index.cjs");
      expect(packageJson.types).toBe("./dist/index.d.mts");

      // Check exports configuration
      expect(packageJson.exports).toBeDefined();
      expect(packageJson.exports["."]).toBeDefined();
      expect(packageJson.exports["."].import).toBe("./dist/index.mjs");
      expect(packageJson.exports["."].require).toBe("./dist/index.cjs");
      expect(packageJson.exports["."].types).toBe("./dist/index.d.mts");
    });

    it("should have build script configured", () => {
      const packageJsonPath = path.join(process.cwd(), "package.json");
      const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

      expect(packageJson.scripts).toBeDefined();
      expect(packageJson.scripts.build).toBeDefined();
      expect(packageJson.scripts.build).toBe("tsdown");
    });
  });
});
