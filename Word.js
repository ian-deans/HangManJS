

class Word {
    constructor( word ) {
        this.letterArray = word
            .split( "" )
            .map( val => new Letter( val ) )
        this.solved = false
    }

    checkGuess( letter ) {
        if ( this.solved ) {
            return {
                success: false,
                solved: this.solved,
            }
        }
        const results = this.letterArray
            .map( letterObj => letterObj.checkGuess( letter ) )
        
        
    }

    display() {
        return this.letterArray
            .map( letter => letter.display )
            .join( "" )
    }

}

class Letter {
    constructor( value ) {
        this.value = value
        this.display = "_"
        this.solved = false
    }

    checkGuess( letter ) {
        if ( this.value === letter ) {
            this.display = this.value
            this.solved = true
            return true
        }
        return false
    }

}


// module.exports = Word