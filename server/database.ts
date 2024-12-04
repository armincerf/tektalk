import type { SqlStorage } from "@cloudflare/workers-types";

export interface DatabaseOperations {
	createTables(): void;
	loadDocument(name: string): ArrayBuffer | null;
	saveDocument(name: string, content: Uint8Array): void;
	getLastTransition(
		playerId: string,
		fromStatus: string,
		toStatus: string,
	): number | null;
	logTransition(
		playerId: string,
		fromStatus: string,
		toStatus: string,
		timestamp: number,
	): void;
}

export class SQLiteDatabase implements DatabaseOperations {
	constructor(private sql: SqlStorage) {}
    getLastTransition(playerId: string, fromStatus: string, toStatus: string): number | null {
        throw new Error("Method not implemented.");
    }
    logTransition(playerId: string, fromStatus: string, toStatus: string, timestamp: number): void {
        throw new Error("Method not implemented.");
    }

	createTables(): void {
		try {
			console.log("Creating documents table...");
			this.sql.exec(
				"CREATE TABLE IF NOT EXISTS documents (id TEXT PRIMARY KEY, content BLOB)",
			);
			console.log("Documents table created");
		} catch (error) {
			console.error("Error creating tables:", error);
			throw error;
		}
	}

	loadDocument(name: string): ArrayBuffer | null {
		console.log("Loading document", name);
		try {
			const document = this.sql
				.exec("SELECT content FROM documents WHERE id = ? LIMIT 1", name)
				.one();

			if (!document) {
				console.log("Document not found:", name);
				return null;
			}

			if (!document.content) {
				console.log("Document content is empty:", name);
				return null;
			}

			return document.content as ArrayBuffer;
		} catch (error) {
			console.warn("Error loading document:", name, error);
			return null;
		}
	}

	saveDocument(name: string, content: Uint8Array): void {
		console.log("inserting blob", name);
		this.sql.exec(
			"INSERT OR REPLACE INTO documents (id, content) VALUES (?, ?)",
			name,
			content,
		);
	}
}
