<script lang="ts">
    import { yjsStore } from "../lib/stores/yjsStore.svelte";

    type Emoji = {
        x: number;
        id: string;
        emoji: string;
    };

    type ReactionType = keyof typeof emojiMap;

    let floatingEmojis = $state<Emoji[]>([]);
    const reactions = $derived(yjsStore.reactions);

    const emojiMap = {
        wave: "👋",
        clap: "👏",
        explode: "🤯",
        thumbsup: "👍",
        thumbsdown: "👎",
    } as const;

    // Track previous values for all reactions
    let previousValues = Object.fromEntries(
        Object.keys(emojiMap).map((key) => [key, 0]),
    );

    let lastEmojiAddedAt = 0;

    $effect(() => {
        if (!reactions) return;

        // Get all current values
        const currentValues = Object.fromEntries(
            Object.keys(emojiMap).map((key) => [key, reactions.get(key) ?? 0]),
        );

        // Check all reactions for changes
        // biome-ignore lint/complexity/noForEach: <explanation>
        Object.keys(emojiMap).forEach((reactionType) => {
            const currentValue = currentValues[reactionType];
            const previousValue = previousValues[reactionType];

            if (currentValue > previousValue) {
                console.log(`Adding ${reactionType} emoji`);
                addFloatingEmoji(emojiMap[reactionType as ReactionType]);
            }
        });

        // Log the same way as before for debugging consistency
        console.log("Current values:", {
            clap: currentValues.clap,
            explode: currentValues.explode,
        });
        console.log("Previous values:", {
            clap: previousValues.clap,
            explode: previousValues.explode,
        });

        // Update previous values
        previousValues = currentValues;
    });

    function addFloatingEmoji(emoji: string) {
        const id = Math.random().toString(36);
        const x = Math.random() * 80 + 10;
        lastEmojiAddedAt = Date.now();

        console.log("Adding emoji:", emoji, "at position:", x);
        floatingEmojis = [...floatingEmojis, { x, id, emoji }];

        setTimeout(() => {
            const timeSinceLastEmoji = Date.now() - lastEmojiAddedAt;
            if (timeSinceLastEmoji >= 5000) {
                console.log("Removing emoji:", id);
                floatingEmojis = floatingEmojis.filter((e) => e.id !== id);
            } else {
                setTimeout(() => {
                    console.log("Removing emoji:", id);
                    floatingEmojis = floatingEmojis.filter((e) => e.id !== id);
                }, 5000 - timeSinceLastEmoji);
            }
        }, 5000);
    }
</script>

<div
    class="reaction-counter fixed bottom-4 left-4 p-2 bg-gray-800 bg-opacity-75 z-50 rounded-full"
>
    <div class="flex gap-4 text-sm">
        {#each Object.keys(emojiMap) as reactionType}
            <div>
                {emojiMap[reactionType as ReactionType]}
                {reactions?.get(reactionType) ?? 0}
            </div>
        {/each}
    </div>
</div>

<div class="reaction-container fixed inset-0 pointer-events-none z-50">
    {#each floatingEmojis as { x, id, emoji }}
        <div
            class="absolute text-4xl animate-float"
            style="left: {x}%; bottom: 0;"
        >
            {emoji}
        </div>
    {/each}
</div>

<style>
    @keyframes floatUp {
        0% {
            transform: translateY(0);
            opacity: 1;
        }
        100% {
            transform: translateY(-80vh);
            opacity: 0;
        }
    }

    .animate-float {
        animation: floatUp 2s ease-out forwards;
    }

    .reaction-container {
        pointer-events: none;
    }
</style>
