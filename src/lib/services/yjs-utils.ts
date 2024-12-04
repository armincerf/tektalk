import * as Y from "yjs";
import type { Poll } from "./poll";
import type { Reactions } from "./reactions";

export function initializeDoc(): Y.Doc {
	const doc = new Y.Doc();
	doc.getMap<Poll>("polls");
	doc.getMap<Reactions>("reactions");
	return doc;
}
