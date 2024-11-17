<script setup>
import { defineProps } from 'vue'
import ResetButton from '@/components/ResetButton.vue'
import PlayerDisplay from '@/components/PlayerDisplay.vue'

const props = defineProps({
  isPlayer1Turn: Boolean,
  isPlaying: Boolean,
  gameResultMessage: String,
  resetGame: Function,
})
</script>

<template>
  <PlayerDisplay :isPlayer1Turn />
  <div class="game-area">
    <div class="game">
      <slot/>
    </div>
    <Transition name="scale-result">
      <div class="game-result-container" v-if="isPlaying">
        <span class="game-result">{{ gameResultMessage }}</span>
        <ResetButton @click="resetGame" />
      </div>
    </Transition>
  </div>

</template>

<style scoped>
.game-area {
  position: relative;
  margin: 0 auto;
  width: min-content;
}

.game {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 15px;
}

.game-result-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 110%;
  height: 110%;
  border-radius: 10px;
  border: solid black 3px;
  background-color: rgba(74, 48, 93, 0.8);
  z-index: 2;
}

.game-result {
  color: white;
  font-size: 3rem;
  text-shadow: 0 0 25px var(--white-shadow);
}

/* transitions */
.scale-result-enter-active, .scale-result-leave-active {
  transition-property: transform, opacity;
  transition-duration: 0.7s;
}
.scale-result-enter-from, .scale-result-leave-to {
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
}
</style>
