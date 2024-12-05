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
      <h2>Building Collaborative Applications</h2>
      <em class="flex flex-col"
        >by Alex Davis
        <a href="https://github.com/armincerf">https://github.com/armincerf</a>
      </em>
      <div class="relative flex flex-col gap-2 items-center justify-center">
        <QrCode value="https://tektalk.uk" background="#2e3440" color="white" />
        <div class="flex gap-2 items-center">
          <p class="text-sm">
            Scan this QR code to join the audience - or visit
          </p>
          <a
            href="https://tektalk.uk"
            class="text-lg uppercase flex gap-2 text-center"
          >
            tektalk.uk <Link2Icon class="w-4 h-4" />
          </a>
        </div>
      </div>
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
