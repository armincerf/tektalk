import YProvider from "y-partyserver/provider";
import type * as Y from "yjs";

type UseYProviderOptions = {
	host?: string | undefined;
	room: string;
	party?: string;
	doc?: Y.Doc;
	prefix?: string;
	options?: ConstructorParameters<typeof YProvider>[3];
};
/**
 * Create a YProvider instance.
 * @param {Object} options - Options for creating a YProvider.
 * @param {string} options.host - The host for the YProvider.
 * @param {string} options.room - The room name.
 * @param {string} options.party - The party name.
 * @param {Y.Doc} options.doc - The Y.Doc instance.
 * @param {string} options.prefix - The prefix for the YProvider.
 * @param {Object} options.options - Additional options for YProvider.
 * @returns {YProvider} The YProvider instance.
 */
export function createYProvider({
	room,
	doc,
	options,
	prefix,
}: UseYProviderOptions) {
	const provider = new YProvider(
		import.meta.env.DEV ? "http://localhost:8787" : "https://tektalk.uk/",
		room,
		doc,
		{
			connect: false,
			party: "tek-talk-yjs-sync",
			prefix,
			...options,
		},
	);

	provider.connect();

	return provider;
}
