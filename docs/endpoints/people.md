# People — `tmdb.people`

Access via `tmdb.people` (instance of `PeopleEndpoint`).

## Methods

### `details`

```typescript
tmdb.people.details(
  id: number,
  appendToResponse?: AppendToResponsePersonKey[],
  language?: string,
  request?: RequestConfig,
): Promise<PersonDetails>
```

```typescript
const person = await tmdb.people.details(287); // Brad Pitt
person.name; person.biography; person.birthday;
```

**`AppendToResponsePersonKey` values:** `"movie_credits"`, `"tv_credits"`, `"combined_credits"`, `"external_ids"`, `"images"`, `"tagged_images"`, `"translations"`, `"changes"`

---

### `changes`

```typescript
tmdb.people.changes(
  id: number,
  options?: { page?: number; start_date?: string; end_date?: string },
  request?: RequestConfig,
): Promise<Changes<PersonChangeValue>>
```

---

### `movieCredits`

```typescript
tmdb.people.movieCredits(
  id: number,
  options?: { language?: string },
  request?: RequestConfig,
): Promise<PersonMovieCredit>
```

---

### `tvShowCredits`

```typescript
tmdb.people.tvShowCredits(
  id: number,
  options?: { language?: string },
  request?: RequestConfig,
): Promise<PersonTvShowCredit>
```

---

### `combinedCredits`

```typescript
tmdb.people.combinedCredits(
  id: number,
  options?: { language?: string },
  request?: RequestConfig,
): Promise<PersonCombinedCredits>
```

---

### `externalId`

```typescript
tmdb.people.externalId(
  id: number,
  request?: RequestConfig,
): Promise<ExternalIds>
```

Note: the method name is `externalId` (singular).

---

### `images`

```typescript
tmdb.people.images(
  id: number,
  request?: RequestConfig,
): Promise<PeopleImages>
```

---

### `taggedImages`

```typescript
tmdb.people.taggedImages(
  id: number,
  options?: { page?: number },
  request?: RequestConfig,
): Promise<TaggedImages>
```

---

### `translation`

```typescript
tmdb.people.translation(
  id: number,
  request?: RequestConfig,
): Promise<PersonTranslations>
```

Note: the method name is `translation` (singular).

---

### `latest`

```typescript
tmdb.people.latest(request?: RequestConfig): Promise<PersonDetails>
```

---

### `popular`

```typescript
tmdb.people.popular(
  options?: { language?: string; page?: number },
  request?: RequestConfig,
): Promise<PopularPersons>
```
