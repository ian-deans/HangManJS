// var name = 'Ian'
// var age = 35


var ian = {
    name: "Ian",
    age: 35,
    height: `6'3"`,
    contact: {
        cell: '1241241',
        home: '9518160486',
        lost: 'retrun back 1014 High st',
    },
    contactInfo: ['707650302', 'emailAddress', 'lost stuff', '34312412', 'fiqwenfpioqwfn']
}

// var phone_type = "home"

// var propName = "age"

// var numbers = [ 1, 23, 5, 5 ]


// // console.log( ian['contact'][ phone_type ] )
// printIanProperty( 'age' )
// printIanProperty( 'height' )

// printIanProperty( propName )


// function printIanProperty( key ) {
//     console.log( ian[ key ] )
// }
// DATA
var caelan = {
    name: "Caelan",
    age: 26,
    contact: { 
        cell: '7076550302',
        email: "xsomedaykk@gmail.com",
        lost: "return back to 123 spooner st",
        
    },
    // contactInfo: ['707650302',    'emailAddress', 'lost stuff', '34312412', 'fiqwenfpioqwfn']
}


// ACTIONS
printContactinfo( caelan  )
printContactinfo( ian  )





// TOOLBOX
function printContactinfo(obj){

    if( obj.contactInfo != undefined ) {        

        for( var i = 0; i < obj.contactInfo.length; i++ ) {
            console.log( obj.contactInfo[ i ] )
        }

    } else {
        console.log( 'object does not have contactInfo')
    }

    console.log( obj.name )

}


function printLost (target){
    console.log( target.contact.lost )
    

}

// printLost( caelan )
// printLost( ian )

function printCaelanProperty ( key ){
    console.log( caelan[ key ] )
}
