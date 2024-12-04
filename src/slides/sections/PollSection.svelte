<script lang="ts">
    import { presentationStore } from "../../stores/presentationStore";

    const store = presentationStore;

    const currentSlideId = $derived.by(() => {
        return $store.currentSlide?.id;
    });

    const poll1Id = "interactivity-poll-results";
    const poll2Id = "spin-app-poll-results";

    $effect(() => {
        if (currentSlideId === poll1Id) {
            console.log("trigger poll 1");
        }
    });
</script>

<section
    id={poll1Id}
    data-transition="slide"
    data-state="trigger-poll"
    data-background-transition="zoom"
>
    Poll
    <p>How many of you have experienced interactivity in a Presentation?</p>
    <div class="poll-container">
        <!-- Poll results will be dynamically inserted here -->
    </div>
    <aside class="notes">This slide triggers the audience poll</aside>
</section>

<section
    id={poll2Id}
    data-transition="slide"
    data-state="trigger-poll"
    data-background-transition="zoom"
>
    <div class="poll-container">
        <h3>Would you be willing to:</h3>
        <div class="setup-steps">
            <ul>
                <li>Download a specialized app</li>
                <li>Set up a tripod, lights, and backdrop</li>
                <li>Draw specific tracking dots on your ball</li>
                <li>Position a laptop nearby</li>
            </ul>
        </div>
    </div>
</section>

<style>
    .poll-container {
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .setup-steps {
        margin: 15px 0;
    }

    .setup-steps ul {
        padding-left: 20px;
    }
</style>
