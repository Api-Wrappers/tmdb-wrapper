/**
 * Utility method to construct full url for image
 * based on configuration
 *
 * https://developers.themoviedb.org/3/getting-started/images
 * @param {string} baseUrl base image url (e.g., 'https://image.tmdb.org/t/p/')
 * @param {string} fileSize file size (e.g., 'original', 'w500')
 * @param {string} imagePath raw image path
 * @param {string} format override image format (e.g., 'svg', 'png', 'jpg')
 * @returns {string} The complete image URL
 */
export const getFullImagePath = (
	baseUrl: string,
	fileSize: string,
	imagePath: string,
	format?: string,
): string => {
	if (!imagePath) return "";

	// Handle case where imagePath doesn't have an extension
	const hasExtension = imagePath.includes(".");

	if (hasExtension) {
		const imagePathArr = imagePath.split(".");
		const imageFormat = format || imagePathArr[1];
		return `${baseUrl}${fileSize}${imagePathArr[0]}.${imageFormat}`;
	}
	// If no extension in path, use provided format or default to jpg
	const imageFormat = format || "jpg";
	return `${baseUrl}${fileSize}${imagePath}.${imageFormat}`;
};

/**
 * Common image sizes available in TMDB
 */
export const ImageSizes = {
	ORIGINAL: "original",
	W500: "w500",
	W300: "w300",
	W185: "w185",
	W92: "w92",
	H632: "h632",
};

/**
 * Image formats supported by TMDB
 */
export const ImageFormats = {
	JPG: "jpg",
	PNG: "png",
	SVG: "svg",
};
