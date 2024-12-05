<script lang="ts">
  import InteractivityIntro from "./sections/InteractivityIntro.svelte";
  import TableTennisApp from "./sections/TableTennisApp.svelte";
  import JuxtPong from "./sections/JuxtPong.svelte";
  import TechnicalDeepDive from "./sections/TechnicalDeepDive.svelte";
  import { Link2Icon } from "lucide-svelte";
  import QrCode from "svelte-qrcode";
</script>

<section>
  <section id="title-slide">
    <div class="flex flex-col items-center justify-center pt-8">
      <h2>Architectural Patterns for Real-Time Collaborative Applications</h2>
      <em>by Alex Davis</em>
      <QrCode value="https://tektalk.uk" background="#2e3440" color="white" />
      <a
        href="https://tektalk.uk"
        class="text-lg uppercase flex gap-2 text-center"
      >
        tektalk.uk <Link2Icon class="w-4 h-4" />
      </a>
    </div>
  </section>

  <section id="qr-focus" data-auto-animate>
    <div class="flex flex-col items-center justify-center">
      <QrCode value="https://tektalk.uk" background="#2e3440" color="white" />
      <a
        href="https://tektalk.uk"
        class="text-lg uppercase flex gap-2 text-center"
      >
        tektalk.uk <Link2Icon class="w-4 h-4" />
      </a>
      <p class="text-sm">
        Hit the ? icon during the presentation to leave a question and it will
        be linked to the current slide
      </p>
    </div>
  </section>
  <InteractivityIntro />
  <TableTennisApp />
  <JuxtPong />
  <TechnicalDeepDive />
</section>

<style>
  .qr-container {
    text-align: center;
  }
</style>
