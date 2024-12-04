<script lang="ts">
    import { yjsStore } from "../lib/stores/yjsStore.svelte";
    import type { POLLS } from "../lib/constants/polls";

    type Props = {
        poll: (typeof POLLS)[keyof typeof POLLS];
    };

    const { poll }: Props = $props();
    const userId = crypto.randomUUID();

    const responses = $derived.by(() => {
        const pollResponses = yjsStore.polls.get(poll.id) ?? {};
        const userVote = Object.entries(pollResponses).find(([_, responses]) =>
            responses.includes(userId),
        )?.[0];

        return {
            userVote,
            hasVoted: Boolean(userVote),
        };
    });

    function submitVote(option: string) {
        yjsStore.submitPollResponse({
            pollId: poll.id,
            answer: option,
            userId,
        });
    }
</script>

<div class="max-w-2xl mx-auto bg-gray-800 rounded-lg p-6">
    <h2 class="text-2xl font-bold mb-4">{poll.title}</h2>
    <p class="text-xl mb-6">{poll.question}</p>

    {#if responses.hasVoted}
        <div class="space-y-4">
            <p class="text-xl">Thanks for voting!</p>
            <p class="text-lg">You selected: {responses.userVote}</p>
        </div>
    {:else}
        <div class="space-y-3">
            {#each poll.options as option}
                <button
                    class="w-full p-3 text-left bg-gray-700 hover:bg-gray-600
                        rounded transition-colors duration-200"
                    onclick={() => submitVote(option)}
                >
                    {option}
                </button>
            {/each}
        </div>
    {/if}
</div>
