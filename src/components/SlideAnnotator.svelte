<script lang="ts">
    const { question, onSubmit, onClose } = $props<{
        question: string;
        onSubmit: (annotation: { x: number; y: number } | null) => void;
        onClose: () => void;
    }>();

    function handleClick(event: MouseEvent) {
        const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width) * 100;
        const y = ((event.clientY - bounds.top) / bounds.height) * 100;
        onSubmit({ x, y });
    }

    function handleGeneralQuestion() {
        onSubmit(null);
    }
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex flex-col z-50">
    <div class="bg-gray-800 p-4 text-center">
        Tap an area of the slide to attach your question
    </div>
    
    <div class="flex-1 relative" onclick={handleClick}>
        <!-- This would show a scaled version of the current slide -->
        <slot />
    </div>

    <div class="bg-gray-800 p-4 flex justify-center">
        <button
            class="px-4 py-2 bg-blue-600 rounded-lg"
            onclick={handleGeneralQuestion}
        >
            It's just a general question
        </button>
    </div>
</div> 