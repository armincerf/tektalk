<script lang="ts">
    import { yjsStore } from "../../lib/stores/yjsStore.svelte";
    import { POLL_IDS, POLLS } from "../../lib/constants/polls";
    import PollResults from "../../components/PollResults.svelte";

    const slideId = $derived(yjsStore.currentSlide);
    const currentPoll = POLLS[POLL_IDS.INTERACTIVITY];

    $effect(() => {
        if (slideId === POLL_IDS.INTERACTIVITY) {
            console.log("trigger poll");
        }
    });
</script>

<section id="why-interactivity" data-transition="slide">
    <h2>Why Interactive Presentations?</h2>
    <ul class="text-left">
        <li class="fragment fade-up">Increases audience engagement</li>
        <li class="fragment fade-up">Makes content more memorable</li>
        <li class="fragment fade-up">Provides real-time feedback</li>
        <li class="fragment fade-up">Makes presentations more fun!</li>
    </ul>
</section>

<section
    id={POLL_IDS.INTERACTIVITY}
    data-transition="slide"
    data-state="trigger-poll"
    data-background-transition="zoom"
>
    <div class="p-5 rounded-lg">
        <PollResults poll={currentPoll} />
    </div>
    <aside class="notes">This slide triggers the audience poll</aside>
</section>
