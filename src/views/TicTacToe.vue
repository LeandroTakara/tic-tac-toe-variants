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

  const game = ref(null)
  let gameState = GAME_STATES.PLAYING
  const isPlayer1Turn = ref(true)

  const currentPlayerIcon = computed(() => ({
    p1: isPlayer1Turn.value,
    p2: !isPlayer1Turn.value,
  }))
  const currentPlayer = computed(() => isPlayer1Turn.value ? 'p1' : 'p2')
  const gameResultMessage = computed(() => {
    if (gameState === GAME_STATES.PLAYER1_WIN) return 'Player 1 win'
    else if (gameState === GAME_STATES.PLAYER2_WIN) return 'Player 2 win'
    else if (gameState === GAME_STATES.DRAW) return 'Draw'
  })

  function clickTile(e) {
    // game ended
    if (gameState != GAME_STATES.PLAYING) return

    // square has already been chosen
    if (hasPlayerMark(e.target)) return

    e.target.classList.add(currentPlayer.value)

    gameState = checkWinner()

    isPlayer1Turn.value = !isPlayer1Turn.value
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
    gameState = GAME_STATES.PLAYING
    isPlayer1Turn.value = true

    for (const square of game.value.children) {
      square.className = 'square'
    }
  }
</script>

<template>
  <div class="game-container">
    <div class="game-info">
      <span class="player-icon" :class="currentPlayerIcon"></span>
      <span class="player-name">Player {{ isPlayer1Turn ? '1' : '2' }}</span>
    </div>
    
    <div class="game-area">
      <div class="game" ref="game">
        <div class="square" v-for="i in 9" @click="clickTile"></div>
      </div>

      <div class="game-result-container" v-if="gameState != GAME_STATES.PLAYING">
        <span class="game-result">{{ gameResultMessage }}</span>

        <RestartButton @click="restartGame" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .game-container {
    margin: 20px auto 0;
    width: min-content;
  }

  .game-info {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 10px;
    height: 70px;
    width: max-content;
    padding: 10px;
    margin: 0 auto 30px;
    border-radius: 10px;
    background-color: rgb(61, 50, 76)
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
    font-size: 1.5rem;
    color: white;
  }

  .game-area {
    position: relative;
  }

  .game {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
    gap: 10px;
  }

  .square {
    position: relative;
    background-color: rgba(213, 213, 213, 0.5);
    border-radius: 15px;
    cursor: pointer;
  }
  .square:hover {
    background-color: rgba(238, 238, 238, 0.8);
  }
  .square.p1 {
    --height: 70px;
    --width: 10px;
  }

  .square.p2 {
    --radius: 45px;
    --width: 10px;
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
    width: 200px;
    height: 150px;
    border-radius: 10px;
    background-color: rgba(74, 48, 93, 0.8);
  }

  .game-result {
    font-size: 1.4rem;
    color: white;
  }

  /* icons */
  .p1::before {
    content: '';
    position: absolute;
    height: var(--height);
    width: var(--width);
    border-radius: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotateZ(45deg);
    background: red;
  }
  .p1::after {
    content: '';
    position: absolute;
    height: var(--height);
    width: var(--width);
    border-radius: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotateZ(-45deg);
    background: red;
  }
  .p2::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    height: var(--radius);
    width: var(--radius);
    border-radius: 100%;
    border: solid var(--width) blue;
    transform: translate(-50%, -50%);
  }
</style>
