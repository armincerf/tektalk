import Markdown from "reveal.js/plugin/markdown/markdown";
import Highlight from "reveal.js/plugin/highlight/highlight";
import RevealNotes from "reveal.js/plugin/notes/notes";

import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import "./assets/dracula.css";
import type { Options } from "reveal.js";

export type Config = {
	app: {
		name: string;
	};
	reveal: Options;
};

const config: Config = {
	app: {
		name: "Alex Davis",
	},
	reveal: {
		plugins: [Highlight, Markdown, RevealNotes],
		hash: true,
		controlsTutorial: false,
		center: true,
		navigationMode: "linear",
		controls: false,
		progress: false,
		disableLayout: false,
	},
};

export default config;
