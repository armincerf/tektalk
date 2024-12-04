// biome-ignore lint/style/useImportType: <explanation>
import * as Y from "yjs";
import * as v from "valibot";

export type Poll = Record<string, Record<string, string[]>>;

const PollSchema = v.record(v.string(), v.array(v.string()));
const PollMapSchema = v.record(v.string(), PollSchema);

type ValidatedPolls =
	| {
			success: true;
			polls: Poll;
	  }
	| {
			success: false;
			error: string;
	  };

export function getPollsMap(doc: Y.Doc): Y.Map<Record<string, string[]>> {
	return doc.getMap<Record<string, string[]>>("polls");
}

export function getValidatedPolls(doc: Y.Doc): ValidatedPolls {
	const rawPolls = doc.getMap("polls");
	const polls = v.safeParse(PollMapSchema, rawPolls.toJSON());

	if (!polls.success) {
		return {
			success: false,
			error: polls.issues[0].message,
		};
	}

	return {
		success: true,
		polls: polls.output,
	};
}

export function updatePollInDoc(
	doc: Y.Doc,
	pollId: string,
	answer: string,
	userId: string,
	origin?: unknown,
): boolean {
	const polls = getPollsMap(doc);
	const poll = polls.get(pollId);

	if (!poll) return false;

	doc.transact(() => {
		const updatedPoll = { ...poll };
		updatedPoll[answer] = [...(updatedPoll[answer] || []), userId];

		const validated = v.safeParse(PollSchema, updatedPoll);
		if (validated.success) {
			polls.set(pollId, validated.output);
		}
	}, origin);

	return true;
}
