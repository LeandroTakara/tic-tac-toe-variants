<script setup>
  import { ref, computed, watch, reactive } from 'vue'

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

  const MAX_PLAY_LENGTH = 6
  const lastPlays = reactive([])

  // marks the element to be removed, it is the oldest element
  watch(lastPlays, () => {
    if (lastPlays.length === MAX_PLAY_LENGTH) {
      lastPlays[0].classList.add('to-be-removed')
    }
  })

  function clickTile(e) {
    // game ended
    if (gameState.value != GAME_STATES.PLAYING) return

    // square has already been chosen
    if (hasPlayerMark(e.target)) return

    e.target.classList.add(currentPlayer.value)

    if (lastPlays.length === MAX_PLAY_LENGTH) {
      const el = lastPlays.shift()
      el.className = 'square'
    }

    lastPlays.push(e.target)

    gameState.value = checkWinner()

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
    gameState.value = GAME_STATES.PLAYING
    isPlayer1Turn.value = true

    for (const square of game.value.children) {
      square.className = 'square'
    }
  }
</script>

<template>
  <div class="game-info">
    <span class="player-icon" :class="currentPlayerIcon"></span>
    <span class="player-name">Player {{ isPlayer1Turn ? '1' : '2' }}</span>
  </div>

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
    background-color: rgb(61, 50, 76);
    box-shadow: 5px 5px 0px 0px #0000005c, inset -4px -4px 20px 0px #0000005c;
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
    text-shadow: 0 0 25px rgba(255, 255, 255, 0.4)
  }

  .game-area {
    position: relative;
    margin: 0 auto;
    width: min-content;
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
    box-shadow: 5px 5px 0px 0px #0000005c, inset -4px -4px 20px 0px #0000005c;
  }
  .square:hover {
    background-color: rgba(238, 238, 238, 0.7);
  }
  .square.p1 {
    --height: 70px;
    --width: 10px;
  }

  .square.p2 {
    --radius: 45px;
    --width: 10px;
  }

  .to-be-removed {
    opacity: 0.3;
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
  }

  .game-result {
    font-size: 3rem;
    color: white;
    text-shadow: 0 0 25px rgba(255, 255, 255, 0.4)
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
    box-shadow: 0 0 30px 1px rgba(255, 0, 0, 0.4);
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
    box-shadow: 0 0 30px 1px rgba(255, 0, 0, 0.4);
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
    box-shadow: 0 0 30px 1px rgba(0, 0, 255, 0.4), inset 0 0 30px 1px rgba(0, 0, 255, 0.4);
  }

  .scale-result-enter-active, .scale-result-leave-active {
    transition-property: transform, opacity;
    transition-duration: 0.7s;
  }

  .scale-result-enter-from, .scale-result-leave-to {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
</style>
