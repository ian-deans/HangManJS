// const { Word } = require( "./gameClasses" )
// const prompt = require( "./Prompt" )


const MAX_GUESSES = 6

//? Maybe have the Game class take a function to print messages
// const print = ( msg ) => console.log( msg )

class Game {
    /**
     * 
     */
    constructor( config ) {

        if ( config ) {
            if ( config.hasOwnProperty( 'wordBank' ) ) {
                this.WORD_BANK = config.wordBank
            } else {
                this.WORD_BANK = Game.DEFAULTS.WORD_BANK
            }

            if ( config.hasOwnProperty( 'maxGuesses' ) ) {
                this.MAX_GUESSES = config.maxGuesses
            } else {
                this.MAX_GUESSES = Game.DEFAULTS.MAX_GUESSES
            }
        } else {
            this.WORD_BANK = Game.DEFAULTS.WORD_BANK
            this.MAX_GUESSES = Game.DEFAULTS.MAX_GUESSES
        }

        this.gameData = {
            round: 0,
            wins: 0,
            losses: 0,
        }

        // this.prompt = prompt
        this.wins = 0
        this.losses = 0

        this.word = null
        this.roundData = null

        this.loop = this.loop.bind( this )
        this.setup = this.setup.bind( this )
        this.getRandomWord = this.getRandomWord.bind( this )
        this.getGameData = this.getGameData.bind( this )

        // this.setup()
    }

    setup() {
        // get a word, generate Word, (re)set game data
        const wordRaw = this.getRandomWord()
        this.word = new Word( wordRaw )
        this.roundData = {
            remainingGuesses: this.MAX_GUESSES,
            incorrectGuesses: [],
            message: `Alright, new game, first turn`
        }
        this.gameData.round++

        print( this )
    }

    getGameData() {
        return this.gameData
    }

    getRoundData() {
        const { incorrectGuesses, remainingGuesses, message } = this.roundData
        return {
            incorrectGuesses: incorrectGuesses,
            remainingGuesses: remainingGuesses,
            gameString: this.word.display(),
            message: message,
        }
    }

    getRandomWord() {
        const randomIndex = Math.floor( Math.random() * this.WORD_BANK.length )
        return this.WORD_BANK[ randomIndex ]
    }

    printWordString() {
        print( this.word.display() )
    }

    // printHUD() {
    //     // this.printWordString()
    //     print( `
    //     Guesses Remaining: ${ this.roundData.remainingGuesses}
    //     Letters Guessed:  ${ this.roundData.incorrectGuesses } 
    //             ${this.word.display()}
    //     `)
    // }

    processPlayerGuess( val ) {
        val.toUpperCase()
        if ( !Game.validateGuess( val ) ) {
            // invalid input
            return { 
                success: false,
                message: `Invalid guess, letters only please`,

            }
        }
    }

    async loop( message = Game.messages.mainPrompt ) {

        // this.printHUD()

        // prompt user
        // const playerGuess = await this.prompt( message )

        // validate input
        if ( !Game.validateGuess( playerGuess ) ) {
            return this.loop( Game.messages.invalidGuess )
        }

        if ( this.guessAlreadyMade( playerGuess ) ) {
            return this.loop( Game.messages.alreadyGuessed )
        }


        const guessWasCorrect = this.word.checkGuess( playerGuess )

        //! Not clever, not happy with it
        if ( !guessWasCorrect ) {
            this.roundData.incorrectGuesses.push( playerGuess )
        }

        this.handleGuess( guessWasCorrect )

        if ( this.isGameOver() ) {
            return process.exit()
        }

        return this.loop()

        // // check for endgame conditions
        // if ( this.gameIsOver() ) {
        //     return this.handleEndGame()
        // } else {
        //     return this.loop()
        // }

    }

    addIncorrectGuess( val ) {
        return this.roundData.incorrectGuesses.push( val )
    }

    guessAlreadyMade( playerGuess ) {
        return this.roundData.incorrectGuesses.includes( playerGuess )
    }

    handleGuess( guessWasCorrect ) {
        if ( guessWasCorrect ) {
            print( Game.messages.correctGuess )
        } else {
            print( Game.messages.incorrectGuess )
            this.roundData.remainingGuesses--
        }


    }

    isGameOver() {
        if ( this.word.isSolved() ) {
            print( `You won!` )
            return true
        } else if ( this.roundData.remainingGuesses < 1 ) {
            print( `You lost!` )
            return true
        }

        return false
    }




    static DEFAULTS = {
        MAX_GUESSES: 6,
        WORD_BANK: [ `globe`, `shoe`, `quantification`,`rome` ],
    }

    static messages = {
        mainPrompt: `C'mon meow, guess a letter: `,
        invalidGuess: `Fuck you're dumb. That value is not a letter, pick a letter: `,
        alreadyGuessed: `Yeah... you already tried that one...\n`,
        correctGuess: `Correct! I guess you are smarter than you look\n`,
        incorrectGuess: `Wrong! Be better\n`,

    }

    static guessIsLetter( val ) {
        const regex = /^[A-Za-z]+$/
        if ( !val.match( regex ) && !val.length === 1 ) {
            return false
        }
        return true
    }

    static validateGuess( val ) {
        const regex = /^[A-Za-z]+$/
        if ( val.match( regex ) && val.length === 1 ) {
            return {
                valid: true,
                message: null,
            }
        }
        return {
            valid: false,
            message: Game.messages.invalidGuess,
        }
    }
}

