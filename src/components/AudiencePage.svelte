<script lang="ts">
    import { onMount } from "svelte";
    import { yjsStore } from "../lib/stores/yjsStore.svelte";
    import { POLLS } from "../lib/constants/polls";
    import { useQueryParams } from "../lib/useParams.svelte";
    import RenderPoll from "./RenderPoll.svelte";
    import ReactionGrid from "./ReactionGrid.svelte";

    const [params, helpers] = useQueryParams(window.location);
    const userId = $derived(params.userId);

    const slideId = $derived(yjsStore.currentSlide);
    const pollSlideIds = Object.keys(POLLS);
    const currentPoll = $derived.by(() => {
        return pollSlideIds.includes(slideId)
            ? POLLS[slideId as keyof typeof POLLS]
            : null;
    });

    $effect(() => {
        console.log("userId", userId, slideId);
    });

    const showModal = $derived(!userId || userId.length < 3);

    function setUserId(inputUserId: string) {
        helpers.update({ userId: inputUserId });
    }
</script>

<main class="min-h-screen bg-gray-900 text-white text-xs">
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
                    React or ask questions during the presentation
                </p>
                <div class="mt-8">
                    <ReactionGrid />
                </div>
            </div>
        {/if}
    </div>
</main>
