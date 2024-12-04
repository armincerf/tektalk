<script lang="ts">
    import { yjsStore } from "../lib/stores/yjsStore.svelte";
    import { POLLS } from "../lib/constants/polls";
    import RenderPoll from "./RenderPoll.svelte";

    const slideId = $derived(yjsStore.currentSlide);
    const userId = crypto.randomUUID();
    const pollSlideIds = Object.keys(POLLS);
    const currentPoll = $derived.by(() => {
        return pollSlideIds.includes(slideId)
            ? POLLS[slideId as keyof typeof POLLS]
            : null;
    });
</script>

<main class="min-h-screen bg-gray-900 text-white">
    <div class="container mx-auto px-4 py-16">
        {#if currentPoll}
            <RenderPoll poll={currentPoll} />
        {:else}
            <div class="text-center">
                <h1 class="text-4xl font-bold mb-8">Welcome to TekTalk</h1>
                <p class="text-xl mb-8">
                    Join the interactive presentation experience!
                </p>

                <div class="max-w-md mx-auto bg-gray-800 rounded-lg p-6">
                    <h2 class="text-2xl mb-4">Your Session</h2>
                    <p class="mb-4">User ID: {userId}</p>
                    {#if slideId}
                        <p class="mb-4">Current Slide: {slideId}</p>
                    {/if}
                    <p class="text-sm text-gray-400">
                        Keep this page open to participate in polls and
                        interactions
                    </p>
                </div>
            </div>
        {/if}
    </div>
</main>
