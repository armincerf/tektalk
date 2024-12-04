<script lang="ts">
    // No script needed for now
</script>

<section
    id="Motivation for building"
    data-transition="slide"
    data-background-transition="zoom"
>
    <h2>Find the right project</h2>
    <ul>
        <li>Something you have a connection to</li>
        <li>Ideally something nieche</li>
        <li>Something useful to people other than just yourself</li>
        <li>
            Something you have the capacity to build in a reasonable amount of
            time
        </li>
        <li>An area full of manual effort just waiting to be automated</li>
    </ul>
    <aside class="notes">Something that can be indefinitely maintained</aside>
</section>

<section
    id="First attempt"
    data-transition="slide"
    data-background-transition="zoom"
>
    <h1>Spin Analysis App</h1>
    <h3>This wasn't a great project because:</h3>
    <ul>
        <li>Realisticly not possible to distribute cheaply</li>
        <li>Not really that useful for most people</li>
    </ul>
</section>

<section
    id="First attempt images"
    data-transition="slide"
    data-background-transition="zoom"
>
    <div class="r-stack">
        <img src="images/spin-app/setup.jpg" alt="Setup for spin analysis" />
        <img
            src="images/spin-app/tracking.jpg"
            alt="Ball tracking in action"
            class="fragment"
        />
        <img
            src="images/spin-app/results.jpg"
            alt="Analysis results"
            class="fragment"
        />
    </div>
</section>

<section
    id="Second attempt"
    data-transition="slide"
    data-background-transition="zoom"
>
    <h1>Interactive Presentations</h1>
    <h3>This is a better project because:</h3>
    <ul>
        <li>Easy to distribute (just a website)</li>
        <li>Useful for many presenters</li>
        <li>Solves a real problem (engagement)</li>
        <li>Reasonable scope</li>
    </ul>
</section>

<section
    id="Tech stack"
    data-transition="slide"
    data-background-transition="zoom"
>
    <h2>Tech Stack</h2>
    <div class="grid grid-cols-2 gap-4">
        <div>
            <h3>Frontend</h3>
            <ul>
                <li>SvelteKit</li>
                <li>TailwindCSS</li>
                <li>RevealJS</li>
            </ul>
        </div>
        <div>
            <h3>Backend</h3>
            <ul>
                <li>Cloudflare Workers</li>
                <li>Durable Objects</li>
                <li>WebSockets</li>
            </ul>
        </div>
    </div>
</section>

<section
    id="Demo time"
    data-transition="slide"
    data-background-transition="zoom"
>
    <h1>Demo Time!</h1>
    <p>Let's see it in action</p>
</section>

<style>
    .r-stack img {
        max-height: 70vh;
        width: auto;
    }

    .grid {
        display: grid;
        margin: 2rem;
    }

    .grid-cols-2 {
        grid-template-columns: repeat(2, 1fr);
    }

    .gap-4 {
        gap: 1rem;
    }
</style>
