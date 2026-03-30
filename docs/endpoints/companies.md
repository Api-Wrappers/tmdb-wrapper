# Companies — `tmdb.companies`

Access via `tmdb.companies` (instance of `CompaniesEndpoint`).

## Methods

### `details`

```typescript
tmdb.companies.details(id: number): Promise<CompanyDetails>
```

```typescript
const company = await tmdb.companies.details(1); // Lucasfilm
company.name;
company.headquarters;
company.homepage;
company.origin_country;
company.parent_company;
```

---

### `alternativeNames`

```typescript
tmdb.companies.alternativeNames(id: number): Promise<AlternativeNames>
```

---

### `images`

```typescript
tmdb.companies.images(id: number): Promise<CompanyImages>
```

## Types

```typescript
interface CompanyDetails {
  description: string;
  headquarters: string;
  homepage: string;
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
  parent_company: Company | null;
}
```
