import { createYProvider } from "../yjs/useYProvider";
import type * as Y from "yjs";
import type YProvider from "y-partyserver/provider";
import { party, partyHost, partyUrl, protocol } from "../services/config";

const DEBUG = true;
const debug = (...args: unknown[]) => {
	if (DEBUG) console.log("[yjsStore]", ...args);
};

function createEventStore() {
	const state = $state({
		players: new Map<string, Player>(),
		matches: new Map<string, Match>(),
		games: new Map<string, Game>(),
		scoreboards: new Map<string, Scoreboard>(),
		initialized: false,
		lastUpdate: Date.now(),
		eventId: "",
	});

	let provider: YProvider | null = null;
	let tournamentService: TournamentService;
	let yPlayers: Y.Map<Player>;
	let yMatches: Y.Map<Match>;
	let yGames: Y.Map<Game>;
	let yScoreboards: Y.Map<Scoreboard>;

	function initializeStore(eventId: string) {
		debug("Initializing store", eventId);
		provider = createYProvider({
			host: `${protocol}://${partyHost}`,
			party,
			room: eventId,
			options: {
				disableBc: true,
				params: {
					userId:
						new URLSearchParams(window.location.search).get("userId") ||
						"Anonymous",
				},
			},
		});

		tournamentService = createTournamentService(provider.doc);

		state.eventId = eventId;

		yPlayers = provider.doc.getMap("players");
		yMatches = provider.doc.getMap("matches");
		yGames = provider.doc.getMap("games");
		yScoreboards = provider.doc.getMap("scoreboards");
		yPlayers.observe(() => updateStateFromYJS());
		yMatches.observe(() => updateStateFromYJS());
		yGames.observe(() => updateStateFromYJS());
		yScoreboards.observe(() => updateStateFromYJS());
		updateStateFromYJS();
		return {
			cleanup: () => {
				debug("Cleaning up provider");
				provider?.destroy();
			},
		};
	}

	// Helper Methods
	function getWaitingPlayers(): Player[] {
		return Array.from(state.players.values()).filter(
			(p) => p.status === "waiting",
		);
	}

	function getPlayersForMatch(matchId: string): Player[] {
		const match = state.matches.get(matchId);
		if (!match) return [];
		return Array.from(state.players.values()).filter((p) =>
			[match.playerOneId, match.playerTwoId, match.umpireId].includes(p.id),
		);
	}

	function getActiveMatches(): Match[] {
		return Array.from(state.matches.values()).filter(
			(m) => m.startedAt && !m.finishedAt,
		);
	}

	function getPendingMatches(): Match[] {
		return Array.from(state.matches.values()).filter(
			(m) => !m.startedAt && !m.finishedAt,
		);
	}

	function getCompletedMatches(): Match[] {
		return Array.from(state.matches.values()).filter((m) => m.finishedAt);
	}

	function getMatchByTableId(tableId: number): Match | undefined {
		return Array.from(state.matches.values()).find(
			(m) => !m.finishedAt && m.tableId === tableId,
		);
	}

	function getGameById(gameId: string): Game | undefined {
		return state.games.get(gameId);
	}

	function getGamesByMatchId(matchId: string): Game[] {
		return getGamesForMatch(Array.from(state.games.values()), matchId);
	}

	function getCurrentGameByMatchId(matchId: string): Game | undefined {
		const latestGame = getGamesByMatchId(matchId)
			.sort((a, b) => a.gameNumber - b.gameNumber)
			.pop();
		if (latestGame?.endedAt) {
			return undefined;
		}
		return latestGame;
	}

	function getMatchById(matchId: string): Match | undefined {
		return state.matches.get(matchId);
	}

	function getScoreboard(matchId: string): Scoreboard | undefined {
		return state.scoreboards.get(matchId);
	}

	// State Management
	function updateStateFromYJS() {
		state.players = new Map(yPlayers.entries());
		state.matches = new Map(yMatches.entries());
		state.games = new Map(yGames.entries());
		state.scoreboards = new Map(yScoreboards.entries());
		state.lastUpdate = Date.now();
		state.initialized = true;
		state.matches.forEach((match) => {
			const scoreboard = getScoreboard(match.id);
			if (!provider?.doc || !scoreboard) return;
			const scoreboardState = determineScoreboardState(provider?.doc, match.id);
			if (scoreboardState) {
				state.scoreboards.set(match.id, {
					...scoreboard,
					currentState: scoreboardState,
				});
			}
		});
	}

	async function statusTransition(player: Player, newStatus: PlayerStatus) {
		if (!state.eventId) {
			console.error("Can't transition player status - eventId not found");
			return;
		}
		await fetch(`${partyUrl(state.eventId)}/transition`, {
			method: "POST",
			body: JSON.stringify({
				player_id: player.id,
				from_status: player.status,
				to_status: newStatus,
			} satisfies TransitionEvent),
		});
	}

	return {
		// State Getters
		get players() {
			$effect.root(() => {
				state.lastUpdate;
			});
			return state.players;
		},
		get matches() {
			$effect.root(() => {
				state.lastUpdate;
			});
			return state.matches;
		},
		get games() {
			$effect.root(() => {
				state.lastUpdate;
			});
			return state.games;
		},
		get scoreboards() {
			$effect.root(() => {
				state.lastUpdate;
			});
			return state.scoreboards;
		},
		get initialized() {
			return state.initialized;
		},

		// Read-only helper methods
		getWaitingPlayers,
		getPlayersForMatch,
		getActiveMatches,
		getPendingMatches,
		getCompletedMatches,
		getMatchByTableId,
		getGameById,
		getGamesByMatchId,
		getCurrentGameByMatchId,
		getMatchById,
		getScoreboard,
		statusTransition,

		// Store initialization
		initializeStore,

		// Expose tournamentService for mutations
		get service() {
			return tournamentService;
		},
		get doc() {
			return provider?.doc || null;
		},
	};
}

export const yjsStore = createEventStore();

export type TEventStore = typeof yjsStore;