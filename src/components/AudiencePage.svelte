<script lang="ts">
    import { onMount } from "svelte";
    import { yjsStore } from "../lib/stores/yjsStore.svelte";
    import { POLLS } from "../lib/constants/polls";
    import RenderPoll from "./RenderPoll.svelte";
    import ReactionGrid from "./ReactionGrid.svelte";

    let userId: string | null = $state(null);
    let showModal = $state(false);

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        userId = urlParams.get("userId");

        if (!userId) {
            showModal = true;
        }
    });

    const slideId = $derived(yjsStore.currentSlide);
    const pollSlideIds = Object.keys(POLLS);
    const currentPoll = $derived.by(() => {
        return pollSlideIds.includes(slideId)
            ? POLLS[slideId as keyof typeof POLLS]
            : null;
    });

    function setUserId(inputUserId: string) {
        userId = inputUserId;
        showModal = false;
    }
</script>

<main class="min-h-screen bg-gray-900 text-white">
    {#if showModal}
        <div
            class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
        >
            <div class="bg-white text-black p-8 rounded-lg w-11/12">
                <h2 class="text-2xl mb-4">Enter Your ID</h2>
                <!-- svelte-ignore a11y_autofocus -->
                <input
                    type="text"
                    class="border p-2 w-full"
                    placeholder="Enter your three-letter code or name"
                    onchange={(e) =>
                        setUserId((e.target as HTMLInputElement).value)}
                    autofocus
                />
            </div>
        </div>
    {/if}

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

                <div class="mt-8">
                    <h2 class="text-2xl mb-4">React to the presentation</h2>
                    <ReactionGrid />
                </div>
            </div>
        {/if}
    </div>
</main>
