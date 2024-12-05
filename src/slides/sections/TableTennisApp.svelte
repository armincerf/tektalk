<script lang="ts">
    import { yjsStore } from "../../lib/stores/yjsStore.svelte";
    import { POLL_IDS, POLLS } from "../../lib/constants/polls";
    import PollResults from "../../components/PollResults.svelte";

    const slideId = $derived(yjsStore.currentSlide);
    let showSpinVideo = $state(true);

    $effect(() => {
        if (slideId === POLL_IDS.SPIN_APP) {
            console.log("trigger poll");
        }
    });
</script>

<section
    id="Spin Analysis App"
    data-transition="slide"
    data-background-transition="zoom"
>
    {#if showSpinVideo}
        <video
            src="videos/spin-app.mp4"
            autoplay
            controls
            muted
            onended={() => (showSpinVideo = false)}
        />
    {:else}
        <h1>Spin Analysis App</h1>
        <h3>This wasn't a great project because:</h3>
        <ul>
            <li>Realisticly not possible to distribute cheaply</li>
            <li>Not really that useful for most people</li>
        </ul>
    {/if}
</section>

<section
    id={POLL_IDS.SPIN_APP}
    data-transition="slide"
    data-state="trigger-poll"
>
    <div class="p-5 rounded-lg shadow-md">
        <h3>Would you be willing to:</h3>
        <ul class="text-left pl-5 my-4">
            <li>Download a specialized app</li>
            <li>Set up a tripod, lights, and backdrop</li>
            <li>Draw specific tracking dots on your ball</li>
        </ul>
        <PollResults poll={POLLS[POLL_IDS.SPIN_APP]} showTitle={false} />
    </div>
</section>

<section
    id="practical-solution"
    data-transition="slide"
    data-background-transition="zoom"
>
    <h2>Time for Something More Practical</h2>
    <ul>
        <li class="fragment fade-up">Needed to solve a real problem</li>
        <li class="fragment fade-up">More accessible to wider audience</li>
    </ul>
</section>

<section id="league-opportunity" data-transition="slide">
    <h2>Existing Table Tennis League System</h2>
    <div class="fragment fade-up">
        <img src="paper-scorecard.jpg" alt="Paper Scorecard" />
    </div>
</section>

<section id="league-opportunity" data-transition="slide">
    <h2>A New Opportunity</h2>
    <div class="fragment fade-up">
        <h3>Single Player League Concept</h3>
        <ul>
            <li>Alternative to team leagues</li>
            <li>Flexible commitment</li>
            <li>Drop-in friendly</li>
            <li>Minimal admin overhead</li>
        </ul>
    </div>
    <div class="fragment fade-up">
        <h3>The Challenge</h3>
        <p>How to organize matchups with unpredictable attendance?</p>
        <p class="fragment fade-up">Answer: Computers! 🖥️</p>
    </div>
</section>

<section
    id="grand-design"
    data-transition="slide"
    data-background-transition="zoom"
    class="relative h-full w-full"
>
    <h2 style="position: absolute; top: 0; width: 100%;">The Grand Design</h2>
    <div class="r-stack pt-10 h-full">
        <img
            class="fragment fade-up"
            src="TTRankings-Explainer.001.jpeg"
            alt="System Architecture"
        />
        <img
            class="fragment fade-up"
            src="TTRankings-Explainer.002.jpeg"
            alt="System Architecture"
        />
        <img
            class="fragment fade-up"
            src="TTRankings-Explainer.003.jpeg"
            alt="System Architecture"
        />
        <img
            class="fragment fade-up"
            src="TTRankings-Explainer.004.jpeg"
            alt="System Architecture"
        />
    </div>
</section>

<section id="success-story" data-transition="slide">
    <h2>A Success Story (eventually)</h2>
    <div class="fragment fade-up">
        <p>Several technical challenges:</p>
        <ul class="fragment fade-up">
            <li>Cost-effective hosting</li>
            <li>Simple maintenance</li>
            <li>Reliable performance</li>
            <li>Minimising race conditions</li>
        </ul>
    </div>
</section>

<section id="ttrankings-photos" data-transition="slide">
    <div class="r-stack">
        <div class="fragment fade-out" data-fragment-index="0">
            <video src="videos/ttrankings-live.mp4" autoplay controls muted />
        </div>
        <div
            class="image-gallery fragment fade-out current-visible"
            data-fragment-index="0"
        >
            <!-- Add your success images here -->
            <img src="scoreboard.jpeg" alt="Scoreboard" />
        </div>
        <div class="image-gallery fragment">
            <video src="videos/ttmk.mp4" autoplay controls muted />
        </div>
    </div>
</section>

<section id="website-showcase" data-transition="slide">
    <h2>ttrankings.com</h2>
    <div class="fragment fade-up">
        <ul>
            <li>Live leaderboard</li>
            <li>Upcoming events</li>
            <li>Global scaling architecture</li>
        </ul>
    </div>
</section>

<section id="live-demo-intro" data-transition="slide">
    <h2>JUXTPong</h2>
</section>
