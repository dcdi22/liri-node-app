require("dotenv").config();
var keys = require('./keys.js');
var fs = require("fs");
var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var input = process.argv[3];

console.log("Please use one of the following commands:" + "\n" + "`my-tweets`" + "\n" + "`spotify-this-song`" + "\n" + "`movie-this`" + "\n" + "`do-what-it-says`" + "\n")

switch (command) {
    case "my-tweets":
        grabTweets()
        break;
    case "spotify-this-song":
        grabSpotify()
        break;
    case "movie-this":
        grabMovie()
        break;
    case "do-what-it-says":
        doAsTold()
        break;
}

function grabTweets() {

    var params = {
        screen_name: 'boughtaDonut',
        count: 20
    };

    // GET request for last 20 tweets on my account's timeline
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) { // if there IS an error
            console.log('Error occurred: ' + error);
        } else { // if there is NO error
            console.log("///////////// " + " " + "TWITTER: " + " " + "/////////////")
            console.log("\nMy 20 Most Recent Tweets");
            console.log("");

            for (var i = 0; i < tweets.length; i++) {
                console.log("( #" + (i + 1) + " )  " + tweets[i].text);
                console.log("Created:  " + tweets[i].created_at);
                console.log("");
            }
            console.log("///////////// " + "////////// " + "/////////////")
        }
    });

}

function grabSpotify() {
    //spotify.getArtist
    if (input === undefined) {
        input = "The Sign";
    }
    // fs.readFile("./random.txt", "utf8", function (error, data) {
    //     var dataArr = data.split(",");
    //     // console.log (noInput);
    //     console.log(dataArr);
    //     console.log(dataArr[1]);
    // });

    spotify.search({
        type: 'track',
        query: input
    }, function (err, data) {
        if (err) {
            console.log('ERROR: ' + err);
            return;
        } else {
            var songInfo = data.tracks.items[0];
            console.log("///////////// " + " " + "SPOTIFY RESULTS: " + " " + "/////////////")
            console.log("\nARTIST:", songInfo.artists[0].name);
            console.log("SONG:", songInfo.name);
            console.log("ALBUM:", songInfo.album.name);
            console.log("PREVIEW:", songInfo.preview_url);
            console.log("\n///////////// " + "////////////////// " + "/////////////")
            fs.appendFile("log.txt", "\n" + "\n" + songInfo.artists[0].name + "\n" + songInfo.name + "\n" + songInfo.album.name + "\n" + songInfo.preview_url, function(err) { 
                if (err) {
                    console.log("ERROR")
                }
            });
        };
    });

}

function grabMovie() {
    if (input === undefined) {
        input = "Mr. Nobody";
    }

    request("http://www.omdbapi.com/?apikey=trilogy&t=" + input, function (error, response, body) {

        // If the request was successful...
        if (!error && response.statusCode === 200) {

            // Then log the body from the site!
            //console.log(body);
            //console.log(JSON.parse(body));
            var movieInfo = JSON.parse(body);
            console.log("///////////// " + " " + "OMDB RESULTS: " + " " + "/////////////")
            console.log("\nTITLE: " + movieInfo.Title);
            console.log("YEAR: " + movieInfo.Year);
            console.log("IMDB: " + movieInfo.Ratings[0].Value);
            console.log("ROTTEN TOMATOES: " + movieInfo.Ratings[1].Value);
            console.log("COUNTRY: " + movieInfo.Country);
            console.log("LANGUAGE: " + movieInfo.Language);
            console.log("PLOT: " + movieInfo.Plot);
            console.log("ACTORS: " + movieInfo.Actors);
            console.log("\n///////////// " + "////////////// " + "/////////////");
            fs.appendFile("log.txt", "\n" + "\n" + movieInfo.Title + "\n" + movieInfo.Year + "\n" + movieInfo.Country + "\n" + movieInfo.Language + "\n" + movieInfo.Plot + "\n" + movieInfo.Actors, function(err) { 
                if (err) {
                    console.log("ERROR")
                }
            });
        }
    });

}

// function doAsTold() {
//     // var noInput = fs.readFile("./random.txt", "utf8", function (error, data) {
//     //     var dataArr = data.split(",");
//     //     // console.log (noInput);
//     //     console.log(dataArr);
//     // });

// }

function doAsTold() {
    fs.readFile("./random.txt", "utf8", function (error, data) {
        var dataArr = data.split(",");
        // console.log (noInput);
        //console.log(dataArr);
        command = dataArr[0]
        input = dataArr[1]
        switch (command) {
            case "my-tweets":
                grabTweets()
                break;
            case "spotify-this-song":
                grabSpotify()
                break;
            case "movie-this":
                grabMovie()
                break;
            case "do-what-it-says":
                doAsTold()
                break;
        }
    });
}