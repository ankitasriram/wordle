/**
 * WORDLE CLONE - STUDENT IMPLEMENTATION
 * 
 * Complete the functions below to create a working Wordle game.
 * Each function has specific requirements and point values.
 * 
 * GRADING BREAKDOWN:
 * - Core Game Functions (60 points): initializeGame, handleKeyPress, submitGuess, checkLetter, updateGameState
 * - Advanced Features (30 points): updateKeyboardColors, processRowReveal, showEndGameModal, validateInput
 */

// ========================================
// CORE GAME FUNCTIONS (60 POINTS TOTAL)
// ========================================

/**
 * Initialize a new game
 * POINTS: 10
 * 
 * TODO: Complete this function to:
 * - Reset all game state variables
 * - Get a random word from the word list
 * - Clear the game board
 * - Hide any messages or modals
 */
function initializeGame() {
    // TODO: Reset game state variables
    currentWord = 'HELLO';  // Set this to a random word
    currentGuess = '';
    currentRow = 0;
    gameOver = false;
    gameWon = false;
    
    // TODO: Get a random word from the word list
    // HINT: Use WordleWords.getRandomWord()
    currentWord = WordleWords.getRandomWord();    
    
    // TODO: Reset the game board
    // HINT: Use resetBoard()
    resetBoard();
    
    // TODO: Hide any messages
    // HINT: Use hideModal() and ensure message element is hidden
    hideModal();
    console.log('Game initialized!'); // Remove this line when implementing
}

/**
 * Handle keyboard input
 * POINTS: 15
 * 
 * TODO: Complete this function to:
 * - Process letter keys (A-Z)
 * - Handle ENTER key for word submission
 * - Handle BACKSPACE for letter deletion
 * - Update the display when letters are added/removed
 */
function handleKeyPress(key) {
    if (gameOver) return;
    
    if (/^[A-Z]$/.test(key)) {
        if (currentGuess.length < WORD_LENGTH) {
            currentGuess += key;
            
            const tile = getTile(currentRow, currentGuess.length - 1);
            updateTileDisplay(tile, key);
        }
    }
    
    else if (key === 'ENTER') {
        if (isGuessComplete()) {
            submitGuess();
        } else {
            showMessage('Not enough letters');
        }
    }
    
    else if (key === 'BACKSPACE') {
        if (currentGuess.length > 0) {
            const tile = getTile(currentRow, currentGuess.length - 1);
            
            updateTileDisplay(tile, '');
            
            currentGuess = currentGuess.slice(0, -1);
        }
    }
}

/**
 * Submit and process a complete guess
 * POINTS: 20
 * 
 * TODO: Complete this function to:
 * - Validate the guess is a real word
 * - Check each letter against the target word
 * - Update tile colors and keyboard
 * - Handle win/lose conditions
 */
function submitGuess() {
    if (!isGuessComplete()) {
        showMessage('Not enough letters');
        return;
    }
    
    if (!WordleWords.isValidWord(currentGuess)) {
        showMessage('Not in word list');
        shakeRow(currentRow);
        return;
    }
    
    const results = [];
    for (let i = 0; i < WORD_LENGTH; i++) {
        const result = checkLetter(currentGuess[i], i, currentWord);
        results.push(result);
    }
    
    for (let i = 0; i < WORD_LENGTH; i++) {
        const tile = getTile(currentRow, i);
        setTileState(tile, results[i]);
    }
    
    updateKeyboardColors(currentGuess, results);
    
    const isCorrect = currentGuess === currentWord;
    
    processRowReveal(currentRow, results);
    
    updateGameState(isCorrect);
    
    if (!gameOver) {
        currentRow++;
        currentGuess = '';
    }
}

/**
 * Check a single letter against the target word
 * POINTS: 10
 * 
 * TODO: Complete this function to:
 * - Return 'correct' if letter matches position exactly
 * - Return 'present' if letter exists but wrong position
 * - Return 'absent' if letter doesn't exist in target
 * - Handle duplicate letters correctly (this is the tricky part!)
 */
function checkLetter(guessLetter, position, targetWord) {
    guessLetter = guessLetter.toUpperCase();
    targetWord = targetWord.toUpperCase();
    
    if (targetWord[position] === guessLetter) {
        return 'correct';
    }
    
  
    let targetCount = 0;
    let correctCount = 0;
    
    for (let i = 0; i < targetWord.length; i++) {
        if (targetWord[i] === guessLetter) {
            targetCount++;
        }
    }
    
    for (let i = 0; i < currentGuess.length; i++) {
        if (currentGuess[i].toUpperCase() === guessLetter && targetWord[i] === guessLetter) {
            correctCount++;
        }
    }
    
    let presentCount = 0;
    for (let i = 0; i < position; i++) {
        if (currentGuess[i].toUpperCase() === guessLetter && targetWord[i] !== guessLetter) {
            presentCount++;
        }
    }
    
    if (correctCount + presentCount < targetCount) {
        return 'present';
    }
    
    return 'absent';
}

/**
 * Update game state after a guess
 * POINTS: 5
 * 
 * TODO: Complete this function to:
 * - Check if player won (guess matches target)
 * - Check if player lost (used all attempts)
 * - Show appropriate end game modal
 */
function updateGameState(isCorrect) {
    // Handle win condition
    if (isCorrect) {
        gameWon = true;
        gameOver = true;
        showEndGameModal(true, currentWord);
        return;
    }
    
    // Handle lose condition
    if (currentRow >= MAX_GUESSES - 1) {
        gameOver = true;
        showEndGameModal(false, currentWord);
    }
}

// ========================================
// ADVANCED FEATURES (30 POINTS TOTAL)
// ========================================

/**
 * Update keyboard key colors based on guessed letters
 * POINTS: 10
 * 
 * TODO: Complete this function to:
 * - Update each key with appropriate color
 * - Maintain color priority (green > yellow > gray)
 * - Don't downgrade key colors
 */

/**
 * WORDLE CLONE - STUDENT IMPLEMENTATION
 * 
 * Complete the functions below to create a working Wordle game.
 * Each function has specific requirements and point values.
 * 
 * GRADING BREAKDOWN:
 * - Core Game Functions (60 points): initializeGame, handleKeyPress, submitGuess, checkLetter, updateGameState
 * - Advanced Features (30 points): updateKeyboardColors, processRowReveal, showEndGameModal, validateInput
 */

// ========================================
// CORE GAME FUNCTIONS (60 POINTS TOTAL)
// ========================================

/**
 * Initialize a new game
 * POINTS: 10
 * 
 * TODO: Complete this function to:
 * - Reset all game state variables
 * - Get a random word from the word list
 * - Clear the game board
 * - Hide any messages or modals
 */
function initializeGame() {
    // Reset game state variables
    currentGuess = '';
    currentRow = 0;
    gameOver = false;
    gameWon = false;
    
    // Get a random word from the word list
    currentWord = WordleWords.getRandomWord();
    
    // Reset the game board
    resetBoard();
    
    // Hide any messages
    hideModal();
    
    // Clear any error messages that might be visible
    const messageElement = document.querySelector('.message');
    if (messageElement) {
        messageElement.style.display = 'none';
    }
}

/**
 * Handle keyboard input
 * POINTS: 15
 * 
 * TODO: Complete this function to:
 * - Process letter keys (A-Z)
 * - Handle ENTER key for word submission
 * - Handle BACKSPACE for letter deletion
 * - Update the display when letters are added/removed
 */
function handleKeyPress(key) {
    // Check if game is over - if so, return early
    if (gameOver) return;
    
    // Handle letter keys (A-Z)
    if (/^[A-Z]$/.test(key)) {
        // Only add letter if we haven't filled the current guess
        if (currentGuess.length < WORD_LENGTH) {
            currentGuess += key;
            
            // Get the tile and update its display
            const tile = getTile(currentRow, currentGuess.length - 1);
            updateTileDisplay(tile, key);
        }
    }
    
    // Handle ENTER key
    else if (key === 'ENTER') {
        // Check if guess is complete
        if (isGuessComplete()) {
            submitGuess();
        } else {
            // Show error message for incomplete guess
            showMessage('Not enough letters');
        }
    }
    
    // Handle BACKSPACE key
    else if (key === 'BACKSPACE') {
        // Check if there are letters to remove
        if (currentGuess.length > 0) {
            // Get the tile we're about to clear
            const tile = getTile(currentRow, currentGuess.length - 1);
            
            // Clear the tile display
            updateTileDisplay(tile, '');
            
            // Remove the last letter from currentGuess
            currentGuess = currentGuess.slice(0, -1);
        }
    }
}

/**
 * Submit and process a complete guess
 * POINTS: 20
 * 
 * TODO: Complete this function to:
 * - Validate the guess is a real word
 * - Check each letter against the target word
 * - Update tile colors and keyboard
 * - Handle win/lose conditions
 */
function submitGuess() {
    if (!isGuessComplete()) {
        showMessage('Not enough letters');
        return;
    }
    
    if (!WordleWords.isValidWord(currentGuess)) {
        showMessage('Not in word list');
        shakeRow(currentRow);
        return;
    }
    
    const results = [];
    for (let i = 0; i < WORD_LENGTH; i++) {
        const result = checkLetter(currentGuess[i], i, currentWord);
        results.push(result);
    }
    
    for (let i = 0; i < WORD_LENGTH; i++) {
        const tile = getTile(currentRow, i);
        setTileState(tile, results[i]);
    }
    
    updateKeyboardColors(currentGuess, results);
    
    const isCorrect = currentGuess === currentWord;
    
    processRowReveal(currentRow, results);
    
    updateGameState(isCorrect);
    
    if (!gameOver) {
        currentRow++;
        currentGuess = '';
    }
}

/**
 * Check a single letter against the target word
 * POINTS: 10
 * 
 * TODO: Complete this function to:
 * - Return 'correct' if letter matches position exactly
 * - Return 'present' if letter exists but wrong position
 * - Return 'absent' if letter doesn't exist in target
 * - Handle duplicate letters correctly (this is the tricky part!)
 */
function checkLetter(guessLetter, position, targetWord) {
    guessLetter = guessLetter.toUpperCase();
    targetWord = targetWord.toUpperCase();
    
    if (targetWord[position] === guessLetter) {
        return 'correct';
    }
    
    let targetCount = 0;
    let correctCount = 0;
    

    for (let i = 0; i < targetWord.length; i++) {
        if (targetWord[i] === guessLetter) {
            targetCount++;
        }
    }
    
    for (let i = 0; i < currentGuess.length; i++) {
        if (currentGuess[i].toUpperCase() === guessLetter && targetWord[i] === guessLetter) {
            correctCount++;
        }
    }
    
    let presentCount = 0;
    for (let i = 0; i < position; i++) {
        if (currentGuess[i].toUpperCase() === guessLetter && targetWord[i] !== guessLetter) {
            presentCount++;
        }
    }
    
    if (correctCount + presentCount < targetCount) {
        return 'present';
    }
    
    return 'absent';
}

/**
 * Update game state after a guess
 * POINTS: 5
 * 
 * TODO: Complete this function to:
 * - Check if player won (guess matches target)
 * - Check if player lost (used all attempts)
 * - Show appropriate end game modal
 */
function updateGameState(isCorrect) {
    // Handle win condition
    if (isCorrect) {
        gameWon = true;
        gameOver = true;
        showEndGameModal(true, currentWord);
        return;
    }
    
    // Handle lose condition
    if (currentRow >= MAX_GUESSES - 1) {
        gameOver = true;
        showEndGameModal(false, currentWord);
    }
}

// ========================================
// ADVANCED FEATURES (30 POINTS TOTAL)
// ========================================

/**
 * Update keyboard key colors based on guessed letters
 * POINTS: 10
 * 
 * TODO: Complete this function to:
 * - Update each key with appropriate color
 * - Maintain color priority (green > yellow > gray)
 * - Don't downgrade key colors
 */
function updateKeyboardColors(guess, results) {
    for (let i = 0; i < guess.length; i++) {
        const letter = guess[i];
        const result = results[i];
        
        const key = document.querySelector(`[data-key="${letter}"]`);
        if (!key) continue;
        
        
        if (key.classList.contains('correct')) {
            continue;
        }
        
        if (key.classList.contains('present') && result === 'absent') {
            continue;
        }
        
        key.classList.remove('correct', 'present', 'absent');

        key.classList.add(result);
    }
}

/**
 * Process row reveal (simplified - no animations needed)
 * POINTS: 5 (reduced from 15 since animations removed)
 * 
 * TODO: Complete this function to:
 * - Check if all letters were correct
 * - Trigger celebration if player won this round
 */
function processRowReveal(rowIndex, results) {
    const allCorrect = results.every(result => result === 'correct');
    
    if (allCorrect) {
        celebrateRow(rowIndex);
    }
}

/**
 * Show end game modal with results
 * POINTS: 10
 * 
 * TODO: Complete this function to:
 * - Display appropriate win/lose message
 * - Show the target word
 * - Update game statistics
 */
function showEndGameModal(won, targetWord) {
    let message;
    
    if (won) {
        const guessCount = currentRow + 1;
        const attempts = ['', 'Genius!', 'Magnificent!', 'Impressive!', 'Splendid!', 'Great!', 'Phew!'];
        message = attempts[guessCount] || `You got it in ${guessCount} guesses!`;
    } else {
        message = `Better luck next time! The word was ${targetWord}`;
    }
    
    updateStats(won, currentRow + 1);
    
    showModal(message);
}

/**
 * Validate user input before processing
 * POINTS: 5
 * 
 * TODO: Complete this function to:
 * - Check if game is over
 * - Validate letter keys (only if guess not full)
 * - Validate ENTER key (only if guess complete)
 * - Validate BACKSPACE key (only if letters to remove)
 */
function validateInput(key, currentGuess) {
    if (gameOver) {
        return false;
    }
    
    if (/^[A-Z]$/.test(key)) {
        return currentGuess.length < WORD_LENGTH;
    }
    
    if (key === 'ENTER') {
        return currentGuess.length === WORD_LENGTH;
    }
    
    if (key === 'BACKSPACE') {
        return currentGuess.length > 0;
    }
    
    return false;
}

// ========================================
// DEBUGGING HELPERS (REMOVE BEFORE SUBMISSION)
// ========================================
initializeGame();
// Uncomment these lines for debugging help:
// console.log('Current word:', currentWord);
// console.log('Current guess:', currentGuess);
// console.log('Current row:', currentRow);

// console.log('Student implementation template loaded. Start implementing the functions above!'); 