const Word = require( '../Word' )

test( 'Should create and instance of the Word class', () => {
    const wordValue = 'test'
    const word = new Word( wordValue )

    expect( word instanceof Word )
    expect( word.value ).toEqual( wordValue )

    expect( word.letterArray.length ).toBeGreaterThan( 0 )

    expect( word.solved ).toEqual( false )

} )

describe( 'checkGuess()', () => {

    describe( 'should return an object when called', () => {

        test( 'with the success property as false when given a non matching value', () => {

            const word = new Word( 'test' )
            const result = word.checkGuess( 'a' )
            expect( result.success ).toEqual( false )
        } )

        test( 'with the success property as true when given a matching value', () => {

            const word = new Word( 'test' )
            const result = word.checkGuess( 't' )
            expect( result.success ).toEqual( true )
        } )

        test( 'with a gameOver property set as false if the word is not yet solved', () => {
            const word = new Word( 'test' )
            const result = word.checkGuess( 't' )
            expect( result.data.gameOver ).toEqual( false )
        } )
        
        test( 'with the gameOver property set as true if the word was solved', () => {
            const word = new Word( 'test' )
            word.checkGuess( 't' )
            word.checkGuess( 'e' )
            const result = word.checkGuess( 's' )
            expect( result.data.gameOver ).toEqual( true )
            expect( result.data.win ).toEqual( true )
            
        })
        
        test('with success as false and gameOver and win as true if the word is already solved', () => {
            const word = new Word( 'test' )
            word.checkGuess( 't' )
            word.checkGuess( 'e' )
            word.checkGuess( 's' )

            const result = word.checkGuess('a')

            expect( result.success ).toEqual( false )
            expect( result.data.gameOver ).toEqual( true )
            expect( result.data.win ).toEqual( true )

        })
    } )
} )

describe('display() should return a string when called', () => {

    test('containing all underscores if no letters are solved', () => {
        const word = new Word('test')
        const display = word.display()
        expect( display ).toEqual('____')
    })

    test('containing underscores for unsolved letters and the values of solved letters', () => {
        const word = new Word('test')
        word.checkGuess('e')
        const display = word.display()
        expect( display ).toEqual('_e__')
    })
})