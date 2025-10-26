import { type CollectionEntry, getCollection } from "astro:content";

import { locales } from "@/config/siteSettings.json";
import { filterCollectionByLanguage, removeLocaleFromSlug } from "@/js/localeUtils";
import { slugify } from "@/js/textUtils";

// --------------------------------------------------------
/**
 * * get all blog posts in a formatted array
 * @param lang: string (optional) - language to filter by (matching a locale in i18nUtils.ts)
 * @returns all blog posts, filtered for drafts, sorted by date, future posts removed, locale removed from slug, and filtered by language if passed
 *
 * ## Examples
 *
 * ### If not using i18n features
 * ```ts
 * const posts = await getAllPosts();
 * ```
 *
 * ### If using i18n features
 * ```ts
 * const posts = await getAllPosts("en");
 * ```
 * or
 * ```ts
 * const currentLocale = getLocaleFromUrl(Astro.url);
 * const posts = await getAllPosts(currentLocale);
 * ```
 */
export async function getAllPosts(
	lang?: (typeof locales)[number],
): Promise<CollectionEntry<"homeCards">[]> {
	const posts = await getCollection("homeCards", ({ data }) => {
		// filter out draft posts
		return data.draft !== true;
	});

	// if a language is passed, filter the posts by that language
	let filteredPosts: CollectionEntry<"homeCards">[];
	if (lang) {
		// console.log("filtering by language", lang);
		filteredPosts = filterCollectionByLanguage(posts, lang) as CollectionEntry<"homeCards">[];
		// filteredPosts = posts;
	} else {
		// console.log("no language passed, returning all posts");
		filteredPosts = posts;
	}

	// sort by index
	filteredPosts.sort((a, b) => {
		return a.data.index - b.data.index;
	});

	// filter out future posts and sort by date
	const formattedPosts = formatPosts(filteredPosts, {
		limit: undefined,
		removeLocale: true,
	});

	return formattedPosts;
}

// --------------------------------------------------------
/**
 * * returns all blog posts in a formatted array
 * @param posts: CollectionEntry<"homeCards">[] - array of posts, unformatted
 * note: this has an optional options object, params below
 * @param limit: number - if number is passed, limits the number of posts returned
 * @returns formatted blog posts according to passed parameters
 */
interface FormatPostsOptions {
	limit?: number;
	removeLocale?: boolean;
}

export function formatPosts(
	posts: CollectionEntry<"homeCards">[],
	{ limit = undefined, removeLocale = true }: FormatPostsOptions = {},
): CollectionEntry<"homeCards">[] {
	const filteredPosts = posts.reduce((acc: CollectionEntry<"homeCards">[], post) => {
		// add post to acc
		acc.push(post);

		return acc;
	}, []);

	// remove locale from URL
	if (removeLocale) {
		filteredPosts.forEach((post) => {
			// console.log("removing locale from slug for post", post.id);
			post.id = removeLocaleFromSlug(post.id);
		});
	}

	// limit if number is passed
	if (typeof limit === "number") {
		return filteredPosts.slice(0, limit);
	}

	return filteredPosts;
}

// --------------------------------------------------------
/**
 * * returns an array of processed items, sorted by count
 * @param items: string[] - array of items to count and sort
 * @returns object with counts of each item in the array
 *
 * note: return looks like { productivity: 2, 'cool-code': 1 }
 */

export function countItems(items: string[]): object {
	// get counts of each item in the array
	const countedItems = items.reduce((acc, item) => {
		const val = acc[slugify(item)] || 0;

		return {
			...acc,
			[slugify(item)]: val + 1,
		};
	}, {});

	return countedItems;
}

// --------------------------------------------------------
/**
 * * returns array of arrays, sorted by value (high value first)
 * @param jsObj: object - array of "key: value" pairs to sort
 * @returns array of arrays with counts, sorted by count
 *
 * note: return looks like [ [ 'productivity', 2 ], [ 'cool-code', 1 ] ]
 * note: this is used for tag and category cloud ordering
 */
export function sortByValue(jsObj: object): [string, number][] {
	const array: [string, number][] = [];
	for (const i in jsObj) {
		array.push([i, jsObj[i]]);
	}

	const sorted = array.sort((a, b) => {
		return b[1] - a[1];
	});

	// looks like [ [ 'productivity', 2 ], [ 'cool-code', 1 ] ]
	return sorted;
}
