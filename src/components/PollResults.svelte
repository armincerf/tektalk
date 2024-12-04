<script lang="ts">
    import { yjsStore } from "../lib/stores/yjsStore.svelte";
    import { fade, scale } from "svelte/transition";
    import type { PollConfig } from "../lib/constants/polls";

    const { poll }: { poll: PollConfig } = $props();

    const results = $derived.by(() => {
        const pollData = yjsStore.polls.get(poll.id) ?? {};
        const total = Object.values(pollData).reduce(
            (sum, votes) => sum + votes.length,
            0,
        );

        return poll.options.map((option) => ({
            option,
            votes: pollData[option]?.length ?? 0,
            percentage: total
                ? Math.round(((pollData[option]?.length ?? 0) / total) * 100)
                : 0,
        }));
    });
</script>

<div class="space-y-6 w-full max-w-2xl mx-auto" in:fade={{ duration: 300 }}>
    <h3 class="text-2xl font-semibold mb-4">{poll.question}</h3>

    <div class="space-y-4">
        {#each results as { option, votes, percentage }}
            <div
                class="bg-gray-800/50 rounded-lg p-4 transform transition-all hover:scale-[1.02]"
                in:scale={{ duration: 300, delay: 150 }}
            >
                <div class="flex justify-between mb-2">
                    <span class="text-lg">{option}</span>
                    <span class="font-mono">{votes} votes ({percentage}%)</span>
                </div>
                <div class="h-4 bg-gray-700 rounded-full overflow-hidden">
                    <div
                        class="h-full bg-blue-500 transition-all duration-1000 ease-out"
                        style:width="{percentage}%"
                    ></div>
                </div>
            </div>
        {/each}
    </div>

    <div class="text-center text-gray-400 text-sm mt-4">
        Total Votes: {results.reduce((sum, r) => sum + r.votes, 0)}
    </div>
</div>
