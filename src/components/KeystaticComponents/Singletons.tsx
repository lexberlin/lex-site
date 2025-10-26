import ComponentBlocks from "@components/KeystaticComponents/ComponentBlocks";
import { singleton } from "@keystatic/core";
import { locales } from "@config/siteSettings.json";
import { fields } from "@keystatic/core";

// Singleton for the Contact page
const Contact = (locale: (typeof locales)[number]) =>
	singleton({
		label: `Contact (${locale.toUpperCase()})`,
		path: `src/data/contact/${locale}/`,
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
			intro: fields.text({
				label: "Intro",
			}),
			heroImage: fields.image({
				label: "Hero Image",
				publicPath: "../",
				validation: { isRequired: true },
			}),
			heroImageAlt: fields.text({
				label: "Hero Image Alt",
				validation: { isRequired: true },
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
						directory: `src/data/contact/${locale}/`,
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
	Contact,
};
