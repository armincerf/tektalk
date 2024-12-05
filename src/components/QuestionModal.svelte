<script lang="ts">
    const { onSubmit, onClose } = $props<{
        onSubmit: (question: string) => void;
        onClose: () => void;
    }>();

    // biome-ignore lint/style/useConst: <explanation>
    let questionText = $state("");

    function handleSubmit() {
        if (questionText.trim()) {
            onSubmit(questionText);
        }
    }
</script>

<div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
>
    <div class="bg-gray-800 p-6 rounded-lg max-w-lg w-full mx-4">
        <h2 class="text-xl mb-4">Ask a Question</h2>
        <textarea
            class="w-full h-32 p-2 bg-gray-700 rounded-lg mb-4"
            placeholder="Type your question here..."
            bind:value={questionText}
        />
        <div class="flex justify-end gap-4">
            <button class="px-4 py-2 bg-gray-700 rounded-lg" on:click={onClose}>
                Cancel
            </button>
            <button
                class="px-4 py-2 bg-blue-600 rounded-lg"
                on:click={handleSubmit}
            >
                Submit
            </button>
        </div>
    </div>
</div>
