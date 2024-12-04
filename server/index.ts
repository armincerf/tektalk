import { routePartykitRequest, type Connection } from "partyserver";
import * as Y from "yjs";
import { YServer } from "y-partyserver";
import type { CallbackOptions } from "y-partyserver";

import { type DatabaseOperations, SQLiteDatabase } from "./database";
import { errorResponse } from "./response-utils";

type Env = {
	TekTalkYjsSync: DurableObjectNamespace<YServer>;
};

export class TekTalkYjsSync extends YServer<Env> {
	private db: DatabaseOperations;
	static callbackOptions: CallbackOptions = {
		debounceWait: 1000,
		debounceMaxWait: 10000,
		timeout: 10000,
	};

	constructor(state: DurableObjectState, env: Env) {
		super(state, env);
		this.db = new SQLiteDatabase(state.storage.sql);
	}

	async onError(connection: Connection, error: unknown): Promise<void> {
		const userId =
			connection.url && new URL(connection.url).searchParams.get("userId");

		if (error instanceof Error) {
			if (error.message === "Network connection lost.") {
				console.log("Network connection lost", userId);
				return;
			}
			console.error("Connection error:", error.message, { userId });
		} else {
			console.error("Unknown error:", error, { userId, url: connection.url });
		}
	}

	async onStart() {
		this.db.createTables();
		return super.onStart();
	}

	async onLoad() {
		const content = this.db.loadDocument(this.name);
		if (content) {
			Y.applyUpdate(this.document, new Uint8Array(content));
		}
	}

	async onSave() {
		const update = Y.encodeStateAsUpdate(this.document);
		this.db.saveDocument(this.name, update);
	}
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		try {
			const response = await routePartykitRequest(request, env);
			return response || errorResponse("Not Found", 404);
		} catch (error) {
			console.error("Error in fetch:", error);
			return errorResponse("Internal Server Error", 500);
		}
	},
} satisfies ExportedHandler<Env>;
