
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCZZxoFneDH5PBlc338gOjStZHD-Hqqu0g",
    authDomain: "train-activity-5f95c.firebaseapp.com",
    databaseURL: "https://train-activity-5f95c.firebaseio.com",
    projectId: "train-activity-5f95c",
    storageBucket: "",
    messagingSenderId: "464713205083"
};
firebase.initializeApp( config );
var database = firebase.database();




// 2. Button for adding Employees
$( "#add-train" ).on( "click", function ( event ) {
    event.preventDefault();

    // Grabs user input
    trainName = $( "#train-name" ).val().trim();
    destination = $( "#destination" ).val().trim();
    firstTrain = moment( $( "#first-train" ).val().trim(), "" ).format( "X" );
    frequency = $( "#frequency" ).val().trim();






    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        location: destination,
        start: firstTrain,
        rate: frequency
    }



    // Uploads employee data to the database
    database.ref().push( newTrain );

    // Logs everything to console
    console.log( newTrain.name );
    console.log( newTrain.location );
    console.log( newTrain.start );
    console.log( newTrain.rate );

    alert( "Train Successfully Added" );

    // Clears all of the text-boxes
    $( "#train-name" ).val( "" );
    $( "#destination" ).val( "" );
    $( "#first-train" ).val( "" );
    $( "#frequency" ).val( "" );
} );



// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on( "child_added", function ( childSnapshot ) {
    console.log( childSnapshot.val() );

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().location;
    var firstTrain = childSnapshot.val().start;
    var frequency = childSnapshot.val().rate;

    // Train Info
    console.log( trainName );
    console.log( destination );
    console.log( firstTrain );
    console.log( frequency );

    var newRow = $( "<tr>" ).append(
        $( "<td>" ).text( trainName ),
        $( "<td>" ).text( destination ),
        $( "<td>" ).text( frequency ),
        $( "<td>" ).text( arrival ),
        $( "<td>" ).text( nextTrain ),
    );

    $( "#train-table > tbody" ).append( newRow );
} );




// Assumptions
var tFrequency = 8;

// Time is 3:30 AM
var firstTime = "08:45";

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment( firstTime, "HH:mm" ).subtract( 1, "years" );
console.log( firstTimeConverted );

// Current Time
var currentTime = moment();
console.log( "CURRENT TIME: " + moment( currentTime ).format( "hh:mm" ) );

// Difference between the times
var diffTime = moment().diff( moment( firstTimeConverted ), "minutes" );
console.log( "DIFFERENCE IN TIME: " + diffTime );

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log( tRemainder );

// Minute Until Train
var arrival = tFrequency - tRemainder;
console.log( "MINUTES TILL TRAIN: " + arrival );

// Next Train
var nextTrain = moment().add( arrival, "minutes" );
console.log( "ARRIVAL TIME: " + moment( nextTrain ).format( "hh:mm" ) )


//     var newRow = $( "<tr>" ).append(
//         $( "<td>" ).text( trainName ),
//         $( "<td>" ).text( destination ),
//         $( "<td>" ).text( frequency ),
//         $( "<td>" ).text( arrival ),
//         $( "<td>" ).text( nextTrain ),




//     );

//     $( "train-table > tbody" ).append( newRow );
// } );