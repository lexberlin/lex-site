import { type CollectionEntry } from "astro:content";

// utils
import { getTranslatedData } from "@/js/translationUtils";
import { defaultLocale } from "@/config/siteSettings.json";

// data - siteData.title should not change based on locale so this should be fine
const siteData = getTranslatedData("siteData", defaultLocale);

interface GeneralProps {
	type: "general";
}

export interface BlogProps {
	type: "blog";
	postFrontmatter: CollectionEntry<"blog">["data"];
	image: ImageMetadata; // result of getImage() from Seo.astro
	canonicalUrl: URL;
}

export type JsonLDProps = BlogProps | GeneralProps;

export default function jsonLDGenerator(props: JsonLDProps) {
	const { type } = props;
	if (type === "blog") {
		const { postFrontmatter, image, canonicalUrl } = props as BlogProps;

		return `<script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Blogposting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "${canonicalUrl}"
        },
        "headline": "${postFrontmatter.title}",
        "description": "${postFrontmatter.description}",
        "image": "${image.src}",
        "datePublished": "${postFrontmatter.pubDate}",
        "dateModified": "${postFrontmatter.updatedDate}"
      }
    </script>`;
	}
	return `<script type="application/ld+json">
      {
      "@context": "https://schema.org/",
      "@type": "WebSite",
      "name": "${siteData.title}",
      "url": "${import.meta.env.SITE}"
      }
    </script>`;
}
