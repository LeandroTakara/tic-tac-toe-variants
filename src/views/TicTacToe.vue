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
  }

  const emit = defineEmits(['isPlayer1Turn'])

  const game = ref(new Array(9).fill(SYMBOLS.EMPTY))
  const gameState = ref(GAME_STATES.PLAYING)

  const isPlayer1Turn = ref(true)

  const currentPlayer = computed(() => isPlayer1Turn.value ? SYMBOLS.P1 : SYMBOLS.P2)

  const gameResultMessage = computed(() => {
    if (gameState.value === GAME_STATES.PLAYER1_WIN) return 'Player 1 win'
    else if (gameState.value === GAME_STATES.PLAYER2_WIN) return 'Player 2 win'
    else if (gameState.value === GAME_STATES.DRAW) return 'Draw'
  })

  function clickSquare(square) {
    // game ended
    if (gameState.value !== GAME_STATES.PLAYING) return

    // square has already an symbol
    if (game.value[square] !== SYMBOLS.EMPTY) return

    game.value[square] = currentPlayer.value

    gameState.value = checkWinner()

    // game ended, don't change the game variables
    if (gameState.value !== GAME_STATES.PLAYING) return

    isPlayer1Turn.value = !isPlayer1Turn.value

    emit('isPlayer1Turn', isPlayer1Turn.value)
  }

  function checkWinner() {
    for (const [a, b, c] of WINNINGS) {
      if (
        game.value[a] === currentPlayer.value &&
        game.value[b] === currentPlayer.value &&
        game.value[c] === currentPlayer.value
      ) {
        return currentPlayer.value == SYMBOLS.P1 ? GAME_STATES.PLAYER1_WIN : GAME_STATES.PLAYER2_WIN
      }
    }

    if (game.value.every(square => square !== SYMBOLS.EMPTY)) return GAME_STATES.DRAW

    return GAME_STATES.PLAYING
  }

  function restartGame() {
    game.value = game.value.fill(SYMBOLS.EMPTY)
    gameState.value = GAME_STATES.PLAYING
    isPlayer1Turn.value = true
    emit('isPlayer1Turn', isPlayer1Turn.value)
  }

  emit('isPlayer1Turn', isPlayer1Turn.value)
</script>

<template>
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

        <RestartButton @click="restartGame" />
      </div>
    </Transition>
  </div>
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
</style>
