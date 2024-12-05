<script lang="ts">
    import { POLL_IDS, POLLS } from "../../lib/constants/polls";
    import PollResults from "../../components/PollResults.svelte";

    const currentPoll = POLLS[POLL_IDS.INTERACTIVITY];
</script>

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
