<script lang="ts">
    import { MessageCircleQuestion } from "lucide-svelte";
    import { yjsStore } from "../lib/stores/yjsStore.svelte";

    let showQuestion = $state(false);
    let dragPosition = $state({ x: 20, y: 80 }); // Default position
    let isDragging = $state(false);
    let dragStart = { x: 0, y: 0, posX: 0, posY: 0 };

    const questions = $derived(yjsStore.questions);
    const currentSlide = $derived(yjsStore.currentSlide);

    let currentQuestionIndex = $state(0);

    const allQuestions = $derived.by(() => {
        const questionsArray = [];
        console.log("allQuestions", questions);
        for (const [slideId, slideQuestions] of questions.entries()) {
            questionsArray.push(
                ...slideQuestions.map((q) => ({ ...q, slideId })),
            );
        }
        return questionsArray;
    });
    const questionsCount = $derived(allQuestions.length);

    let originalSlideId = $state("");

    function navigateToQuestion(index: number) {
        const question = allQuestions[index];
        if (question) {
            // Store current slide ID when first opening the popup
            if (!showQuestion) {
                originalSlideId = currentSlide;
            }
            // Update browser history and navigate to slide
            window.history.pushState({}, "", `/slides#${question.slideId}`);
            window.dispatchEvent(
                new CustomEvent("navigateToSlide", {
                    detail: { slideId: question.slideId },
                }),
            );
            currentQuestionIndex = index;
            showQuestion = true;
        }
    }

    function handleDragStart(event: MouseEvent) {
        isDragging = true;
        dragStart = {
            x: event.clientX,
            y: event.clientY,
            posX: dragPosition.x,
            posY: dragPosition.y,
        };
    }

    function handleDragMove(event: MouseEvent) {
        if (!isDragging) return;

        const dx = event.clientX - dragStart.x;
        const dy = event.clientY - dragStart.y;

        dragPosition = {
            x: Math.max(
                0,
                Math.min(90, dragStart.posX + (dx / window.innerWidth) * 100),
            ),
            y: Math.max(
                0,
                Math.min(90, dragStart.posY + (dy / window.innerHeight) * 100),
            ),
        };
    }

    function handleDragEnd() {
        isDragging = false;
    }

    function closeQuestion() {
        showQuestion = false;
        if (originalSlideId) {
            window.history.pushState({}, "", `/slides#${originalSlideId}`);
            window.dispatchEvent(
                new CustomEvent("navigateToSlide", {
                    detail: { slideId: originalSlideId },
                }),
            );
        }
    }
</script>

<svelte:window on:mousemove={handleDragMove} on:mouseup={handleDragEnd} />

<!-- Question Counter -->
<button
    class="fixed top-4 right-4 p-2 bg-gray-800 bg-opacity-75 z-50 rounded-full flex items-center gap-2"
    onclick={() => navigateToQuestion(0)}
>
    <span class="text-sm">{questionsCount}</span>
    <MessageCircleQuestion />
</button>

<!-- Floating Question Display -->
{#if showQuestion && allQuestions[currentQuestionIndex]}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        class="fixed z-50 bg-gray-800 bg-opacity-90 p-4 rounded-lg cursor-move"
        style="left: {dragPosition.x}%; top: {dragPosition.y}%;"
        onmousedown={handleDragStart}
    >
        <div class="flex items-center gap-4 mb-2">
            <button
                class="px-2 py-1 bg-gray-700 rounded disabled:opacity-50"
                disabled={currentQuestionIndex === 0}
                onclick={() => navigateToQuestion(currentQuestionIndex - 1)}
            >
                Previous
            </button>
            <button
                class="px-2 py-1 bg-gray-700 rounded disabled:opacity-50"
                disabled={currentQuestionIndex === allQuestions.length - 1}
                onclick={() => navigateToQuestion(currentQuestionIndex + 1)}
            >
                Next
            </button>
            <button
                class="px-2 py-1 bg-gray-700 rounded text-red-400"
                onclick={() => {
                    const question = allQuestions[currentQuestionIndex];
                    yjsStore.markQuestionAsRead(question.slideId, question.id);
                    if (currentQuestionIndex >= allQuestions.length - 1) {
                        currentQuestionIndex = Math.max(0, allQuestions.length - 2);
                    }
                    if (allQuestions.length <= 1) {
                        closeQuestion();
                    }
                }}
            >
                Mark as Read
            </button>
            <button
                class="ml-auto px-2 py-1 bg-gray-700 rounded"
                onclick={closeQuestion}
            >
                ✕
            </button>
        </div>
        <div class="max-w-md">
            <p>User: {allQuestions[currentQuestionIndex].userId}</p>
            {allQuestions[currentQuestionIndex].question}
        </div>
    </div>
{/if}
