<script setup>
import RestartButton from '@/components/RestartButton.vue'
import PlayerDisplay from '@/components/PlayerDisplay.vue'
import HowToPlay from '@/components/HowToPlay.vue'
import { useTicTacToe } from '@/composables/tictactoe'
import { isHowToPlayMenuOpened } from '@/stores/howToPlayMenu'

const { GAME_STATES, SYMBOLS, game, gameState, isPlayer1Turn, gameResultMessage, clickSquare, resetGame } = useTicTacToe()
</script>

<template>
  <PlayerDisplay :isPlayer1Turn="isPlayer1Turn" />

  <div class="game-area">
    <div class="game">
      <div
        class="square"
        :class="{
          p1: game[i - 1] === SYMBOLS.P1,
          p2: game[i - 1] === SYMBOLS.P2,
        }"
        @click="() => clickSquare(i - 1)"
        v-for="i in 9"
      ></div>
    </div>
    <Transition name="scale-result">
      <div class="game-result-container" v-if="gameState != GAME_STATES.PLAYING">
        <span class="game-result">{{ gameResultMessage }}</span>
        <RestartButton @click="resetGame" />
      </div>
    </Transition>
  </div>
  <HowToPlay v-if="isHowToPlayMenuOpened">
    <p>The normal version of tic tac toe.</p>
    <p>Each players takes turn to place a "X" or "O" in the game grid and the first one to make three in a row wins.</p>
  </HowToPlay>
</template>

<style scoped>
.square.p1 {
  --height: 70px;
  --width: 10px;
}
.square.p2 {
  --radius: 45px;
  --width: 10px;
}

p {
  margin-top: 10px;
}
</style>
