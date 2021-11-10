class Word {
    /**
     * 
     * Concerns of Word class:
     *  - holds array of Letters
    */
    constructor( word ) {
        this.letterArray = word
            .split( "" )
            .map( val => new Letter( val ) )
    }

    checkGuess( letter ) {
        const guessWasCorrect = this.letterArray
            .map( letterObj => letterObj.compare( letter ) )
            .includes( true )
        return guessWasCorrect
    }

    display() {
        return this.letterArray
            .map( letter => letter.display ).join( "" )
    }

    isSolved() {
        const letterTokens = this.letterArray
            .map( letterObj => letterObj.solved )

        return !letterTokens.includes( false ) ? true : false
    }

}

class Letter {
    /**
     * 
     *Concerns of Letter class:
     *  - knows its true value ( letter in alphabet it represents )
     *  -  
     */

    constructor( value ) {
        this._value = value
        this._display = "_"
        this.value = value
        this.display = "_"
        this.solved = false
    }

    compare( letter ) {
        if ( this.value === letter ) {
            this.solved = true
            this.display = this.value
            return true
        }
        return false
    }
}

module.exports = { Word, Letter }