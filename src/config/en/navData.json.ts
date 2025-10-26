/**
 * * This file is used to define the navigation links for the site.
 * Notes:
 * 1 level of dropdown is supported
 * Mega menus look best with 3-5 columns, but supports anything > 2 columns
 * If using icons, the icon should be saved in the src/icons folder. If filename is "tabler/icon.svg" then input "tabler/icon"
 * Recommend getting icons from https://tabler.io/icons
 */

// types
import { type navItem } from "../types/configDataTypes";

// note: 1 level of dropdown is supported
const navConfig: navItem[] = [
	{
		text: "Contact/Rates",
		link: "/contact",
	},
	{
		text: "Distance Affairs",
		link: "/distance-affairs",
	},
	{ text: "Etiquette", link: "/meet" },
	{ text: "Duos", link: "/duos" },
	// {
	// 	text: "Gallery",
	// 	dropdown: [
	// 		{
	// 			text: "Red",
	// 			link: "/gallery/red",
	// 		},
	// 		{
	// 			text: "Green",
	// 			link: "/gallery/green",
	// 		},
	// 	],
	// },
	// {
	// 	text: "Blog",
	// 	link: "/blog",
	// },
];

export default navConfig;
