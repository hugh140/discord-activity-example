const victoryPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function detectGameOver(board, symbol) {
  for (const pattern of victoryPatterns) {
    const bool = pattern.every((value) => board[value] === symbol);
    if (bool) return { state: true };
  }
  const noMorePlays = board.every((box) => box !== 0);
  if (noMorePlays) return { state: false };

  return { state: null };
}
export default detectGameOver;
