# Certifications — `tmdb.certification`

Access via `tmdb.certification` (instance of `CertificationEndpoint`).

Note: the property is `tmdb.certification` (singular), not `tmdb.certifications`.

## Methods

### `movies`

```typescript
tmdb.certification.movies(): Promise<Certifications>
```

Returns certification systems for movies, keyed by country code.

```typescript
const certs = await tmdb.certification.movies();
certs.certifications['US']; // Certification[]
// e.g. [{ certification: 'G', meaning: '...', order: 1 }, ...]
```

---

### `tv`

```typescript
tmdb.certification.tv(): Promise<Certifications>
```

Returns certification systems for TV shows, keyed by country code.

## Types

```typescript
interface Certification {
  certification: string; // e.g. "PG-13"
  meaning: string;
  order: number;         // sort order
}

interface Certifications {
  certifications: Record<string, Certification[]>;
}
```
