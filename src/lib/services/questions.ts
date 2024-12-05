// biome-ignore lint/style/useImportType: <explanation>
import * as Y from "yjs";
import * as v from "valibot";

const QuestionSchema = v.object({
	id: v.string(),
	userId: v.string(),
	question: v.string(),
	slideId: v.string(),
});

const QuestionArraySchema = v.array(QuestionSchema);

type Question = v.InferOutput<typeof QuestionSchema>;

type ValidatedQuestions =
	| {
			success: true;
			questions: Question[];
	  }
	| {
			success: false;
			error: string;
	  };

export function getQuestionsMap(doc: Y.Doc): Y.Map<Question[]> {
	return doc.getMap<Question[]>("questions");
}

export function getValidatedQuestions(doc: Y.Doc): ValidatedQuestions {
	const rawQuestions = doc.getMap("questions");
	const questions = v.safeParse(QuestionArraySchema, rawQuestions.toJSON());

	if (!questions.success) {
		return {
			success: false,
			error: questions.issues[0].message,
		};
	}

	return {
		success: true,
		questions: questions.output,
	};
}

export function updatePollInDoc(
	doc: Y.Doc,
	question: Question,
	origin?: unknown,
): boolean {
	const questions = getQuestionsMap(doc);
	const questionArray = questions.get(question.slideId);

	if (!questionArray) return false;

	doc.transact(() => {
		const updatedQuestions = [...questionArray, question];

		const validated = v.safeParse(QuestionArraySchema, updatedQuestions);
		if (validated.success) {
			questions.set(question.slideId, validated.output);
		}
	}, origin);

	return true;
}
