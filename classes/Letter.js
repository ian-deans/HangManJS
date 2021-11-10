
class Letter {
    constructor( value ) {
        this.value = value
        this.display = "_"
        this.solved = false
    }

    checkGuess( letter ) {
        if ( this.solved ) {
            return null
        }
        if ( this.value === letter ) {
            this.display = this.value
            this.solved = true
            return true
        }
        return false
    }

}

module.exports = Letter