<script lang="ts">
    import { yjsStore } from "../lib/stores/yjsStore.svelte";

    const reactions = [
        { emoji: "👏", id: "clap" },
        { emoji: "🤯", id: "explode" },
        { emoji: "❓", id: "question" },
    ];

    function handleReaction(reactionId: string) {
        if (reactionId === "question") {
            console.log("question mark clicked");
            return;
        }

        yjsStore.updateReaction(reactionId);
    }
</script>

<div class="grid grid-cols-3 gap-4 max-w-md mx-auto">
    {#each reactions as { emoji, id }}
        <button
            class="text-4xl p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            on:click={() => handleReaction(id)}
        >
            {emoji}
        </button>
    {/each}
</div>
