import { describe, it, expect, beforeEach } from "bun:test";
import { TMDB } from "../src/index";
import { TMDB_ACCESS_TOKEN, TMDB_API_KEY } from "./mocks/constants";

describe("TMDB Client Instantiation", () => {
  describe("Client Creation", () => {
    it("should create TMDB client with access token string", () => {
      const tmdb = new TMDB(TMDB_ACCESS_TOKEN);

      expect(tmdb).toBeInstanceOf(TMDB);
      expect(tmdb.movies).toBeDefined();
      expect(tmdb.tvShows).toBeDefined();
      expect(tmdb.search).toBeDefined();
      expect(tmdb.configuration).toBeDefined();
      expect(tmdb.account).toBeDefined();
    });

    it("should create TMDB client with access token in config object", () => {
      const tmdb = new TMDB({ accessToken: TMDB_ACCESS_TOKEN });

      expect(tmdb).toBeInstanceOf(TMDB);
      expect(tmdb.movies).toBeDefined();
      expect(tmdb.tvShows).toBeDefined();
      expect(tmdb.search).toBeDefined();
      expect(tmdb.configuration).toBeDefined();
      expect(tmdb.account).toBeDefined();
    });

    it("should create TMDB client with API key in config object", () => {
      const tmdb = new TMDB({ apiKey: TMDB_API_KEY });

      expect(tmdb).toBeInstanceOf(TMDB);
      expect(tmdb.movies).toBeDefined();
      expect(tmdb.tvShows).toBeDefined();
      expect(tmdb.search).toBeDefined();
      expect(tmdb.configuration).toBeDefined();
      expect(tmdb.account).toBeDefined();
    });

    it("should create TMDB client with both API key and access token", () => {
      const tmdb = new TMDB({
        apiKey: TMDB_API_KEY,
        accessToken: TMDB_ACCESS_TOKEN,
      });

      expect(tmdb).toBeInstanceOf(TMDB);
      expect(tmdb.movies).toBeDefined();
      expect(tmdb.tvShows).toBeDefined();
      expect(tmdb.search).toBeDefined();
      expect(tmdb.configuration).toBeDefined();
      expect(tmdb.account).toBeDefined();
    });
  });

  describe("Client Properties", () => {
    let tmdb: TMDB;

    beforeEach(() => {
      tmdb = new TMDB({ apiKey: TMDB_API_KEY });
    });

    it("should have all endpoint properties defined", () => {
      const expectedEndpoints = [
        "account",
        "certification",
        "changes",
        "collections",
        "companies",
        "configuration",
        "credits",
        "discover",
        "find",
        "genre",
        "keywords",
        "movies",
        "networks",
        "people",
        "review",
        "search",
        "trending",
        "tvEpisodes",
        "tvSeasons",
        "tvShows",
        "watchProviders",
      ];

      expectedEndpoints.forEach((endpoint) => {
        expect(tmdb).toHaveProperty(endpoint);
        expect(tmdb[endpoint as keyof TMDB]).toBeDefined();
      });
    });

    it("should have proper endpoint types", () => {
      // Check that endpoints are not just undefined or null
      expect(typeof tmdb.movies).toBe("object");
      expect(typeof tmdb.tvShows).toBe("object");
      expect(typeof tmdb.search).toBe("object");
      expect(typeof tmdb.configuration).toBe("object");
      expect(typeof tmdb.account).toBe("object");
      expect(typeof tmdb.genre).toBe("object");
      expect(typeof tmdb.trending).toBe("object");
    });
  });

  describe("Error Handling", () => {
    it("should handle empty string as token", () => {
      expect(() => new TMDB("")).not.toThrow();
    });

    it("should handle empty config object", () => {
      expect(() => new TMDB({})).not.toThrow();
    });

    it("should handle undefined values in config", () => {
      expect(
        () =>
          new TMDB({
            apiKey: undefined,
            accessToken: undefined,
          })
      ).not.toThrow();
    });
  });
});
