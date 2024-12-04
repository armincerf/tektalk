<script lang="ts">
  import { getSlideContext } from "../context/SlideContext";

  type Props = {
    canvasEl?: HTMLCanvasElement;
  };

  let { canvasEl }: Props = $props();
  const slideState = getSlideContext();

  let currentSlideId = $derived.by(() => {
    return slideState.currentSlide?.id;
  });

  $effect(() => {
    // Subscribe to poll results here
  });

  const handleAudienceDeviceUpdate = () => {
    // Logic to show poll on audience devices
  };
</script>

<section>
  <section id="title-slide">
    <div class="w-screen h-screen flex flex-col items-center justify-center">
      <div style="position: absolute; top: 20px; right: 20px;">
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
      class="qr-container"
      style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
    >
      <img src="qr-code.png" alt="QR Code" style="width: 300px;" />
      <p>tektalk.uk</p>
    </div>
  </section>

  <section
    id="poll-results"
    data-transition="slide"
    data-state="trigger-poll"
    data-background-transition="zoom"
  >
    <div class="poll-container">
      <!-- Poll results will be dynamically inserted here -->
    </div>

    <aside class="notes">This slide triggers the audience poll</aside>
  </section>
</section>

<style>
  .qr-container {
    text-align: center;
  }
  .poll-container {
    width: 80%;
    margin: 0 auto;
  }
</style>
