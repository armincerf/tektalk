<script lang="ts">
    import { onMount } from "svelte";

    let leftPaddleY = Math.random() * 100;
    let rightPaddleY = Math.random() * 100;
    let ballX = 50;
    let ballY = 50;
    let ballVelocityX = 0.5;
    let ballVelocityY = 0.3;

    // Paddle velocity
    let leftPaddleVelocity = 0.5;
    let rightPaddleVelocity = 0.5;

    // Paddle and ball sizes in percentage
    const paddleHeight = 20; // in percentage
    const paddleWidth = 20; // in percentage
    const ballSize = 10; // in percentage

    // Scores
    let leftPlayerScore = 0;
    let rightPlayerScore = 0;

    const updatePositions = () => {
        // Update paddles
        leftPaddleY += leftPaddleVelocity;
        if (leftPaddleY > 100 - paddleHeight / 2 || leftPaddleY < paddleHeight / 2)
            leftPaddleVelocity *= -1;

        rightPaddleY += rightPaddleVelocity;
        if (rightPaddleY > 100 - paddleHeight / 2 || rightPaddleY < paddleHeight / 2)
            rightPaddleVelocity *= -1;

        // Update ball
        ballX += ballVelocityX;
        ballY += ballVelocityY;

        // Ball collision with top and bottom
        if (ballY >= 100 - ballSize / 2 || ballY <= ballSize / 2) ballVelocityY *= -1;

        // Ball collision with left paddle
        if (
            ballX - ballSize / 2 <= 5 + paddleWidth / 2 && // Left paddle position and width
            ballY + ballSize / 2 >= leftPaddleY - paddleHeight / 2 &&
            ballY - ballSize / 2 <= leftPaddleY + paddleHeight / 2
        ) {
            ballVelocityX *= -1;
            ballX = 5 + paddleWidth / 2 + ballSize / 2; // Prevent ball from sticking to paddle
        }

        // Ball collision with right paddle
        if (
            ballX + ballSize / 2 >= 95 - paddleWidth / 2 && // Right paddle position and width
            ballY + ballSize / 2 >= rightPaddleY - paddleHeight / 2 &&
            ballY - ballSize / 2 <= rightPaddleY + paddleHeight / 2
        ) {
            ballVelocityX *= -1;
            ballX = 95 - paddleWidth / 2 - ballSize / 2; // Prevent ball from sticking to paddle
        }

        // Ball out of bounds
        if (ballX < 0) {
            // Right player scores
            rightPlayerScore += 1;
            resetBall();
        }

        if (ballX > 100) {
            // Left player scores
            leftPlayerScore += 1;
            resetBall();
        }

        // Continue animation
        requestAnimationFrame(updatePositions);
    };

    function resetBall() {
        ballX = 50;
        ballY = 50;
        // Randomize ball direction
        ballVelocityX = (Math.random() > 0.5 ? 1 : -1) * 0.5;
        ballVelocityY = (Math.random() > 0.5 ? 1 : -1) * 0.3;
    }

    onMount(() => {
        updatePositions();
    });
</script>

<section
    id="juxtpong-demo"
    data-transition="slide"
    class="relative bg-black w-full h-screen overflow-hidden"
>
    <img class="invert scale-50" src="/juxtpong-logo.png" alt="juxtpong logo" />
    <!-- Left Paddle -->
    <img
        src="/mal.png"
        alt="Left Paddle"
        class="absolute"
        style="
            left: 5%;
            top: {leftPaddleY}%;
            width: {paddleWidth}%;
            height: {paddleHeight}%;
            transform: translate(-50%, -50%);
        "
    />

    <!-- Right Paddle -->
    <img
        src="/jon.png"
        alt="Right Paddle"
        class="absolute"
        style="
            left: 95%;
            top: {rightPaddleY}%;
            width: {paddleWidth}%;
            height: {paddleHeight}%;
            transform: translate(-50%, -50%);
        "
    />

    <!-- Ball -->
    <img
        src="/ball.png"
        alt="Ball"
        class="absolute"
        style="
            left: {ballX}%;
            top: {ballY}%;
            width: {ballSize}%;
            height: {ballSize}%;
            transform: translate(-50%, -50%);
        "
    />

    <!-- Scores -->
    <div class="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white text-4xl">
        {leftPlayerScore} - {rightPlayerScore}
    </div>
</section>

<section>
    <h2>JUXT and the magic XTDBeanstalk</h2>
    <img src="/xtdbeanstalk.png" alt="XTDBeanstalk" />
</section>
