// biome-ignore lint/style/useImportType: <explanation>
import * as Y from "yjs";
import * as v from "valibot";

export type Reactions = Record<string, number>;

const ReactionsSchema = v.record(v.string(), v.number());

type ValidatedReactions =
	| {
			success: true;
			reactions: Reactions;
	  }
	| {
			success: false;
			error: string;
	  };

export function getReactionsMap(doc: Y.Doc): Y.Map<number> {
	return doc.getMap<number>("reactions");
}

export function getValidatedReactions(doc: Y.Doc): ValidatedReactions {
	const rawReactions = doc.getMap("reactions");
	const reactions = v.safeParse(ReactionsSchema, rawReactions.toJSON());

	if (!reactions.success) {
		return {
			success: false,
			error: reactions.issues[0].message,
		};
	}

	return {
		success: true,
		reactions: reactions.output,
	};
}

export function updateReactionInDoc(
	doc: Y.Doc,
	reactionId: string,
	increment = 1,
	origin?: unknown,
): boolean {
	const reactions = getReactionsMap(doc);
	const currentCount = reactions.get(reactionId) ?? 0;

	doc.transact(() => {
		reactions.set(reactionId, currentCount + increment);
	}, origin);

	return true;
}
