const Letter = require( '../Letter' )

test( 'Creates a new instance of a Letter', () => {
    const letter = new Letter( 'a' )
    expect( letter instanceof Letter ).toEqual( true )
} )

test( 'checkGuess should return true and set solved property to true when given a matching values', () => {
    const letter = new Letter( 'a' )
    expect( letter.checkGuess( 'a' ) ).toEqual( true )
    expect( letter.solved ).toEqual( true )

} )

test( 'checkGuess to return false and to leave the solved property as false when given a non matching value', () => {
    const letter = new Letter( 'a' )
    expect( letter.checkGuess( 'b' ) ).toEqual( false )
    expect( letter.solved ).toEqual( false )
} )

test( 'checkGuess should return null if the solved property is already set true', () => {
    const letter = new Letter( 'a' )
    letter.checkGuess( 'a' )
    expect( letter.checkGuess( 'b' ) ).toEqual( null )
} )