import type Reveal from "reveal.js";

export type RevealSlideEvent = Event & {
	currentSlide: HTMLElement;
	previousSlide: HTMLElement | null;
	indexh: number;
	indexv: number;
};

export type RevealFragmentEvent = Event & {
	fragment: HTMLElement;
};

type RevealEvents = {
	slidechanged: RevealSlideEvent;
	fragmentshown: RevealFragmentEvent;
	fragmenthidden: RevealFragmentEvent;
};

export type RevealApi = Omit<Reveal.Api, "on"> & {
	on<K extends keyof RevealEvents>(
		event: K,
		callback: (event: RevealEvents[K]) => void,
	): void;
};
