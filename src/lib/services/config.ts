const isDev =
	typeof process !== "undefined"
		? process.env.NODE_ENV === "development"
		: import.meta.env.DEV;

export const partyHost = isDev
	? "localhost:8787"
	: "ttplay-partyserver.armincerf.workers.dev";
export const party = "t-t-event";

export const protocol = isDev ? "http" : "https";
export const partyUrl = (eventId: string) =>
	`${protocol}://${partyHost}/parties/${party}/${eventId}`;