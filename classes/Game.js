const Word = require( './Word' )

class Game {

    constructor( config ) {
        this.gameData = {
            round: 0,
            wins: 0,
        }

        this.word = null
        this.roundData = null

        this.configure( config )

        this.setup = this.setup.bind( this )
        this.getRandomWord = this.getRandomWord.bind( this )
        this.getGameData = this.getGameData.bind( this )
    }

    configure( config ) {
        this.MAX_GUESSES = config && config.hasOwnProperty( 'maxGuesses' )
            ? config.maxGuesses
            : Game.DEFAULTS.MAX_GUESSES

        this.WORD_BANK = config && config.hasOwnProperty( 'wordBank ' )
            ? config.wordBank
            : Game.DEFAULTS.WORD_BANK
    }

    setup() {
        this.word = new Word( this.getRandomWord() )
        this.roundData = this.generateRoundData()
        this.gameData.round++
    }

    generateRoundData() {
        return {
            remainingGuesses: this.MAX_GUESSES,
            prevGuesses: [],
        }
    }

    getGameData() {
        return this.gameData
    }

    getRoundData() {
        const { prevGuesses, remainingGuesses } = this.roundData
        return {
            prevGuesses,
            remainingGuesses,
            gameString: this.word.display(),
        }
    }

    getRandomWord() {
        const randomIndex = Math.floor( Math.random() * this.WORD_BANK.length )
        return this.WORD_BANK[ randomIndex ]
    }

    getDisplay() {
        return this.word.display()
    }

    processPlayerGuess( guess ) {
        const guessIsValid = this.validateGuess( { guess })

        if ( !guessIsValid ) {
            return {
                success: false,
                data: {
                    message: 'Invalid Guess'
                }
            }
        }

        this.addGuessToPrevious( guess )

        const result = this.word.checkGuess( guess )

        const { success, data: gameOver } = result

        if ( success ) {
            if ( gameOver ) {
                this.incrementWins()

                return {
                    succes: true,
                    data: {
                        gameOver: true,
                        win: true,
                    }
                }
            }

            return {
                success: true,
                data: {
                    gameOver: false,
                }
            }
        } else {
            this.decrementPlayerGuesses()
            
            if ( this.playerIsOutOfGuesses() ) {
                return {
                    success: false,
                    data: {
                        gameOver: true,
                        win: false,
                    }
                }
            }

            return {
                success: false,
                data: {
                    gameOver: true,
                    win: false,
                }
            }

        }

    }

    addGuessToPrevious( val ) {
        return this.roundData.incorrectGuesses.push( val )
    }

    playerIsOutOfGuesses() {
        return this.roundData.remainingGuesses < 1
            ? true
            : false
    }

    incrementWins() {
        this.gameData.wins++
    }

    decrementPlayerGuesses() {
        this.roundData.remainingGuesses--
    }

    static DEFAULTS = {
        MAX_GUESSES: 6,
        WORD_BANK: [ `globe`, `shoe`, `quantification`, `rome` ],
    }

    static messages = {
        mainPrompt: `C'mon meow, guess a letter: `,
        invalidGuess: `Fuck you're dumb. That value is not a letter, pick a letter: `,
        alreadyGuessed: `Yeah... you already tried that one...\n`,
        correctGuess: `Correct! I guess you are smarter than you look\n`,
        incorrectGuess: `Wrong! Be better\n`,
    }

    validateGuess( guess ) {
        const regex = /^[A-Za-z]+$/
        const guessIsValid = guess.match( regex ) && guess.length === 1
        
        if ( !guessIsValid ) {
            return false
        }

        const isNewGuess = !this.roundData.prevGuesses.includes( guess )

        if ( !isNewGuess ) {
            return false
        }

        return true
    }
}

module.exports = Game