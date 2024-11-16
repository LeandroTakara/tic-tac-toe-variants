export default {
  classic: {
    howToPlay: ['The normal version of tic tac toe.', 'Each players takes turn to place a "X" or "O" in the game grid and the first one to make three in a row wins.']
  },
  infinite: {
    howToPlay: ['The same rules as the tic tac toe, but there can only be six symbols at a time.', 'When the six-th symbol is placed, the oldest "X" or "O" placed is marked to be removed and when the player places a "X" or "O", that symbol is removed. Also the oldest "X" or "O" can not be used to win a game!']
  },
  super: {
    howToPlay: ['The rules are the same as the tic tac toe, except for these ones:', '- The first play can be done in any subgame', '- The place the "X" or "O" is in to determines where to play next, e.g., "X" was placed on the middle square of the top-left subgame, so the next player must play in the middle subgame.', '- When the player wins a subgame, this subgame is marked as a win for that player or draw if none has won.', '- If any player places an "X" or "O" that directs the other player to play in a completed subgame, then the next player can play anywhere.', '- Wins the player that makes three subgames in a row.']
  },
}
