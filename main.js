// const Game = require( './Game' )
// const prompt = require( './Prompt' )
const word_bank = require('./assets/wordBank')

const refs = buildHTMLReferences()
// let PLAYER_INPUT_ON = false


const config = {
    wordBank: word_bank,
}
const game = new Game( {} )

const { inputOn, inputOff } = addKeyListener()

main()



function main() {
    // get and render game data
    renderGameData()

    // ask player to begin
    let playerConfirmed = askPotentialPlayerToPlay()
    console.log( playerConfirmed )

    if ( playerConfirmed ) {
        game.setup()
        renderGameData()
        // renderRoundData()

        doTurn()
    }

}



function renderGameData() {
    const { round, wins, losses } = game.getGameData()
    refs.round.innerHTML = round
    refs.wins.innerHTML = wins
    refs.losses.innerHTML = losses
}

function renderRoundData() {
    const { incorrectGuesses, remainingGuesses, gameString, message } = game.getRoundData()
    refs.incorrectGuesses.innerHTML = incorrectGuesses
    refs.remainingGuesses.innerHTML = remainingGuesses
    refs.gameString.innerHTML = gameString
    refs.message.innerHTML = message
}

function askPotentialPlayerToPlay() {
    return confirm( 'Want to play?' )
}


function doTurn() {
    renderRoundData()
    // message player and receive input
    // const val = prompt("Enter")
    inputOn()
}


// validate input with custom code or with Game.validateInput( playerInput )


// process player's guess


// check end game conditions

// re-gather and render game data and display message to user


function addKeyListener() {
    let PLAYER_INPUT_ON = false

    const inputOn = () => PLAYER_INPUT_ON = true
    const inputOff = () => PLAYER_INPUT_ON = false

    document.addEventListener( "keydown", ( event ) => {
        if ( PLAYER_INPUT_ON ) {
            const val = event.key

            const result = game.checkGuess( val )

            console.log( event.key )

            const { valid, message } = Game.validateGuess( val )

            if ( !valid ) {
                setMessage( `Invalid selection` )
            }

            if ( game.guessAlreadyMade( val ) ) {
                setMessage( `You already tried that one` )
            }

            inputOn()
        }
    } )

    return { inputOn, inputOff }
}

function setMessage( msg ) {
    refs.message.innerHTML = msg
}

function buildHTMLReferences() {
    return {
        round: document.getElementById( "round" ),
        wins: document.getElementById( "wins" ),
        losses: document.getElementById( "losses" ),

        incorrectGuesses: document.getElementById( "previous-guesses" ),
        remainingGuesses: document.getElementById( "guesses-remaining" ),
        gameString: document.getElementById( "game-string" ),
        message: document.getElementById( "message" ),
    }
}

// function playerInputOn() {
//     PLAYER_INPUT_ON = true
// }

// function playerInputOff() {
//     PLAYER_INPUT_ON = false
// }