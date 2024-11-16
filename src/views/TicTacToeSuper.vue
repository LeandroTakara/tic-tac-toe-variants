<script setup>
  import { ref, computed, defineEmits } from 'vue'

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

  const emit = defineEmits(['isPlayer1Turn'])

  const game = ref(new Array(9).fill(SYMBOLS.EMPTY))
  const gameState = ref(GAME_STATES.PLAYING)
  const subGames = ref(new Array(9).fill(null).map(() => new Array(9).fill(SYMBOLS.EMPTY)))
  const subGamesResults = ref(new Array(9).fill(GAME_STATES.PLAYING))

  const isPlayer1Turn = ref(true)
  const activeSubGame = ref(-1)

  const currentPlayer = computed(() => isPlayer1Turn.value ? SYMBOLS.P1 : SYMBOLS.P2)

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

    // game ended, don't change the game variables
    if (gameState.value !== GAME_STATES.PLAYING) return

    // sets in which sub-game to play next
    activeSubGame.value = subGamesResults.value[square] !== GAME_STATES.PLAYING ? -1 : square

    isPlayer1Turn.value = !isPlayer1Turn.value

    emit('isPlayer1Turn', isPlayer1Turn.value)
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
    emit('isPlayer1Turn', isPlayer1Turn.value)
  }

  emit('isPlayer1Turn', isPlayer1Turn.value)
</script>

<template>
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
</style>
