import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

// Type-check frontmatter using a schema
const blogCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/data/blog" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			updatedDate: z
				.string()
				.or(z.date())
				.optional()
				.transform((str) => (str ? new Date(str) : undefined)),
			heroImage: image(),
			categories: z.array(z.string()),
			// mappingKey allows you to match entries across languages for SEO purposes
			mappingKey: z.string().optional(),
			// blog posts will be excluded from build if draft is "true"
			draft: z.boolean().optional(),
		}),
});

// services
const galleryCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/data/gallery" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// gallery will be excluded from build if draft is "true"
			draft: z.boolean().optional(),
			images: z
				.array(
					z.object({
						discriminant: z.string(),
						value: z.object({
							label: z.string(),
							image: image(),
						}),
					}),
				)
				.optional(),
		}),
});

// other pages
const otherPagesCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/data/otherPages" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			heroImage: image().optional(),
			heroAlt: z.string().optional(),
			// mappingKey allows you to match entries across languages for SEO purposes
			mappingKey: z.string().optional(),
			draft: z.boolean().optional(),
		}),
});

// home cards
const homeCardsCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/data/homeCards" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			showTitle: z.boolean().optional(),
			image: image().optional(),
			imageSide: z.enum(["left", "right"]),
			alt: z.string().optional(),
			href: z.string().optional(),
			index: z.number(),
			// home cards will be excluded from build if draft is "true"
			draft: z.boolean().optional(),
		}),
});

// contact
const contactCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/data/contact" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			intro: z.string().optional(),
			// contact will be excluded from build if draft is "true"
			draft: z.boolean().optional(),
			heroImage: z.string().optional(),
			heroAlt: z.string().optional(),
		}),
});

export const collections = {
	blog: blogCollection,
	gallery: galleryCollection,
	otherPages: otherPagesCollection,
	homeCards: homeCardsCollection,
	contact: contactCollection,
};
