<script setup>
  import { defineEmits } from 'vue'

  const emit = defineEmits(['openHowToPlay'])

  function openHowToPlay() {
    emit('openHowToPlay')
  }
</script>

<template>
  <header class="main-header">
    <div class="header-max">
      <div class="main-content">
        <h1    class="logo">
          <span class="logo-part1">TicTacToe</span>
          <span class="logo-part2">Variants #</span>
          <span class="game-name">{{ $route.name }}</span>
        </h1  >

        <nav>
          <ul class="game-variants">
            <li class="game-variant-item"><a class="game-variant-link" href="/">Classic</a></li>
            <li class="game-variant-item"><a class="game-variant-link" href="/infinite">Infinite</a></li>
            <li class="game-variant-item"><a class="game-variant-link" href="/super">Super</a></li>
          </ul>
        </nav>
      </div>
      <div class="bottom-content">
        <button class="howToPlayButton" @click="openHowToPlay">
          <img src="@/assets/question_mark.png" alt="How to play">
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
  .main-header {
    height: 70px;
    padding-inline: 30px;
    background-color: var(--main-color2);
    font-family: "Poppins", sans-serif;
    box-shadow: 0px 0 12px 6px rgba(0, 0, 0, 0.1);
  }

  .header-max {
    max-width: 900px;
    height: inherit;
    margin: 0 auto;
  }

  .main-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: inherit;
  }

  .logo {
    position: relative;
    font-size: 20px;
    text-shadow: 3px 3px 7px black;
  }

  .logo-part1 {
    position: absolute;
    top: -1.2em;
    left: 1.2em;
    color: white;
    text-decoration: underline;
  }

  .logo-part2 {
    position: absolute;
    top: -1em;
    color: white;
    width: max-content;
  }
  .logo-part2::first-letter {
    font-size: 1.7em;
  }

  .game-name {
    position: absolute;
    top: 50%;
    translate: 0 -50%;
    left: 4.5em;
    color: white;
    font-size: 1.5em;
  }
  .game-name::first-letter {
    text-transform: capitalize;
  }

  .game-variants {
    display: flex;
    column-gap: 20px;
  }

  .game-variant-item {
    list-style-type: none;
  }

  .game-variant-link {
    color: white;
    text-decoration: none;
  }
  .game-variant-link:hover {
    text-shadow: 0 0 4px white;
  }

  .bottom-content {
    margin-top: 10px;
  }

  .howToPlayButton {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;
    width: 25px;
    background-color: var(--main-color2);
    border-radius: 100%;
    cursor: pointer;
  }

  .howToPlayButton img {
    height: 60%;
    width: 60%;
  }
</style>
