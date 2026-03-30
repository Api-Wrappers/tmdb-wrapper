# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, **please do not open a public issue.** Instead, report it privately by emailing the maintainers or using [GitHub's private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing/privately-reporting-a-security-vulnerability).

Please include:
- A description of the vulnerability
- Steps to reproduce
- Potential impact

We will acknowledge your report within 48 hours and aim to release a fix within 14 days for confirmed vulnerabilities.

## API Keys and Tokens

Never commit your TMDB API key or access token to source control. Use environment variables:

```typescript
const tmdb = new TMDB(process.env.TMDB_ACCESS_TOKEN!);
```
