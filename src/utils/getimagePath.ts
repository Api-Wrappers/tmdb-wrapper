import type { Image } from "../@types";

export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

export const ImageSizes = {
	ORIGINAL: "original",
	W500: "w500",
	W300: "w300",
	W185: "w185",
	W92: "w92",
	H632: "h632",
} as const;

export type ImageSize = (typeof ImageSizes)[keyof typeof ImageSizes];

export const ImageFormats = {
	JPG: "jpg",
	PNG: "png",
	SVG: "svg",
} as const;

export type ImageFormat = (typeof ImageFormats)[keyof typeof ImageFormats];

const isAbsoluteUrl = (value: string) => /^https?:\/\//i.test(value);

const normalizeBaseUrl = (baseUrl: string) =>
	baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

const normalizeSize = (size: string) => size.replace(/^\/+|\/+$/g, "");

const normalizePath = (path: string) =>
	path.startsWith("/") ? path : `/${path}`;

const setExtension = (path: string, format: string) => {
	const lastSlash = path.lastIndexOf("/");
	const lastDot = path.lastIndexOf(".");

	const hasExt = lastDot > lastSlash;
	if (!hasExt) return `${path}.${format}`;

	return `${path.slice(0, lastDot + 1)}${format}`;
};

/**
 * Constructs a TMDB image URL.
 *
 * - Keeps paths as-is unless `format` is provided (then it replaces/appends
 *   the extension safely using the last dot after the last slash).
 * - Handles leading/trailing slashes robustly.
 * - If `imagePath` is already an absolute URL, it is returned unchanged.
 */
export const getFullImagePath = (
	baseUrl: string,
	fileSize: string,
	imagePath: string,
	format?: string,
): string => {
	if (!imagePath) return "";
	if (isAbsoluteUrl(imagePath)) return imagePath;

	const base = normalizeBaseUrl(baseUrl);
	const size = normalizeSize(fileSize);

	let path = normalizePath(imagePath);
	if (format) path = setExtension(path, format);

	return `${base}${size}${path}`;
};

/**
 * Convenience helper for TMDB `Image` objects.
 */
export const formImage = (
	image: Image,
	fileSize: ImageSize,
	format?: ImageFormat,
): string | undefined => {
	const path = image?.file_path;
	if (!path) return undefined;

	return getFullImagePath(TMDB_IMAGE_BASE_URL, fileSize, path, format);
};
