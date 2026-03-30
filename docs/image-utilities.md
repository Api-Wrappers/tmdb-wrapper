# Image Utilities

The package exports helpers for constructing TMDB image URLs.

```typescript
import {
  TMDB_IMAGE_BASE_URL,
  ImageSizes,
  ImageFormats,
  getFullImagePath,
  formImage,
} from '@api-wrappers/tmdb-wrapper';
```

## Constants

### `TMDB_IMAGE_BASE_URL`

```typescript
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
```

### `ImageSizes`

```typescript
const ImageSizes = {
  ORIGINAL: "original",
  W500:     "w500",
  W300:     "w300",
  W185:     "w185",
  W92:      "w92",
  H632:     "h632",
} as const;
```

Any valid TMDB size string can also be passed directly (e.g. `"w780"`, `"w1280"`).

### `ImageFormats`

```typescript
const ImageFormats = {
  JPG: "jpg",
  PNG: "png",
  SVG: "svg",
} as const;
```

## `getFullImagePath`

Constructs a full TMDB image URL from parts.

```typescript
function getFullImagePath(
  baseUrl: string,   // e.g. TMDB_IMAGE_BASE_URL or "https://image.tmdb.org/t/p/"
  fileSize: string,  // e.g. ImageSizes.W500 or "w780"
  imagePath: string, // e.g. "/abc123.jpg" or "/abc123"
  format?: string,   // optional: ImageFormats.JPG / "png" / "svg"
): string
```

**Behaviour:**
- If `imagePath` is already an absolute URL (`https://...`), it is returned unchanged.
- Leading/trailing slashes on `baseUrl`, `fileSize`, and `imagePath` are handled automatically.
- If `format` is provided, the file extension is replaced (or appended if none exists).
- If `format` is omitted, the original path extension is preserved.
- Returns `""` if `imagePath` is empty.

**Examples:**

```typescript
// Path without extension — add one via format
const url = getFullImagePath(
  TMDB_IMAGE_BASE_URL,
  ImageSizes.W500,
  '/wwemzKWzjKYJFfCeiB57q3r4Bcm',
  ImageFormats.JPG,
);
// "https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.jpg"

// Path already has extension — no format needed
const url2 = getFullImagePath(
  TMDB_IMAGE_BASE_URL,
  ImageSizes.W185,
  '/5XBzD5WuTyVQZeS4VI25z2moMeY.jpg',
);
// "https://image.tmdb.org/t/p/w185/5XBzD5WuTyVQZeS4VI25z2moMeY.jpg"

// Override extension
const png = getFullImagePath(
  TMDB_IMAGE_BASE_URL,
  ImageSizes.W500,
  '/5XBzD5WuTyVQZeS4VI25z2moMeY.jpg',
  ImageFormats.PNG,
);
// "https://image.tmdb.org/t/p/w500/5XBzD5WuTyVQZeS4VI25z2moMeY.png"
```

## `formImage`

Convenience wrapper for TMDB `Image` objects returned by API responses (e.g. from `tmdb.movies.images()`).

```typescript
function formImage(
  image: Image,         // TMDB Image object with a file_path property
  fileSize: ImageSize,  // one of the ImageSizes values
  format?: ImageFormat, // optional: one of the ImageFormats values
): string | undefined
```

Returns `undefined` if `image.file_path` is falsy.

**Examples:**

```typescript
const images = await tmdb.movies.images(550);
const poster = images.posters[0];

// Preserve original extension
const url = formImage(poster, ImageSizes.W500);
// e.g. "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"

// Force PNG output
const png = formImage(poster, ImageSizes.W500, ImageFormats.PNG);
// e.g. "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.png"
```

## `Image` Type

```typescript
interface Image {
  aspect_ratio: number;
  file_path: string;       // e.g. "/abc123.jpg"
  height: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
  width: number;
}
```
