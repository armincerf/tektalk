<script lang="ts">
    import { yjsStore } from "../../lib/stores/yjsStore.svelte";
    import { POLL_IDS } from "../../lib/constants/polls";

    const slideId = $derived(yjsStore.currentSlide);

    $effect(() => {
        if (slideId === POLL_IDS.SPIN_APP) {
            console.log("trigger poll");
        }
    });
</script>

<section id="First attempt" data-transition="slide">
    <h1>Spin Analysis App</h1>
    <h3>This wasn't a great project because:</h3>
    <ul class="text-left">
        <li class="fragment fade-up">
            Realisticly not possible to distribute cheaply
        </li>
        <li class="fragment fade-up">Not really that useful for most people</li>
    </ul>
</section>

<section id="First attempt images" data-transition="slide">
    <div class="r-stack">
        <img
            src="images/spin-app/setup.jpg"
            alt="Setup for spin analysis"
            class="h-[70vh] w-auto"
        />
        <img
            src="images/spin-app/tracking.jpg"
            alt="Ball tracking in action"
            class="fragment h-[70vh] w-auto"
        />
        <img
            src="images/spin-app/results.jpg"
            alt="Analysis results"
            class="fragment h-[70vh] w-auto"
        />
    </div>
</section>

<section
    id={POLL_IDS.SPIN_APP}
    data-transition="slide"
    data-state="trigger-poll"
>
    <div class="p-5 rounded-lg shadow-md">
        <h3>Would you be willing to:</h3>
        <ul class="text-left pl-5 mt-4">
            <li class="fragment fade-up">Download a specialized app</li>
            <li class="fragment fade-up">
                Set up a tripod, lights, and backdrop
            </li>
            <li class="fragment fade-up">
                Draw specific tracking dots on your ball
            </li>
            <li class="fragment fade-up">Position a laptop nearby</li>
        </ul>
    </div>
</section>
