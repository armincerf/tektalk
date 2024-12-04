<script lang="ts">
    import { yjsStore } from "../lib/stores/yjsStore.svelte";

    type Emoji = {
        x: number;
        id: string;
        emoji: string;
    };

    let floatingEmojis = $state<Emoji[]>([]);
    const reactions = $derived(yjsStore.reactions);

    const emojiMap = {
        clap: "👏",
        explode: "🤯",
    } as const;

    let prevClap = 0;
    let prevExplode = 0;
    let lastEmojiAddedAt = 0;

    $effect(() => {
        if (!reactions) return;

        const currentClap = reactions.get("clap") ?? 0;
        const currentExplode = reactions.get("explode") ?? 0;

        console.log("Current values:", {
            clap: currentClap,
            explode: currentExplode,
        });
        console.log("Previous values:", {
            clap: prevClap,
            explode: prevExplode,
        });

        if (currentClap > prevClap) {
            console.log("Adding clap emoji");
            addFloatingEmoji(emojiMap.clap);
        }

        if (currentExplode > prevExplode) {
            console.log("Adding explode emoji");
            addFloatingEmoji(emojiMap.explode);
        }

        prevClap = currentClap;
        prevExplode = currentExplode;
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
    class="reaction-counter fixed top-4 left-4 p-2 bg-gray-800 bg-opacity-75 z-50 rounded-full"
>
    <div class="flex gap-4 text-sm">
        <div>👏 {reactions?.get("clap") ?? 0}</div>
        <div>🤯 {reactions?.get("explode") ?? 0}</div>
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
