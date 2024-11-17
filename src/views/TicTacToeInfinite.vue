<script setup>
import Game from '@/components/Game.vue'
import HowToPlay from '@/components/HowToPlay.vue'
import { useTicTacToeInfinite } from '@/composables/tictactoe'
import { isHowToPlayMenuOpened } from '@/stores/howToPlayMenu'

const { GAME_STATES, SYMBOLS, game, gameState, isPlayer1Turn, elementToBeRemoved, gameResultMessage, clickSquare, resetGame } = useTicTacToeInfinite()
</script>

<template>
  <Game :isPlaying="gameState != GAME_STATES.PLAYING" :gameResultMessage :isPlayer1Turn :resetGame>
    <div
        class="square"
        :class="{
          p1: game[i - 1] === SYMBOLS.P1,
          p2: game[i - 1] === SYMBOLS.P2,
          'to-be-removed': i - 1 === elementToBeRemoved
        }"
        @click="() => clickSquare(i - 1)"
        v-for="i in 9"
      ></div>
  </Game>
  <HowToPlay v-if="isHowToPlayMenuOpened">
    <p>The same rules as the tic tac toe, but there can only be six symbols at a time.</p>
    <p>When the six-th symbol is placed, the oldest "X" or "O" placed is marked to be removed and when the player places a "X" or "O", that symbol is removed. Also the oldest "X" or "O" can not be used to win a game!</p>
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
.square.to-be-removed {
  opacity: 0.3;
}

p {
  margin-top: 10px;
}
</style>
