<script setup>
import Game from '@/components/Game.vue'
import HowToPlay from '@/components/HowToPlay.vue'
import { useTicTacToe } from '@/composables/tictactoe'
import { isHowToPlayMenuOpened } from '@/stores/howToPlayMenu'

const { GAME_STATES, SYMBOLS, game, gameState, isPlayer1Turn, gameResultMessage, clickSquare, resetGame } = useTicTacToe()
</script>

<template>
  <Game :isPlaying="gameState != GAME_STATES.PLAYING" :gameResultMessage :isPlayer1Turn :resetGame>
    <div
      class="square"
      :class="{
        p1: game[i - 1] === SYMBOLS.P1,
        p2: game[i - 1] === SYMBOLS.P2,
      }"
      @click="() => clickSquare(i - 1)"
      v-for="i in 9"
    ></div>
  </Game>
  <HowToPlay v-if="isHowToPlayMenuOpened">
    <p>The normal version of tic tac toe.</p>
    <p>Each players takes turn to place a "X" or "O" in the game grid and the first one to make three in a row wins.</p>
  </HowToPlay>
</template>

<style scoped>
.square {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: var(--square-color);
  cursor: pointer;
  box-shadow: 5px 5px 0 0 var(--black-shadow), inset -4px -4px 20px 0 var(--black-shadow);
}
.square:hover {
  background-color: var(--square-color-hover);
}
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
