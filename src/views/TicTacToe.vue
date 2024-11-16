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

  const emit = defineEmits(['isPlayer1Turn'])

  const game = ref(null)
  const gameState = ref(GAME_STATES.PLAYING)
  const isPlayer1Turn = ref(true)

  const currentPlayerIcon = computed(() => ({
    p1: isPlayer1Turn.value,
    p2: !isPlayer1Turn.value,
  }))
  const currentPlayer = computed(() => isPlayer1Turn.value ? 'p1' : 'p2')
  const gameResultMessage = computed(() => {
    if (gameState.value === GAME_STATES.PLAYER1_WIN) return 'Player 1 win'
    else if (gameState.value === GAME_STATES.PLAYER2_WIN) return 'Player 2 win'
    else if (gameState.value === GAME_STATES.DRAW) return 'Draw'
  })

  function clickTile(e) {
    // game ended
    if (gameState.value != GAME_STATES.PLAYING) return

    // square has already been chosen
    if (hasPlayerMark(e.target)) return

    e.target.classList.add(currentPlayer.value)

    gameState.value = checkWinner()

    isPlayer1Turn.value = !isPlayer1Turn.value

    emit('isPlayer1Turn', isPlayer1Turn.value)
  }

  function hasPlayerMark(element) {
    return element.classList.contains('p1') || element.classList.contains('p2')
  }

  function checkWinner() {
    const squares = Array.from(game.value.children)

    for (const [a, b, c] of WINNINGS) {
      if (
        squares[a].classList.contains(currentPlayer.value) &&
        squares[b].classList.contains(currentPlayer.value) &&
        squares[c].classList.contains(currentPlayer.value)
      ) {
        return currentPlayer.value == 'p1' ? GAME_STATES.PLAYER1_WIN : GAME_STATES.PLAYER2_WIN
      }
    }

    if (squares.every(hasPlayerMark)) return GAME_STATES.DRAW

    return GAME_STATES.PLAYING
  }

  function restartGame() {
    gameState.value = GAME_STATES.PLAYING
    isPlayer1Turn.value = true

    for (const square of game.value.children) {
      square.className = 'square'
    }
  }

  emit('isPlayer1Turn', isPlayer1Turn.value)
</script>

<template>
  <div class="game-area">
    <div class="game" ref="game">
      <div class="square" v-for="i in 9" @click="clickTile"></div>
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
