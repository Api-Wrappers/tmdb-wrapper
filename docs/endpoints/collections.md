# Collections — `tmdb.collections`

Access via `tmdb.collections` (instance of `CollectionsEndpoint`).

## Methods

### `details`

```typescript
tmdb.collections.details(
  id: number,
  options?: { language?: string },
  request?: RequestConfig,
): Promise<DetailedCollection>
```

```typescript
const collection = await tmdb.collections.details(10); // Star Wars collection
collection.name;
collection.overview;
collection.parts; // Movie[]
```

---

### `images`

```typescript
tmdb.collections.images(
  id: number,
  options?: { language?: string; include_image_language?: string[] },
  request?: RequestConfig,
): Promise<ImageCollection>
```

---

### `translations`

```typescript
tmdb.collections.translations(
  id: number,
  options?: { language?: string },
  request?: RequestConfig,
): Promise<Translations>
```
