export const POLL_IDS = {
	INTERACTIVITY: "interactivity-poll-results",
	SPIN_APP: "spin-app-poll-results",
} as const;

export type PollConfig = {
	id: (typeof POLL_IDS)[keyof typeof POLL_IDS];
	title: string;
	question: string;
	options: string[];
};

export const POLLS: Record<
	(typeof POLL_IDS)[keyof typeof POLL_IDS],
	PollConfig
> = {
	[POLL_IDS.INTERACTIVITY]: {
		id: POLL_IDS.INTERACTIVITY,
		title: "Quick Poll",
		question:
			"How many of you have experienced interactivity in a Presentation?",
		options: ["Yes", "No"],
	},
	[POLL_IDS.SPIN_APP]: {
		id: POLL_IDS.SPIN_APP,
		title: "Setup Requirements",
		question:
			"Do you have a table tennis table, tripod, bright lighting, the ability to compile ios apps from source and an interest in knowing the exact spin of a table tennis ball?",
		options: ["Yes, I have all of these things", "No..."],
	},
};
