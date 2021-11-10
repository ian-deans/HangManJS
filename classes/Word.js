const Letter = require( './Letter' )

class Word {
    constructor( word ) {
        this.value = word
        this.letterArray = this.value
            .split( "" )
            .map( val => new Letter( val ) )
        this.solved = false
    }

    checkGuess( letter ) {
        if ( this.solved ) {
            return {
                success: false,
                data: {
                    gameOver: true,
                    win: true,
                },
            }
        }

        const results = this.letterArray
            .map( letterObj => letterObj.checkGuess( letter ) )

        if ( results.includes( true ) ) {

            const allLettersSolved = this.letterArray
                .map( letter => letter.solved )

            if ( !allLettersSolved.includes(false) ) {
                this.solved = true
                return {
                    success: true,
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
            return {
                success: false,
                data: {
                    message: 'Incorrect Guess',
                }
            }
        }
    }

    display() {
        return this.letterArray
            .map( letter => letter.display )
            .join( "" )
    }

}


module.exports = Word