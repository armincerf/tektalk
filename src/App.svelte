<script lang="ts">
  import { onMount, tick } from "svelte";
  import Reveal from "reveal.js";
  import type { RevealApi } from "./types/reveal";
  import type { Config } from "./config";
  import Presentation from "./Presentation.svelte";
  import CanvasBg from "./lib/CanvasBG.svelte";
  import AudiencePage from "./components/AudiencePage.svelte";
  import { yjsStore } from "./lib/stores/yjsStore.svelte";
  import { POLLS } from "./lib/constants/polls";
  import ReactionDisplay from "./components/ReactionDisplay.svelte";
  import QuestionDisplay from "./components/QuestionDisplay.svelte";

  type Props = {
    app: Config["app"];
    reveal: Config["reveal"];
  };

  const { app, reveal }: Props = $props();
  // biome-ignore lint/style/useConst: <explanation>
  let canvasEL = $state<HTMLCanvasElement>();
  let deck = $state<RevealApi>();

  onMount(() => {
    // Initialize YJS store first - do this for all paths
    const { cleanup } = yjsStore.initializeStore();

    // Only initialize Reveal.js for the presenter view
    const path = window.location.pathname;
    if (path === "/slides") {
      deck = new Reveal(reveal) as RevealApi;
      deck.initialize();

      // Add event listener for question navigation
      window.addEventListener('navigateToSlide', ((event: CustomEvent) => {
        const slideId = event.detail.slideId;
        const slideElement = document.getElementById(slideId);
        if (slideElement && deck) {
          // Debug log to see what we're working with
          console.log('Slide element:', slideElement);
          console.log('data-id:', slideElement.getAttribute('data-id'));
          
          // Try using indices instead of data-id
          const indices = deck.getIndices(slideElement);
          console.log('Indices:', indices);
          if (indices) {
            deck.slide(indices.h, indices.v);
          }
        }
      }) as EventListener);

      deck.on("slidechanged", (event) => {
        const slideId = event.currentSlide?.getAttribute("id") || "";
        if (slideId) {
          yjsStore.updateSlideState(slideId);

          // Initialize poll if this is a poll slide
          if (slideId in POLLS) {
            const poll = POLLS[slideId as keyof typeof POLLS];
            yjsStore.initPoll({
              pollId: poll.id,
              questions: poll.options,
            });
          }
        }
      });
    }

    return () => {
      cleanup();
      // Clean up event listener
      if (path === "/slides") {
        window.removeEventListener('navigateToSlide', ((event: CustomEvent) => {
          const slideId = event.detail.slideId;
          const slideElement = document.getElementById(slideId);
          if (slideElement && deck) {
            // Debug log to see what we're working with
            console.log('Slide element:', slideElement);
            console.log('data-id:', slideElement.getAttribute('data-id'));
            
            // Try using indices instead of data-id
            const indices = deck.getIndices(slideElement);
            console.log('Indices:', indices);
            if (indices) {
              deck.slide(indices.h, indices.v);
            }
          }
        }) as EventListener);
      }
    };
  });
</script>

<svelte:head>
  <title>{app.name}</title>
</svelte:head>

{#if window.location.pathname === "/slides"}
  <div class="slides">
    <Presentation />
  </div>
  <ReactionDisplay />
  <QuestionDisplay />
  <CanvasBg bind:canvasEl={canvasEL} />
{:else}
  <AudiencePage />
{/if}
