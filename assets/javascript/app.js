var config = {
    apiKey: "AIzaSyABMVWr-rt8_UvQz5sDG8y1a5uiIC7yTEs",
    authDomain: "cbc-project-b481a.firebaseapp.com",
    databaseURL: "https://cbc-project-b481a.firebaseio.com",
    projectId: "cbc-project-b481a",
    storageBucket: "cbc-project-b481a.appspot.com",
    messagingSenderId: "899424688385"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit-button").on("click", function (event) {
    event.preventDefault();

    var train = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = $("#trainTime").val().trim();
    var frequency = $("#frequency").val().trim();



    var trainInfo = {
        train: train,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
    }

    database.ref().push(trainInfo);

    //   console.log(trainInfo.train);
    //   console.log(trainInfo.destination);
    //   console.log(trainInfo.trainTime);
    //   console.log(trainInfo.frequency);




    //alert train is added
    alert("Train successfully added!")

    //clear out inputs 
    $("#trainName").val("");
    $("#destination").val("");
    $("#trainTime").val("");
    $("#frequency").val("");

})

//create firebase event
database.ref().on("child_added", function (childSnapshot) {


    //store into a variable
    var train = childSnapshot.val().train;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().trainTime;
    var frequency = childSnapshot.val().frequency;
    var fromNow = childSnapshot.val().frequency;

    var time = trainTime;
    var format = "HH:mm";
    var convertedTime = moment(time, format);
    
    // var toNow = moment(convertedTime).toNow();
    // console.log(fromNow);

    var firstTimeConverted = moment(time, "HH:mm").subtract(1, "day");
    console.log(firstTimeConverted);
    var currentTime = moment();
    var diffTime = moment(currentTime).diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var tMinutesTillTrain = frequency - tRemainder;
    console.log(tMinutesTillTrain);
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");



    // var firstTimeConverted = moment(time, "HH:mm").add(frequency, "minute");
    // console.log(firstTimeConverted);

    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // var tRemainder = diffTime % frequency;
    // console.log(tRemainder);

    // var tMinutesTillTrain = frequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    


    //moment().max(moment().add(1, 'd'));

    //var timePassed = moment().max(comvertedTime).add(freque)


    //   console.log(train);
    //   console.log(destination);
    //   console.log(trainTime);
    //   console.log(frequency);

    //store military time
    // moment().diff(moment(employeeStartDate), "months");



    //create a new row
    var newRow = $("<tr>").append(
        $("<td>").text(train),
        $("<td>").text(destination),
        $("<td>").text(nextTrain),
        $("<td>").text(frequency),
        $("<td>").text(tMinutesTillTrain)
        // $("<td>").text(minutesAway)


    )

    //add the newRow to the table
    $("#train-table > tbody").append(newRow);
})






