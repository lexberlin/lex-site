/**
 * * Keystatic Collection definitions that can take in languages and return the correct content
 * This makes it much cleaner to work with content in different languages
 */

import {
	collection,
	fields,
	// singleton,
} from "@keystatic/core";

// components
import ComponentBlocks from "@components/KeystaticComponents/ComponentBlocks";

// utils
import { locales } from "@config/siteSettings.json";
import type { image } from "node_modules/@keystatic/core/dist/declarations/src/form/fields";

/**
 * * Blog posts collection
 * This gets used by Astro Content Collections, so if you update this, you'll need to update the Astro Content Collections schema
 */
const Blog = (locale: (typeof locales)[number]) =>
	collection({
		label: `Blog (${locale.toUpperCase()})`,
		slugField: "title",
		path: `src/data/blog/${locale}/*/`,
		columns: ["title", "pubDate"],
		entryLayout: "content",
		format: { contentField: "content" },
		schema: {
			title: fields.slug({
				name: { label: "Title" },
				slug: {
					label: "SEO-friendly slug",
					description: "Never change the slug once a file is published!",
				},
			}),
			description: fields.text({
				label: "Description",
				validation: { isRequired: true, length: { min: 1, max: 160 } },
			}),
			draft: fields.checkbox({
				label: "Draft",
				description: "Set this post as draft to prevent it from being published.",
			}),
			pubDate: fields.date({ label: "Publish Date" }),
			heroImage: fields.image({
				label: "Hero Image",
				publicPath: "../",
				validation: { isRequired: true },
			}),
			heroImageAlt: fields.text({
				label: "Hero Image Alt",
				validation: { isRequired: true },
			}),
			categories: fields.array(fields.text({ label: "Category" }), {
				label: "Categories",
				description: "This is NOT case sensitive.",
				itemLabel: (props) => props.value,
				validation: { length: { min: 1 } },
			}),
			content: fields.mdx({
				label: "Content",
				options: {
					bold: true,
					italic: true,
					strikethrough: true,
					code: true,
					heading: [2, 3, 4, 5, 6],
					blockquote: true,
					orderedList: true,
					unorderedList: true,
					table: true,
					link: true,
					image: {
						directory: `src/data/blog/${locale}/`,
						publicPath: "../",
						// schema: {
						//   title: fields.text({
						//     label: "Caption",
						//     description:
						//       "The text to display under the image in a caption.",
						//   }),
						// },
					},
					divider: true,
					codeBlock: true,
				},
				components: {
					Admonition: ComponentBlocks.Admonition,
				},
			}),
		},
	});

/**
 * * Gallery collection
 * This gets used by Astro Content Collections, so if you update this, you'll need to update the Astro Content Collections schema
 */
const Gallery = (locale: (typeof locales)[number]) =>
	collection({
		label: `Gallery (${locale.toUpperCase()})`,
		slugField: "title",
		path: `src/data/gallery/${locale}/*/`,
		columns: ["title"],
		entryLayout: "form",
		format: { contentField: "content" },
		schema: {
			title: fields.slug({
				name: { label: "Title" },
				slug: {
					label: "SEO-friendly slug",
					description: "Never change the slug once a file is published!",
				},
			}),
			description: fields.text({
				label: "Description",
				validation: { isRequired: true, length: { min: 1, max: 160 } },
			}),
			draft: fields.checkbox({
				label: "Draft",
				description: "Set this page as draft to prevent it from being published.",
			}),
			content: fields.mdx({
				label: "Page Contents",
				options: {
					bold: true,
					italic: true,
					strikethrough: true,
					code: false,
					heading: [2, 3, 4],
					blockquote: true,
					orderedList: true,
					unorderedList: true,
					table: true,
					link: true,
					image: {
						directory: `src/data/gallery/${locale}/`,
						publicPath: "../",
					},
					divider: true,
					codeBlock: false,
				},
				// components: {
				//   Admonition: ComponentBlocks.Admonition,
				// },
			}),
			images: fields.blocks(
				{
					// First block option is a link to a Page
					image: {
						label: "Image",
						schema: fields.object({
							label: fields.text({ label: "Label" }),
							image: fields.image({
								label: "Image",
								publicPath: "../",
							}),
						}),
						itemLabel: (props) => props.fields.label.value || "Image",
					},
				},
				{ label: "Images" },
			),
		},
	});

/**
 * * Other Pages collection
 * For items like legal pages, about pages, etc.
 * This gets used by Astro Content Collections, so if you update this, you'll need to update the Astro Content Collections schema
 */
const OtherPages = (locale: (typeof locales)[number]) =>
	collection({
		label: `Other Pages (${locale.toUpperCase()})`,
		slugField: "title",
		path: `src/data/otherPages/${locale}/*/`,
		columns: ["title"],
		entryLayout: "content",
		format: { contentField: "content" },
		schema: {
			title: fields.slug({
				name: { label: "Title" },
				slug: {
					label: "SEO-friendly slug",
					description: "Never change the slug once a file is published!",
				},
			}),
			description: fields.text({
				label: "Description",
				validation: { isRequired: true, length: { min: 1, max: 160 } },
			}),
			draft: fields.checkbox({
				label: "Draft",
				description: "Set this page as draft to prevent it from being published.",
			}),
			heroImage: fields.image({
				label: "Hero Image",
				publicPath: "../",
			}),
			heroAlt: fields.text({
				label: "Hero Image Alt",
			}),
			content: fields.mdx({
				label: "Page Contents",
				options: {
					bold: true,
					italic: true,
					strikethrough: true,
					code: true,
					heading: [2, 3, 4, 5, 6],
					blockquote: true,
					orderedList: true,
					unorderedList: true,
					table: true,
					link: true,
					image: {
						directory: `src/data/otherPages/${locale}/`,
						publicPath: "../",
					},
					divider: true,
					codeBlock: true,
				},
				components: {
					Admonition: ComponentBlocks.Admonition,
				},
			}),
		},
	});

const HomeCards = (locale: (typeof locales)[number]) =>
	collection({
		label: `Home Cards (${locale.toUpperCase()})`,
		slugField: "title",
		path: `src/data/homeCards/${locale}/*/`,
		columns: ["title"],
		entryLayout: "content",
		format: { contentField: "content" },
		schema: {
			title: fields.slug({
				name: { label: "Title" },
				slug: {
					label: "SEO-friendly slug",
					description: "Never change the slug once a file is published!",
				},
			}),
			showTitle: fields.checkbox({
				label: "Show Title",
				description: "Show title as header",
			}),
			image: fields.image({
				label: "Image",
				publicPath: "../",
			}),
			imageSide: fields.select({
				label: "Image Side",
				description: "Side of the image",
				options: [
					{ label: "Left", value: "left" },
					{ label: "Right", value: "right" },
				],
				defaultValue: "left",
			}),
			alt: fields.text({
				label: "Alt Text",
				description: "Alt text for image",
			}),
			href: fields.text({
				label: "Link",
				description: "Link to learn more",
			}),
			index: fields.number({
				label: "Index",
				description: "Index for ordering",
			}),
			draft: fields.checkbox({
				label: "Draft",
				description: "Set this page as draft to prevent it from being published.",
			}),
			content: fields.mdx({
				label: "Page Contents",
				options: {
					bold: true,
					italic: true,
					strikethrough: true,
					code: true,
					heading: [2, 3, 4, 5, 6],
					blockquote: true,
					orderedList: true,
					unorderedList: true,
					table: true,
					link: true,
					image: {
						directory: `src/data/homeCards/${locale}/`,
						publicPath: "../",
					},
					divider: true,
					codeBlock: true,
				},
				components: {
					Admonition: ComponentBlocks.Admonition,
				},
			}),
		},
	});

export default {
	Blog,
	Gallery,
	OtherPages,
	HomeCards,
};
