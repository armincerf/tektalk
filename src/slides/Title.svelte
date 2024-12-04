<script lang="ts">
  import InteractivityIntro from "./sections/InteractivityIntro.svelte";
  import TableTennisApp from "./sections/TableTennisApp.svelte";
  import JuxtPong from "./sections/JuxtPong.svelte";
  import TechnicalDeepDive from "./sections/TechnicalDeepDive.svelte";
</script>

<section>
  <section id="title-slide">
    <div class="w-screen h-screen flex flex-col items-center justify-center">
      <div class="absolute top-5 right-5">
        <img src="qr-code.png" alt="QR Code" />
        <p>tektalk.uk</p>
      </div>
      <h1>Alex Davis</h1>
      <h2>JUXTMas 2024</h2>
      <h3>Oxford</h3>
    </div>
  </section>

  <section id="qr-focus" data-auto-animate>
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
    >
      <img src="qr-code.png" alt="QR Code" class="w-[300px]" />
      <p>tektalk.uk</p>
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
