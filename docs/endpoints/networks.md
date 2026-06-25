# Networks — `tmdb.networks`

Access via `tmdb.networks` (instance of `NetworksEndpoint`).

## Methods

### `details`

```typescript
tmdb.networks.details(id: number, request?: RequestConfig): Promise<NetworkDetails>
```

```typescript
const network = await tmdb.networks.details(213); // Netflix
network.name;
network.headquarters;
network.homepage;
network.origin_country;
```

---

### `alternativeNames`

```typescript
tmdb.networks.alternativeNames(
  id: number,
  request?: RequestConfig,
): Promise<AlternativeNames>
```

---

### `images`

```typescript
tmdb.networks.images(id: number, request?: RequestConfig): Promise<NetworkImages>
```

## Types

```typescript
interface NetworkDetails {
  headquarters: string;
  homepage: string;
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface NetworkImages {
  id: number;
  logos: Image[];
}
```
