<script lang="ts">
    // No script needed for now
</script>

<section id="tech-stack" data-transition="slide">
    <h2>Tech Stack</h2>
    <div class="grid grid-cols-2 gap-4 m-8">
        <div>
            <h3>Frontend</h3>
            <ul class="text-left">
                <li class="fragment fade-up">Svelte</li>
                <li class="fragment fade-up">Shadcn/UI</li>
            </ul>
        </div>
        <div>
            <h3>Backend</h3>
            <ul class="text-left">
                <li class="fragment fade-up">
                    <a href="https://workers.cloudflare.com/"
                        >Cloudflare Workers</a
                    >
                </li>
                <li class="fragment fade-up">
                    <a
                        href="https://www.cloudflare.com/en-gb/developer-platform/products/durable-objects/"
                        >Durable Objects</a
                    >
                </li>
                <li class="fragment fade-up">
                    <a
                        href="https://blog.cloudflare.com/sqlite-in-durable-objects/"
                        >SQLite</a
                    >
                </li>
                <li class="fragment fade-up">
                    <a href="https://github.com/yjs/yjs">Yjs</a>
                </li>
                <li class="fragment fade-up">
                    <a href="https://triplit.dev">Triplit</a>
                </li>
            </ul>
        </div>
    </div>
</section>

<!-- Removed the Architecture Overview slide -->

<!-- Added slides with iframes containing links from the above section -->

<section id="cloudflare-workers" data-transition="slide">
    <h2>Cloudflare Workers</h2>
    <iframe src="https://workers.cloudflare.com/" width="100%" height="600px"
    ></iframe>
</section>

<section id="sqlite" data-transition="slide">
    <h2>Durable Objects</h2>
    <iframe
        src="https://blog.cloudflare.com/sqlite-in-durable-objects/"
        width="100%"
        height="600px"
    ></iframe>
</section>

<section id="yjs" data-transition="slide">
    <h2>Yjs</h2>
    <iframe
        class="bg-white"
        src="https://yjs.dev/#features"
        width="100%"
        height="600px"
    ></iframe>
</section>

<section id="triplit" data-transition="slide">
    <h2>Triplit</h2>
    <iframe src="https://triplit.dev" width="100%" height="600px"></iframe>
</section>

<section id="lessons-learned" data-transition="slide">
    <h2>Questions?</h2>
</section>
