const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function getUserInput( messageToUser ) {
    return new Promise((resolve, reject) => {
        rl.question( messageToUser, answer => {
            resolve( answer )
            rl.close()
        })
    })
}


async function test() {
    const guess = await getUserInput( "Guess a letter.")
    console.log( guess )

}



// GAME SETUP
// Initialize variables
const ALPHABET = []
const letters = "abcdefghijklmnopqrstuvwxyz"
for ( let index = 0; index < letters.length; index++ ) {
    ALPHABET.push( letters[ index ] )
}

const WIN = "win"
const LOSS = "loss"



let wins = 0
let losses = 0
let guessedLetters = []
let guessesRemaining = 6
let round = 1

const gameData = {
    wins: 0,
    losses: 0,
    guessedLetters: [],
    guessesRemaining: 6,
    round: 1,
}


// Declare a word bank
const wordBank = [ "cheese", "globe", "box" ]

// pick a word from bank at random store as targetWord
// let targetWord = selectTargetWord()
let targetWord = wordBank[ 1 ]

// build gameArray of underscores from target word
let gameArray = buildGameArray( targetWord )


// Game

gameLoop()



// ToolBox

function reset() {
    guessedLetters = []
    guessesRemaining = 6
    round = 1
    targetWord = wordBank[ 1 ]
    gameArray = buildGameArray( targetWord )

}


function selectTargetWord() {
    let randomNumber = Math.floor( Math.random() * wordBank.length ) //adjustlater
    let targetWord = wordBank[ randomNumber ]
    return targetWord
}

function buildGameArray( targetWord, otherArg, arg3 ) {
    let gameArray = []
    for ( let index = 0; index < targetWord.length; index++ ) {
        gameArray.push( "_" )
    }
    return gameArray
}

async function getUserGuess() {
    return await prompt( "Guess a letter" )
}

//gameloop
async function gameLoop() {
    console.log( "Round ", round )
    console.log( guessesRemaining )
    console.log( "gameArray: ", gameArray.join( "" ) )

    let userGuess = await getUserGuess()
    console.log( userGuess )

    if ( validateGuess( userGuess ) ) {
        //Handle correct guess
        handleCorrect( userGuess )

    } else {
        //handle incorrect guess
        gameData.guessesRemaining--
    }
    round++
    //check for endgame
    checkForEndgame()

}

function handleCorrect( guess ) {
    for ( let index = 0; index < gameArray.length; index++ ) {
        if ( targetWord[ index ] === guess ) {
            gameArray[ index ] = guess
        }
    }

}



function validateGuess( guess ) {
    console.log( guess )
    if ( ALPHABET.includes( guess ) ) {
        if ( !guessedLetters.includes( guess ) ) {

            guessedLetters.push( guess )
            console.log( guessedLetters )
            return true
        }
    }
    return false
}

function startNextRound() {
    // increment round count
    // reset game data
}

await function checkForEndgame() {
    if ( guessesRemaining < 1 ) {
        //handleloss
        console.log( "You Lose" )
    } else if ( !gameArray.includes( "_" ) ) {
        //handlewin
        console.log( "You WIn" )

    }
    //continue game
    gameLoop()
}

function endGame( gameResult ) {

    const restart = await prompt( "Play again? Y/N" )
    if ( restart.toLowerCase() === "y" ) {
        startNextRound()
    } else {
        process.exit()
    }

}



// get guess from user

//Validate guess

//Add guess to already guessed

//Determine if guess is correct/incorrect

    //If correct handle correct guess
    //Else handle incorrect guess

//Check for end condition
    //If end condition met -> handle endgame
    //else repeat gameloop

//ENDGAME
    //If loss handle loss
    //If win handle win
    //prompt player for restart
