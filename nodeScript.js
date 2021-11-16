const Game = require( './classes/Game' )
const Prompt = require( './util/Prompt' )
const wordBank = require( './assets/wordBank' )

const config = {
    wordBank,
    maxGuesses: 10,
}

const game = new Game( config )

// Greet player and ask to start game


// setup game and print player hud
game.setup()

printHUD()




function printHUD() {
    const { round, wins } = game.getGameData()
    const { remainingGuesses, prevGuesses } = game.getRoundData()
    const displayString = game.getDisplay()

    pr( `\nRound: ${round}    Wins: ${wins} ` )
    pr( `Guesses Remaining: ${remainingGuesses}    Previous Guesses: ${prevGuesses} ` )
    pr('')
    pr( displayString )
}

function pr( msg ) {
    console.log( msg )
}