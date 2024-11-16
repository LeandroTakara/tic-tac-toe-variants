import { ref, computed } from 'vue'

/**
 * @typedef {Object.<string, number>} Symbols
 */

const DEFAULT_SYMBOLS = {
  P1: 0,
  P2: 1,
  EMPTY: 2,
}

/**
 * @param {Symbols} gameSymbols the symbols the tic tac toe will use, it must contain the default symbols (P1, P2, EMPTY) + any others.
 */
function useTicTacToeBase(gameSymbols) {
  const WINNING_COMBINATIONS = [
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

  const game = ref(new Array(9).fill(gameSymbols.EMPTY))
  const gameState = ref(GAME_STATES.PLAYING)
  const isPlayer1Turn = ref(true)

  const currentPlayer = computed(() => isPlayer1Turn.value ? gameSymbols.P1 : gameSymbols.P2)
  const gameResultMessage = computed(() => {
    if (gameState.value === GAME_STATES.PLAYER1_WIN) return 'Player 1 win'
    else if (gameState.value === GAME_STATES.PLAYER2_WIN) return 'Player 2 win'
    else if (gameState.value === GAME_STATES.DRAW) return 'Draw'
  })

  /**
   * Generic function to check the board winner
   * @param {Symbols[]} gameBoard the game board to check
   * @returns the game state
   */
  function checkWinner(gameBoard) {
    for (const combination of WINNING_COMBINATIONS) {
      if (combination.every(square => gameBoard[square] === currentPlayer.value)) {
        return currentPlayer.value == gameSymbols.P1 ? GAME_STATES.PLAYER1_WIN : GAME_STATES.PLAYER2_WIN
      }
    }
  
    if (gameBoard.every(square => square !== gameSymbols.EMPTY)) return GAME_STATES.DRAW
  
    return GAME_STATES.PLAYING
  }

  function nextPlayer() {
    isPlayer1Turn.value = !isPlayer1Turn.value
  }

  function resetBaseGame() {
    game.value.fill(gameSymbols.EMPTY)
    gameState.value = GAME_STATES.PLAYING
    isPlayer1Turn.value = true
  }

  return {
    GAME_STATES,
    game,
    gameState,
    isPlayer1Turn,
    currentPlayer,
    gameResultMessage,
    checkWinner,
    nextPlayer,
    resetBaseGame,
  }
}

function useTicTacToe() {
  const SYMBOLS = DEFAULT_SYMBOLS
  const ticTacToeBase = useTicTacToeBase(SYMBOLS)
  const { GAME_STATES, game, gameState, isPlayer1Turn, currentPlayer, gameResultMessage, checkWinner, nextPlayer, resetBaseGame } = ticTacToeBase

  /**
   * @param {number} square the square clicked (between 0 and 9).
   */
  function clickSquare(square) {
    // game ended
    if (gameState.value !== GAME_STATES.PLAYING) return

    // square has already an symbol
    if (game.value[square] !== SYMBOLS.EMPTY) return
  
    game.value[square] = currentPlayer.value
    gameState.value = checkWinner(game.value)

    // game ended, don't change the game variables
    if (gameState.value !== GAME_STATES.PLAYING) return

    nextPlayer()
  }

  return {
    GAME_STATES,
    SYMBOLS,
    game,
    gameState,
    isPlayer1Turn,
    gameResultMessage,
    clickSquare,
    resetGame: resetBaseGame,
  }
}

function useTicTacToeInfinite() {
  const SYMBOLS = DEFAULT_SYMBOLS
  const ticTacToeBase = useTicTacToeBase(SYMBOLS)
  const { GAME_STATES, game, gameState, isPlayer1Turn, currentPlayer, gameResultMessage, checkWinner, nextPlayer, resetBaseGame } = ticTacToeBase

  const MAX_PLAY_LENGTH = 6
  const lastPlays = ref([])
  const elementToBeRemoved = ref(-1)

  /**
   * @param {number} square the square clicked (between 0 and 9)
   */
  function clickSquare(square) {
    // game ended
    if (gameState.value !== GAME_STATES.PLAYING) return
  
    // square has already an symbol
    if (game.value[square] !== SYMBOLS.EMPTY) return
  
    if (elementToBeRemoved.value !== -1) {
      const elRemoved = lastPlays.value.shift()
      game.value[elRemoved] = SYMBOLS.EMPTY
    }
  
    game.value[square] = currentPlayer.value
    lastPlays.value.push(square)
  
    if (lastPlays.value.length === MAX_PLAY_LENGTH) {
      elementToBeRemoved.value = lastPlays.value[0]
    }
  
    gameState.value = checkWinner(game.value)
  
    // game ended, don't change the game variables
    if (gameState.value !== GAME_STATES.PLAYING) return
  
    nextPlayer()
  }

  function resetGame() {
    resetBaseGame()
    lastPlays.value = []
    elementToBeRemoved.value = -1
  }

  return {
    GAME_STATES,
    SYMBOLS,
    game,
    gameState,
    isPlayer1Turn,
    gameResultMessage,
    elementToBeRemoved,
    clickSquare,
    resetGame,
  }
}

function useTicTacToeSuper() {
  const SYMBOLS = {
    ...DEFAULT_SYMBOLS,
    DRAW: 3
  }
  const ticTacToeBase = useTicTacToeBase(SYMBOLS)
  const { GAME_STATES, game, gameState, isPlayer1Turn, currentPlayer, gameResultMessage, checkWinner, nextPlayer, resetBaseGame } = ticTacToeBase

  const subGames = ref(new Array(9).fill(null).map(() => new Array(9).fill(SYMBOLS.EMPTY)))
  const subGamesResults = ref(new Array(9).fill(GAME_STATES.PLAYING))
  const activeSubGame = ref(-1) // -1 means: all playable subgames are active

  /**
   * @param {number} subGame the subgame to which the clicked square belongs (between 0 and 9)
   * @param {number} square the square clicked (between 0 and 9)
   */
  function clickSquare(subGame, square) {
    // game ended
    if (gameState.value !== GAME_STATES.PLAYING) return
  
    // clicked on a disabled sub-game
    const finishedSubGame = subGamesResults.value[subGame] !== GAME_STATES.PLAYING
    const subGameActive = activeSubGame.value === -1 || activeSubGame.value === subGame

    if (finishedSubGame || !subGameActive) return
  
    subGames.value[subGame][square] = currentPlayer.value
  
    // checks the sub-game winner
    checkSubGameWinner(subGame)

    // checks the big game winner
    gameState.value = checkWinner(game.value)
  
    // game ended, don't change the game variables
    if (gameState.value !== GAME_STATES.PLAYING) return
  
    // sets in which sub-game to play next
    activeSubGame.value = subGamesResults.value[square] !== GAME_STATES.PLAYING ? -1 : square
  
    nextPlayer()
  }

  /**
   * @param {number} subGame the subgame to check the winner
   */
  function checkSubGameWinner(subGame) {  
    // checks the sub-game winner
    subGamesResults.value[subGame] = checkWinner(subGames.value[subGame])
  
    // if the sub-game ended, sets its game state in the big game
    if (subGamesResults.value[subGame] === GAME_STATES.PLAYER1_WIN) {
      game.value[subGame] = SYMBOLS.P1
    } else if (subGamesResults.value[subGame] === GAME_STATES.PLAYER2_WIN) {
      game.value[subGame] = SYMBOLS.P2
    } else if (subGamesResults.value[subGame] === GAME_STATES.DRAW) {
      game.value[subGame] = SYMBOLS.DRAW
    }
  }
  
  function resetGame() {
    resetBaseGame()
    subGames.value.forEach(subGame => subGame.fill(SYMBOLS.EMPTY))
    subGamesResults.value.fill(GAME_STATES.PLAYING)
    activeSubGame.value = -1
  }

  return {
    GAME_STATES,
    SYMBOLS,
    gameState,
    subGames,
    subGamesResults,
    activeSubGame,
    isPlayer1Turn,
    gameResultMessage,
    clickSquare,
    resetGame,
  }
}

export {
  useTicTacToe,
  useTicTacToeInfinite,
  useTicTacToeSuper,
}
