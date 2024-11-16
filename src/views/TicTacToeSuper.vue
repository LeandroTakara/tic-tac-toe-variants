<script setup>
import RestartButton from '@/components/RestartButton.vue'
import PlayerDisplay from '@/components/PlayerDisplay.vue'
import HowToPlay from '@/components/HowToPlay.vue'
import { useTicTacToeSuper } from '@/composables/tictactoe'
import { isHowToPlayMenuOpened } from '@/stores/howToPlayMenu'

const { GAME_STATES, SYMBOLS, gameState, subGames, subGamesResults, activeSubGame, isPlayer1Turn, gameResultMessage, clickSquare, resetGame } = useTicTacToeSuper()
</script>

<template>
  <PlayerDisplay :isPlayer1Turn="isPlayer1Turn" />

  <div class="game-area">
    <div class="game">
      <div
        class="sub-game"
        :class="{
          disabled: subGamesResults[i - 1] !== GAME_STATES.PLAYING || (activeSubGame !== -1 && i - 1 !== activeSubGame)
        }"
        v-for="i in 9"
      >
        <div class="sub-game-result"
        :class="{
          p1: subGamesResults[i - 1] === GAME_STATES.PLAYER1_WIN,
          p2: subGamesResults[i - 1] === GAME_STATES.PLAYER2_WIN,
          draw: subGamesResults[i - 1] === GAME_STATES.DRAW,
        }"
        ></div>
        <div
          class="square"
          :class="{
            p1: subGames[i - 1][j - 1] === SYMBOLS.P1,
            p2: subGames[i - 1][j - 1] === SYMBOLS.P2,
          }"
          v-for="j in 9"
          @click="() => clickSquare(i - 1, j - 1)"
        ></div>
      </div>
    </div>
    <Transition name="scale-result">
      <div class="game-result-container" v-if="gameState != GAME_STATES.PLAYING">
        <span class="game-result">{{ gameResultMessage }}</span>
        <RestartButton @click="resetGame" />
      </div>
    </Transition>
  </div>
  <HowToPlay v-if="isHowToPlayMenuOpened">
    <p>The rules are the same as the tic tac toe, except for these ones:</p>
    <ul>
      <li>The first play can be done in any subgame</li>
      <li>The place the "X" or "O" is in to determines where to play next, e.g., "X" was placed on the middle square of the top-left subgame, so the next player must play in the middle subgame.</li>
      <li>When the player wins a subgame, this subgame is marked as a win for that player or draw if none has won.</li>
      <li>If any player places an "X" or "O" that directs the other player to play in a completed subgame, then the next player can play anywhere.</li>
      <li>Wins the player that makes three subgames in a row.</li>
    </ul>
  </HowToPlay>
</template>

<style scoped>
.game {
  grid-template-columns: repeat(3, 120px);
  grid-template-rows: repeat(3, 120px);
  gap: 30px;
}

.sub-game {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
}

.sub-game-result {
  position: absolute;
}
.sub-game-result:is(.p1, .p2, .draw) {
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  height: 110%;
  width: 110%;
  border-radius: 10px;
  background-color: var(--square-color);
  box-shadow: 5px 5px 0 0 var(--black-shadow), inset -4px -4px 20px 0 var(--black-shadow);
  z-index: 1;
}
.sub-game-result.p1 {
  --height: 140px;
  --width: 15px;
}
.sub-game-result.p2 {
  --radius: 80px;
  --width: 15px;
}
.sub-game-result.draw {
  --height: 20px;
  --width: 100px;
}

.sub-game.disabled .square {
  background-color: var(--square-color);
  opacity: 0.5;
  cursor: auto;
}
.square.p1 {
  --height: 25px;
  --width: 4px;
}
.square.p2 {
  --radius: 15px;
  --width: 4px;
}

p {
  margin-top: 10px;
}

ul {
  margin-left: 1em;
}
</style>
