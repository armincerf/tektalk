import * as Y from "yjs";
import * as v from "valibot";
import { PlayerMapSchema, type Player } from "../logic/player.svelte";
import { EventSchema, type Event } from "../logic/event";
import { MatchSchema, type Match } from "../logic/match";
import { GameSchema, type Game } from "../logic/game";
import { ScoreboardSchema, type Scoreboard } from "../logic/scoreboard";

export type ValidatedPlayers =
	| {
			success: true;
			players: Player[];
	  }
	| {
			success: false;
			error: string;
	  };

export type ValidatedEvent =
	| {
			success: true;
			event: Event;
	  }
	| {
			success: false;
			error: string;
	  };

export type ValidatedMatches =
	| {
			success: true;
			matches: Match[];
	  }
	| {
			success: false;
			error: string;
	  };

export type ValidatedGames =
	| {
			success: true;
			games: Game[];
	  }
	| {
			success: false;
			error: string;
	  };

export type ValidatedScoreboard =
	| {
			success: true;
			scoreboards: Scoreboard[];
	  }
	| {
			success: false;
			error: string;
	  };

export function initializeDoc(): Y.Doc {
	const doc = new Y.Doc();

	// Initialize all shared data structures as Maps
	doc.getMap<Match>("matches");
	doc.getMap<Player>("players");
	doc.getMap<Event>("event");
	doc.getMap<Game>("games");
	doc.getMap<Scoreboard>("scoreboards");

	return doc;
}

// Helper function to safely get maps
export function getMatchesMap(doc: Y.Doc): Y.Map<Match> {
	return doc.getMap<Match>("matches");
}

export function getPlayersMap(doc: Y.Doc): Y.Map<Player> {
	return doc.getMap<Player>("players");
}

export function getEventMap(doc: Y.Doc): Y.Map<Event> {
	return doc.getMap<Event>("event");
}

export function getGamesMap(doc: Y.Doc): Y.Map<Game> {
	return doc.getMap<Game>("games");
}

export function getScoreboardsMap(doc: Y.Doc): Y.Map<Scoreboard> {
	return doc.getMap<Scoreboard>("scoreboards");
}

export function getValidatedPlayers(doc: Y.Doc): ValidatedPlayers {
	const rawPlayers = doc.getMap("players");
	console.log("rawPlayers", rawPlayers.toJSON());
	const playersMap = v.safeParse(PlayerMapSchema, rawPlayers.toJSON());
	console.log("playersMap", playersMap);

	if (!playersMap.success) {
		return {
			success: false,
			error: playersMap.issues[0].message,
		};
	}

	return {
		success: true,
		players: Object.values(playersMap.output),
	};
}

export function getValidatedEvent(doc: Y.Doc): ValidatedEvent {
	const rawEvent = doc.getMap("event").get("event");
	const event = v.safeParse(EventSchema, rawEvent);

	if (!event.success) {
		return {
			success: false,
			error: event.issues[0].message,
		};
	}

	return {
		success: true,
		event: event.output,
	};
}

export function getValidatedMatches(doc: Y.Doc): ValidatedMatches {
	const rawMatches = Array.from(doc.getMap("matches").values());
	const matches = v.safeParse(v.array(MatchSchema), rawMatches);

	if (!matches.success) {
		return {
			success: false,
			error: matches.issues[0].message,
		};
	}

	return {
		success: true,
		matches: matches.output,
	};
}

export function getValidatedGames(doc: Y.Doc): ValidatedGames {
	const rawGames = Array.from(doc.getMap("games").values());
	const games = v.safeParse(v.array(GameSchema), rawGames);

	if (!games.success) {
		return {
			success: false,
			error: games.issues[0].message,
		};
	}

	return {
		success: true,
		games: games.output,
	};
}

export function getValidatedScoreboards(doc: Y.Doc): ValidatedScoreboard {
	const rawScoreboards = Array.from(doc.getMap("scoreboards").values());
	const scoreboards = v.safeParse(v.array(ScoreboardSchema), rawScoreboards);

	if (!scoreboards.success) {
		return {
			success: false,
			error: scoreboards.issues[0].message,
		};
	}

	return {
		success: true,
		scoreboards: scoreboards.output,
	};
}

export function updatePlayerInDoc(
	doc: Y.Doc,
	playerId: string,
	updates: Partial<Player>,
): boolean {
	const players = doc.getMap("players");
	const player = players.get(playerId);

	if (!player) return false;

	const updatedPlayer = { ...player, ...updates };
	const validated = v.safeParse(PlayerMapSchema, { [playerId]: updatedPlayer });

	if (!validated.success) {
		console.error("Invalid player update", validated.issues);
		return false;
	}

	players.set(playerId, updatedPlayer);
	return true;
}

export function updateMatchInDoc(
	doc: Y.Doc,
	matchId: string,
	updates: Partial<Match>,
): boolean {
	const matches = doc.getMap("matches");
	const match = matches.get(matchId);

	if (!match) return false;

	const updatedMatch = { ...match, ...updates };
	const validated = v.safeParse(MatchSchema, updatedMatch);

	if (!validated.success) {
		console.error("Invalid match update", validated.issues);
		return false;
	}

	matches.set(matchId, updatedMatch);
	return true;
}

export const updateGameInDoc = async (
	doc: Y.Doc,
	gameId: string,
	updates: Partial<Game>,
	origin?: unknown,
) => {
	const games = getGamesMap(doc);
	doc.transact(() => {
		const game = games.get(gameId);
		if (game) {
			games.set(gameId, { ...game, ...updates });
		}
	}, origin);
};

export function updateScoreboardInDoc(
	doc: Y.Doc,
	matchId: string,
	updates: Partial<Scoreboard>,
	origin?: unknown,
): boolean {
	const scoreboards = getScoreboardsMap(doc);
	const currentData = scoreboards.get(matchId);

	const updatedScoreboard = { ...currentData, ...updates };
	const validated = v.safeParse(ScoreboardSchema, updatedScoreboard);

	if (!validated.success) {
		console.error("Invalid scoreboard update", validated.issues);
		return false;
	}

	doc.transact(() => {
		scoreboards.set(matchId, validated.output);
	}, origin);

	return true;
}