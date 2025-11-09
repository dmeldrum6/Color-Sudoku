/*
 * Color Sudoku - Mobile Game
 */

// Game constants
const VARIANTS = {
  colors: [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
    '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#008000'
  ],
  numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
  letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
  emojis: ['😊', '😎', '😍', '🤔', '😮', '🎵', '💫', '⭐', '🌟']
};

// Game state
let currentVariant = 'colors';
let currentDifficulty = 'easy';
let gameBoard = Array(81).fill(null);
let fixedCells = new Set();
let solution = [];
let selectedSymbol = null;

// Generate a valid Sudoku puzzle
function generateSudoku(difficulty) {
  // Clear the current board
  gameBoard = Array(81).fill(null);
  fixedCells.clear();

  // Determine number of cells to fill based on difficulty
  const numCellsToFill = difficulty === 'easy' ? 35 :
                         difficulty === 'medium' ? 30 : 25;

  // Create a valid solution first (simplified pattern for demo)
  solution = [];
  for(let i = 0; i < 9; i++) {
    for(let j = 0; j < 9; j++) {
      const index = i * 9 + j;
      solution[index] = ((i*3 + Math.floor(i/3) + j) % 9);
    }
  }

  // Randomly select cells to keep as fixed
  const indices = Array.from({length: 81}, (_, i) => i);
  for(let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Fill in the selected fixed cells
  for(let i = 0; i < numCellsToFill; i++) {
    const index = indices[i];
    gameBoard[index] = solution[index];
    fixedCells.add(index);
  }

  updateBoard();
  updateCellsRemaining();
  showMessage('New game started! Good luck!', 'success');
}

// Check if the current board matches the solution
function checkSolution() {
  let isComplete = true;
  let isCorrect = true;

  for(let i = 0; i < 81; i++) {
    if(gameBoard[i] === null) {
      isComplete = false;
      break;
    }
    if(gameBoard[i] !== solution[i]) {
      isCorrect = false;
    }
  }

  if(!isComplete) {
    showMessage('Puzzle is not complete yet!', 'error');
  } else if(isCorrect) {
    showMessage('🎉 Congratulations! You solved it!', 'success');
  } else {
    showMessage('❌ Not quite right. Keep trying!', 'error');
  }
}

// Update the symbol palette
function updatePalette() {
  const palette = document.querySelector('.symbol-palette');
  palette.innerHTML = '';

  VARIANTS[currentVariant].forEach((symbol, index) => {
    const item = document.createElement('div');
    item.className = 'symbol-item';
    item.dataset.symbolIndex = index;

    if (currentVariant === 'colors') {
      item.style.backgroundColor = symbol;
    } else {
      item.textContent = symbol;
    }

    // Support both drag-and-drop and tap-to-select
    item.draggable = true;

    // Drag events
    item.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', index.toString());
      selectedSymbol = index;
    });

    // Touch/click events for mobile
    item.addEventListener('click', (e) => {
      e.preventDefault();
      selectedSymbol = index;
      // Visual feedback
      document.querySelectorAll('.symbol-item').forEach(el => {
        el.style.opacity = '0.5';
      });
      item.style.opacity = '1';
      showMessage('Symbol selected. Tap a cell to place it.', 'success');
    });

    palette.appendChild(item);
  });
}

// Update the game board
function updateBoard() {
  const board = document.querySelector('.board');
  board.innerHTML = '';

  for (let i = 0; i < 81; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.cellIndex = i;

    // Display current value if exists
    if (gameBoard[i] !== null) {
      if (currentVariant === 'colors') {
        cell.style.backgroundColor = VARIANTS[currentVariant][gameBoard[i]];
      } else {
        cell.textContent = VARIANTS[currentVariant][gameBoard[i]];
      }
    }

    if (fixedCells.has(i)) {
      cell.setAttribute('data-fixed', 'true');
    } else {
      // Make cells droppable and tappable

      // Drag and drop events
      cell.addEventListener('dragover', (e) => e.preventDefault());
      cell.addEventListener('drop', (e) => {
        e.preventDefault();
        const symbolIndex = parseInt(e.dataTransfer.getData('text/plain'));
        placeSymbol(i, symbolIndex);
      });

      // Touch/click events for mobile
      cell.addEventListener('click', (e) => {
        e.preventDefault();
        if (selectedSymbol !== null) {
          placeSymbol(i, selectedSymbol);
        }
      });

      // Long press to clear cell
      let pressTimer;
      cell.addEventListener('touchstart', (e) => {
        pressTimer = setTimeout(() => {
          gameBoard[i] = null;
          updateBoard();
          updateCellsRemaining();
          showMessage('Cell cleared', 'success');
        }, 500);
      });

      cell.addEventListener('touchend', () => {
        clearTimeout(pressTimer);
      });
    }

    board.appendChild(cell);
  }
}

// Place a symbol in a cell
function placeSymbol(cellIndex, symbolIndex) {
  const symbol = VARIANTS[currentVariant][symbolIndex];
  const cell = document.querySelector(`[data-cell-index="${cellIndex}"]`);

  if (currentVariant === 'colors') {
    cell.style.backgroundColor = symbol;
  } else {
    cell.style.backgroundColor = 'white';
    cell.textContent = symbol;
  }

  gameBoard[cellIndex] = symbolIndex;
  updateCellsRemaining();

  // Reset symbol selection
  document.querySelectorAll('.symbol-item').forEach(el => {
    el.style.opacity = '1';
  });
}

// Update cells remaining counter
function updateCellsRemaining() {
  const emptyCells = gameBoard.filter(cell => cell === null).length;
  document.getElementById('cells-remaining').textContent = emptyCells;

  if (emptyCells === 0) {
    showMessage('Grid complete! Tap "Check" to verify solution.', 'success');
  }
}

// Show message to user
function showMessage(text, type = 'success') {
  const messageDiv = document.querySelector('.message');
  messageDiv.textContent = text;
  messageDiv.className = 'message ' + type;

  // Clear message after 3 seconds
  setTimeout(() => {
    messageDiv.textContent = '';
    messageDiv.className = 'message';
  }, 3000);
}

// Initialize game when device is ready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

  // Initialize the game
  initializeGame();
}

// For browser testing (when Cordova is not available)
if (typeof cordova === 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    console.log('Running in browser mode');
    initializeGame();
  });
}

function initializeGame() {
  // Handle variant switching
  document.querySelectorAll('.variant-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.variant-btn.active').classList.remove('active');
      btn.classList.add('active');
      currentVariant = btn.dataset.variant;

      updatePalette();
      updateBoard();

      const variantName = currentVariant.charAt(0).toUpperCase() + currentVariant.slice(1);
      document.querySelector('.palette-title').textContent = variantName + ' Palette';
      showMessage('Switched to ' + variantName + ' mode', 'success');
    });
  });

  // Handle difficulty selection
  document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.difficulty-btn.active').classList.remove('active');
      btn.classList.add('active');
      currentDifficulty = btn.textContent.toLowerCase();
      generateSudoku(currentDifficulty);
    });
  });

  // Handle New Game button
  document.getElementById('new-game-btn').addEventListener('click', () => {
    generateSudoku(currentDifficulty);
  });

  // Handle Check Solution button
  document.getElementById('check-btn').addEventListener('click', () => {
    checkSolution();
  });

  // Initialize the game
  generateSudoku('easy');
  updatePalette();

  showMessage('Welcome to Color Sudoku!', 'success');
}
