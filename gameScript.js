// GAME SETUP
// Initialize variables

const MAX_GUESSES = 6
const WORD_BANK = ["cheese", "globe", "box"]

const MESSAGES = {
    guessLetter: "Press a key to guess a letter",
    win: "You won!",
    loss: "You have run out of guesses!",
    invalidGuess: "Letters Only!"
}


const ALPHABET = generateAlphabetKey();
const refs = buildHTMLReferences();
const gameData = generateGameData();

let ACTIVE = false
addKeyListener()

let wordObj = new Word( pickRandomWord() )
updateGameData()


// player guesses
setMessage( MESSAGES.guessLetter )
ACTIVE = true



function setMessage( message ) {
    refs.message.innerHTML = message
}


function updateGameData() {
    gameData.gameString = wordObj.display()
    renderGameData()
}

function renderGameData() {
    renderStats()
    renderPreviousGuesses()
    renderGameString()
    renderRound()
}

function renderStats() {
    refs.guessesRemaining.innerHTML = gameData.guessesRemaining
    refs.wins.innerHTML = gameData.wins
    refs.losses.innerHTML = gameData.losses
}

function renderPreviousGuesses() {
    refs.previousGuesses.innerHTML = gameData.previousGuesses
}

function renderGameString() {
    refs.gameString.innerHTML = gameData.gameString
}

function renderRound() {
    refs.round.innerHTML = gameData.round
}

function pickRandomWord() {
    const randomIndex = () =>  Math.floor( Math.random() * WORD_BANK.length )
    return WORD_BANK[ randomIndex() ]
}




function buildHTMLReferences() {
    return {
        round: document.getElementById("round"),
        previousGuesses: document.getElementById("previous-guesses"),
        gameString: document.getElementById("game-string"),
        wins: document.getElementById("wins"),
        losses: document.getElementById("losses"),
        guessesRemaining: document.getElementById("guesses-remaining"),
        message: document.getElementById("message"),
    }
}

function addKeyListener() {    
    document.addEventListener("keydown", (event) => {
        if ( ACTIVE ) {
            // if (event.key === "f") {
            //     // ACTIVE = false
            //     // setTimeout(() => {
            //     //     ACTIVE = true
            //     // }, 4000)
            // }
            console.log(event.key)
            
            
        }
    })   
}

function handlePlayerInput( event ) {
    if ( ACTIVE ) {
        playerInput( false )
        const guess = event.key
        
        // check if guess is a valid letter
        if ( guessIsLetter( guess )) {

            // check if guess as been guessed before
            if ( letterIsNewGuess( guess ) ) {
                processGuess( guess )
            } else {
                setMessage( MESSAGES.letterAlreadyGuessed )
            }
            
        } else {
            setMessage( MESSAGES.invalidGuess )
        }
    }
}

function playerInput( arg ) {
    ACTIVE = arg
}

function letterIsNewGuess( letter ) {
    if ( !gameData.previousGuesses.includes( letter ) ) {
        return true
    }
    return false
}

function guessIsLetter( guess ) {
    const regex = /^[A-Za-z]+$/
    if ( guess.match( regex )) {
        return true
    }
    return false
}

function generateGameData() {
    return { 
        wins: 0,
        losses: 0,
        previousGuesses: [],
        guessesRemaining: MAX_GUESSES,
        round: 1,
    }
}

function generateAlphabetKey() {
    const letters = "abcdefghijklmnopqrstuvwxyz"
    return letters.split("")
}

