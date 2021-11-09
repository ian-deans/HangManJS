const readline = require( "readline" )


const rl = readline.createInterface( {
    input: process.stdin,
    output: process.stdout,
} )

function prompt( messageToUser ) {
    return new Promise( ( resolve, reject ) => {
        rl.question( messageToUser, answer => {
            resolve( answer )
        } )
    } )
}

module.exports = prompt