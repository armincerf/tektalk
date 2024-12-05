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
                <p class="text-2xl mb-4 text-black">Enter a name</p>
                <form
                    class="flex flex-col gap-4"
                    onsubmit={(e) => {
                        e.preventDefault();
                        setUserId((e.target as HTMLInputElement).value);
                    }}
                >
                    <!-- svelte-ignore a11y_autofocus -->
                    <input
                        onchange={(e) =>
                            setUserId((e.target as HTMLInputElement).value)}
                        type="text"
                        class="border p-2 w-full"
                        placeholder="Enter your JUXT code or name"
                        autofocus
                    />
                    <button type="submit" class="bg-black text-white p-2">
                        Enter
                    </button>
                </form>
            </div>
        </div>
    {/if}

    <div class="container mx-auto px-4 py-16">
        {#if currentPoll}
            <RenderPoll poll={currentPoll} />
        {:else}
            <div class="text-center">
                <div class="flex flex-row gap-4 justify-center items-center">
                    <img src="/juxtmas.png" alt="Juxtmas" class="h-12" />
                </div>
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
