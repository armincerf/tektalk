import { initializeDoc } from "../services/yjs-utils";
import { getPollsMap, getValidatedPolls } from "../services/poll";
import {
	getReactionsMap,
	getValidatedReactions,
	updateReactionInDoc,
} from "../services/reactions";
import { createYProvider } from "../yjs/useYProvider";

const DEBUG = true;
const debug = (...args: unknown[]) => {
	if (DEBUG) console.log("[yjsStore]", ...args);
};

type SlideState = {
	currentSlide: string;
	lockSessionId: string | null;
	lockTimestamp: number | null;
};

const LOCK_TIMEOUT = 15 * 60 * 1000; // 15 minutes

// Define a reactive state
const state = $state({
	currentSlide: "",
	lockSessionId: null as string | null,
	lockTimestamp: null as number | null,
	polls: new Map<string, Record<string, string[]>>(),
	reactions: new Map<string, number>(),
	initialized: false,
	lastUpdate: Date.now(),
});

function createPollAndReactionStore() {
	const doc = initializeDoc();
	const polls = getPollsMap(doc);
	const reactions = getReactionsMap(doc);
	const slides = doc.getMap<SlideState>("slides");
	const sessionId = crypto.randomUUID();
	let provider: ReturnType<typeof createYProvider> | null = null;

	// Update the state from YJS
	function updateStateFromYJS() {
		state.polls = new Map(polls.entries());
		state.reactions = new Map(reactions.entries());
		state.lastUpdate = Date.now();
		state.currentSlide = slides.get("state")?.currentSlide ?? "";
		state.initialized = true;
	}

	function initializeStore() {
		debug("Initializing poll and reaction store");

		// Create and connect the provider
		provider = createYProvider({
			room: "slides",
			doc,
			options: {
				disableBc: true,
				params: {
					userId: sessionId,
				},
			},
		});

		// Set up observers
		slides.observe(() => updateStateFromYJS());
		polls.observe(() => updateStateFromYJS());
		reactions.observe(() => updateStateFromYJS());

		// Initial state update
		updateStateFromYJS();

		return {
			cleanup: () => {
				debug("Cleaning up store");
				provider?.destroy();
				doc.destroy();
			},
		};
	}

	function getValidatedPollsState() {
		return getValidatedPolls(doc);
	}

	function getValidatedReactionsState() {
		return getValidatedReactions(doc);
	}

	function initPoll({
		pollId,
		questions,
	}: { pollId: string; questions: string[] }) {
		doc.transact(() => {
			const newPoll = questions.reduce(
				(acc, question) => {
					acc[question] = [];
					return acc;
				},
				{} as Record<string, string[]>,
			);
			polls.set(pollId, newPoll);
		});
		debug(`Initialized poll with ID: ${pollId}`);
	}

	function submitPollResponse({
		pollId,
		answer,
		userId,
	}: { pollId: string; answer: string; userId: string }) {
		const poll = polls.get(pollId);
		if (!poll) {
			debug(`Poll with ID: ${pollId} not found`);
			return false;
		}

		doc.transact(() => {
			poll[answer] = [...(poll[answer] || []), userId];
			polls.set(pollId, poll);
		});
		debug(`User ${userId} submitted response to poll ID: ${pollId}`);
		return true;
	}

	function submitReaction({ reactionId }: { reactionId: string }) {
		const currentCount = reactions.get(reactionId) ?? 0;
		doc.transact(() => {
			reactions.set(reactionId, currentCount + 1);
		});
		debug(`Reaction with ID: ${reactionId} incremented`);
	}

	function updateSlideState(newSlide: string) {
		if (!provider?.doc) {
			debug("Provider not initialized");
			return;
		}

		doc.transact(() => {
			slides.set("state", {
				currentSlide: newSlide,
				lockSessionId: sessionId,
				lockTimestamp: Date.now(),
			});
		});
		debug(`Updated current slide to: ${newSlide}`);
		updateStateFromYJS();
	}

	function updateReaction(reactionId: string) {
		if (!doc) return;
		updateReactionInDoc(doc, reactionId, 1);
	}

	return {
		// Poll methods
		get polls() {
			$effect.root(() => {
				state.lastUpdate;
			});
			return state.polls;
		},
		initPoll,
		submitPollResponse,

		// Reaction methods
		get reactions() {
			$effect.root(() => {
				state.lastUpdate;
			});
			return state.reactions;
		},
		submitReaction,

		// Store initialization
		initializeStore,

		// Validation methods
		getValidatedPollsState,
		getValidatedReactionsState,

		// Slide methods
		get currentSlide() {
			$effect.root(() => {
				state.lastUpdate;
			});
			return state.currentSlide;
		},
		updateSlideState,

		// Reaction methods
		updateReaction,
	};
}

export const yjsStore = createPollAndReactionStore();
