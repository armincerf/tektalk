<script lang="ts">
    import { yjsStore } from "../lib/stores/yjsStore.svelte";
    import { useQueryParams } from "../lib/useParams.svelte";
    import QuestionModal from "./QuestionModal.svelte";

    let showQuestionModal = $state(false);
    const [params, helpers] = useQueryParams(window.location);
    const userId = $derived(params.userId || "Anon");
    const currentSlideId = $derived(yjsStore.currentSlide);
    const reactions = [
        { emoji: "\u{1F44B}", id: "wave" },
        { emoji: "\u{1F44F}", id: "clap" },
        { emoji: "\u{1F92F}", id: "explode" },
        { emoji: "\u{1F44D}", id: "thumbsup" },
        { emoji: "\u{1F44E}", id: "thumbsdown" },
        { emoji: "💬", id: "question" },
    ];

    function handleReaction(reactionId: string) {
        if (reactionId === "question") {
            showQuestionModal = true;
            return;
        }
        yjsStore.updateReaction(reactionId);
    }

    function handleQuestionSubmit(question: string) {
        yjsStore.submitQuestion({
            question,
            userId,
            slideId: currentSlideId,
        });
        showQuestionModal = false;
    }
</script>

<div class="grid grid-cols-3 gap-4 max-w-md mx-auto">
    {#each reactions as { emoji, id }}
        <button
            class="text-4xl p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            onclick={() => handleReaction(id)}
        >
            {emoji}
        </button>
    {/each}
</div>

{#if showQuestionModal}
    <QuestionModal
        onSubmit={(text) => handleQuestionSubmit(text)}
        onClose={() => (showQuestionModal = false)}
    />
{/if}
