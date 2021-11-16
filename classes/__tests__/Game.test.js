const Game = require( '../Game' )

test( 'should create a new instance with all properties defined with defaults', () => {
    const game = new Game()
    expect( game instanceof Game ).toEqual( true )
    expect( game.WORD_BANK ).toEqual( Game.DEFAULTS.WORD_BANK )
    expect( game.MAX_GUESSES ).toEqual( Game.DEFAULTS.MAX_GUESSES )
    expect( game.gameData ).toEqual( { round: 0, wins: 0 } )
    expect( game.word ).toEqual( null )
    expect( game.roundData ).toEqual( null )
} )

test( "should use custom config if provided", () => {
    const testWords = [ "whatever", "fuck", "code" ]
    const game = new Game( {
        wordBank: testWords,
        maxGuesses: 10
    } )

    expect( game.WORD_BANK ).toEqual( testWords )
    // expect( game.MAX_GUESSES ).toEqual( 10 )
} )