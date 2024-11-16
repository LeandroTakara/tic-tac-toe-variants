<script setup>
  import { defineProps, computed } from 'vue'

  const props = defineProps({
    isPlayer1Turn: Boolean
  })

  const currentPlayerIcon = computed(() => ({
    p1: props.isPlayer1Turn,
    p2: !props.isPlayer1Turn,
  }))
</script>

<template>
  <div class="game-info">
    <span class="player-icon" :class="currentPlayerIcon"></span>
    <span class="player-name">Player {{ isPlayer1Turn ? '1' : '2' }}</span>
  </div>
</template>

<style scoped>
  .game-info {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 10px;
    height: 70px;
    width: max-content;
    padding: 10px;
    margin: 0 auto 40px;
    border-radius: 10px;
    background-color: var(--main-color2);
    box-shadow: 5px 5px 0 0 var(--black-shadow), inset -4px -4px 20px 0 var(--black-shadow);
  }

  .player-icon {
    position: relative;
    width: 40px;
  }
  .player-icon.p1 {
    --height: 40px;
    --width: 5px;
  }
  .player-icon.p2 {
    --radius: 30px;
    --width: 5px;
  }

  .player-name {
    color: white;
    font-size: 1.5rem;
    text-shadow: 0 0 25px var(--white-shadow);
  }
</style>
