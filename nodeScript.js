const Game = require( './classes/Game' )
const Prompt = require( './util/Prompt' )
const wordBank = require( './assets/wordBank' )

import Game from "./classes/Game"

const config = {
    wordBank,
    maxGuesses: 10,
}

const game = new Game( config )
main()



function main() {
    game.setup()

    pr( 'Welcome to hangman!' )
    turn()

}

async function turn() {
    printHUD()

    let playerInput = await Prompt("Pick a letter: ")
    
    const result = game.processPlayerGuess( playerInput )


    if ( result.data.gameOver ) {
        pr( 'game over' )

        if ( result.data.win ) {
            pr( 'win!')
        } else {
            pr( 'loss!' )
        }

        const response = await Prompt('Play again? [Y/N]')
        pr( response )

        if ( response.toLowerCase() === 'y' ) {
            pr('new game')
            game.setup()
        } else {
            process.exit()
        }

    }

    turn()
}





function printHUD() {
    const { round, wins } = game.getGameData()
    const { remainingGuesses, prevGuesses } = game.getRoundData()
    const displayString = game.getDisplay()

    pr( `\nRound: ${round}    Wins: ${wins} ` )
    pr( `Guesses Remaining: ${remainingGuesses}    Previous Guesses: ${prevGuesses} ` )
    pr( '' )
    pr( displayString )
    pr( '' )
}

function pr( msg ) {
    console.log( msg )
}