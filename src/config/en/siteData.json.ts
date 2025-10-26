import { type SiteDataProps } from "../types/configDataTypes";

// TODO: update the emails and stuff

// Update this file with your site specific information
const siteData: SiteDataProps = {
	name: "Lex Berlin",
	// Your website's title and description (meta fields)
	title: "Lex Berlin",
	description: "Welcome to the hearth of creative sensuality",

	// used on contact page and footer
	contact: {
		email: "lexberlin@proton.me",
	},

	// Your information for blog post purposes
	author: {
		name: "Lex Berlin",
		email: "lexberlin@proton.me",
	},

	// default image for meta tags if the page doesn't have an image already
	defaultImage: {
		src: "/images/cosmic-themes-logo.jpg",
		alt: "Cosmic Themes logo",
	},
};

export default siteData;
