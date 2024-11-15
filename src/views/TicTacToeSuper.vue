<script setup>
  import { ref, computed } from 'vue'

  import RestartButton from '@/components/RestartButton.vue'

  const WINNINGS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const GAME_STATES = {
    PLAYER1_WIN: 0,
    PLAYER2_WIN: 1,
    DRAW: 2,
    PLAYING: 3,
  }

  const SYMBOLS = {
    P1: 0,
    P2: 1,
    EMPTY: 2,
    DRAW: 3,
  }

  const game = ref(new Array(9).fill(SYMBOLS.EMPTY))
  const gameState = ref(GAME_STATES.PLAYING)
  const subGames = ref(new Array(9).fill(null).map(() => new Array(9).fill(SYMBOLS.EMPTY)))
  const subGamesResults = ref(new Array(9).fill(GAME_STATES.PLAYING))

  const isPlayer1Turn = ref(true)
  const activeSubGame = ref(-1)

  const currentPlayer = computed(() => isPlayer1Turn.value ? SYMBOLS.P1 : SYMBOLS.P2)
  const currentPlayerIcon = computed(() => ({
    p1: isPlayer1Turn.value,
    p2: !isPlayer1Turn.value,
  }))

  const gameResultMessage = computed(() => {
    if (gameState.value === GAME_STATES.PLAYER1_WIN) return 'Player 1 win'
    else if (gameState.value === GAME_STATES.PLAYER2_WIN) return 'Player 2 win'
    else if (gameState.value === GAME_STATES.DRAW) return 'Draw'
  })

  function clickSquare(subGame, square) {
    // game ended
    if (gameState.value !== GAME_STATES.PLAYING) return

    // clicked on a disabled sub-game
    if (
      subGamesResults.value[subGame] !== GAME_STATES.PLAYING ||
      (activeSubGame.value !== -1 && activeSubGame.value !== subGame)
    ) return

    subGames.value[subGame][square] = currentPlayer.value

    // checks the sub-game winner
    subGamesResults.value[subGame] = checkWinner(subGames.value[subGame])

    // if the sub-game ended, sets its game state in the the big game
    if (subGamesResults.value[subGame] === GAME_STATES.PLAYER1_WIN) {
      game.value[subGame] = SYMBOLS.P1
    } else if (subGamesResults.value[subGame] === GAME_STATES.PLAYER2_WIN) {
      game.value[subGame] = SYMBOLS.P2
    } else if (subGamesResults.value[subGame] === GAME_STATES.DRAW) {
      game.value[subGame] = SYMBOLS.DRAW
    }

    // checks the big game winner
    gameState.value = checkWinner(game.value)

    // sets in which sub-game to play next
    activeSubGame.value = subGamesResults.value[square] !== GAME_STATES.PLAYING ? -1 : square

    isPlayer1Turn.value = !isPlayer1Turn.value
  }

  function checkWinner(gameGrid) {
    for (const [a, b, c] of WINNINGS) {
      if (
        gameGrid[a] === currentPlayer.value &&
        gameGrid[b] === currentPlayer.value &&
        gameGrid[c] === currentPlayer.value
      ) {
        return currentPlayer.value == SYMBOLS.P1 ? GAME_STATES.PLAYER1_WIN : GAME_STATES.PLAYER2_WIN
      }
    }

    if (gameGrid.every(square => square !== SYMBOLS.EMPTY)) return GAME_STATES.DRAW

    return GAME_STATES.PLAYING
  }

  function restartGame() {
    subGames.value.forEach(subGame => subGame.fill(SYMBOLS.EMPTY))
    subGamesResults.value.fill(GAME_STATES.PLAYING)
    game.value.fill(SYMBOLS.EMPTY)
    gameState.value = GAME_STATES.PLAYING
    isPlayer1Turn.value = true
    activeSubGame.value = -1
  }
</script>

<template>
  <div class="game-info">
    <span class="player-icon" :class="currentPlayerIcon"></span>
    <span class="player-name">Player {{ isPlayer1Turn ? '1' : '2' }}</span>
  </div>

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

        <RestartButton @click="restartGame" />
      </div>
    </Transition>
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

  .game-area {
    position: relative;
    margin: 0 auto;
    width: min-content;
  }

  .game {
    display: grid;
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

  .square {
    position: relative;
    border-radius: 10px;
    background-color: var(--square-color);
    cursor: pointer;
    box-shadow: 5px 5px 0 0 var(--black-shadow), inset -4px -4px 20px 0 var(--black-shadow);
  }
  .sub-game:not(.disabled) .square:hover {
    background-color: var(--square-color-hover);

  }
  .sub-game.disabled .square {
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

  /* icons */
  .p1::before, .p1::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    height: var(--height);
    width: var(--width);
    border-radius: 10px;
    background-color: red;
    box-shadow: 0 0 30px 1px rgba(255, 0, 0, 0.4);
  }
  .p1::before {
    transform: translate(-50%, -50%) rotateZ(45deg);
  }
  .p1::after {
    transform: translate(-50%, -50%) rotateZ(-45deg);
  }

  .p2::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: var(--radius);
    width: var(--radius);
    border-radius: 100%;
    border: solid var(--width) blue;
    box-shadow: 0 0 30px 1px rgba(0, 0, 255, 0.4), inset 0 0 30px 1px rgba(0, 0, 255, 0.4);
  }

  .draw::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: var(--height);
    width: var(--width);
    background-color: gold;
    border-radius: 10px;
    box-shadow: 0 0 30px 1px rgba(255, 215, 0, 0.4), inset 0 0 30px 1px rgba(255, 215, 0, 0.4);
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
