require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);



var axios = require("axios")

var topic = process.argv[2];
var term = process.argv.slice(3).join(" ")

var moment = require("moment");
var fs = require('file-system');

// var validateError = function (error) {
//     if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.log("---------------Data---------------");
//         console.log(error.response.data);
//         console.log("---------------Status---------------");
//         console.log(error.response.status);
//         console.log("---------------Status---------------");
//         console.log(error.response.headers);
//     } else if (error.request) {
//         // The request was made but no response was received
//         // `error.request` is an object that comes back with details pertaining to the error that occurred.
//         console.log(error.request);
//     } else {
//         // Something happened in setting up the request that triggered an Error
//         // console.log("Error", error.message);
//     }
//     console.log(error.config)
// }


var concert = function () {

    let queryUrl = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(function (response) {
        // console.log(queryUrl)
        console.log(`Name of the Venue:  ${response.data[0].venue.name}`);
        console.log(`Venue Location:  ${response.data[0].venue.city}, ${response.data[0].venue.region}, ${response.data[0].venue.country}`);
        var newArray = response.data[0].datetime.split("T")
        var date = newArray[0]
        // console.log(moment())
        // console.log("test", newArray)
        console.log(`Date of the Event:  ${moment(date).format("MM-DD-YYYY")}`);
        // "datetime": "2019-11-22T19:00:00"
        // newArray[0, 1] 0= 2019-11-22, 1= the rest 

        var logged = [`Name of the Venue:  ${response.data[0].venue.name}`, `\nVenue Location:  ${response.data[0].venue.city}, ${response.data[0].venue.region}, ${response.data[0].venue.country}`,
        `\nDate of the Event:  ${moment(date).format("MM-DD-YYYY")}`]

        var info = "node liri-js \n" + topic + " \n" + term + " \n" + logged
        fs.appendFile("log.txt", info, "utf-8", function (err) {
            if (err) throw err;
            // if no error
            console.log("Data is appended to file successfully.")
        })
    }).catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            // console.log("Error", error.message);
        }
        console.log(error.config)
    })
}

var song = function () {
    if (term === "") {


        spotify.search({ type: 'track', query: 'The Sign', limit: 1 }, function (err, response) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var artist = [];

            for (var i = 0; i < response.tracks.items[0].artists.length; i++) {
                artist.push(response.tracks.items[0].artists[i].name)
            }

            console.log(`Artist(s): ${artist}`);
            console.log(`Song Name: ${response.tracks.items[0].name}`)
            console.log(`Album Name: ${response.tracks.items[0].album.name}`)
            console.log(`Preview Link: ${response.tracks.items[0].external_urls.spotify}`)
        })
    }
    else {
        spotify.search({ type: 'track', query: term, limit: 1 }, function (err, response) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var artist = [];

            for (var i = 0; i < response.tracks.items[0].artists.length; i++) {
                artist.push(response.tracks.items[0].artists[i].name)
            }

            console.log(`Artist(s): ${artist}`);
            console.log(`Song Name: ${response.tracks.items[0].name}`)
            console.log(`Album Name: ${response.tracks.items[0].album.name}`)
            console.log(`Preview Link: ${response.tracks.items[0].external_urls.spotify}`)

            var logged = [`Artist(s): ${artist}`, `\nSong Name: ${response.tracks.items[0].name}`,
            `\nAlbum Name: ${response.tracks.items[0].album.name}`, `\nPreview Link: ${response.tracks.items[0].external_urls.spotify}`]

            var info = "node liri-js \n" + topic + " \n" + term + " \n" + logged
            fs.appendFile("log.txt", info, "utf-8", function (err) {
                if (err) throw err;
                // if no error
                console.log("Data is appended to file successfully.")
            })
        })
    }
}
var movie = function () {
    if (term === "") {
        term = "Mr.Nobody"
        let queryUrl = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy";

        axios.get(queryUrl).then(function (response) {
            // console.log(queryUrl)
            console.log(`Movie Title:  ${response.data.Title}`);
            console.log(`Release Year:  ${response.data.Year}`);
            console.log(`IMDB Rating: ${response.data.imdbRating}`);
            console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
            console.log(`Country of Production: ${response.data.Country}`);
            console.log(`Movie Langauge: ${response.data.Language}`);
            console.log(`Movie Plot: ${response.data.Plot}`);
            console.log(`Movie Actors: ${response.data.Actors}`);
        }
        )
    }
    else {
        let queryUrl = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy";

        axios.get(queryUrl).then(function (response) {
            // console.log(queryUrl)
            console.log(`Movie Title:  ${response.data.Title}`);
            console.log(`Release Year:  ${response.data.Year}`);
            console.log(`IMDB Rating: ${response.data.imdbRating}`);
            console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
            console.log(`Country of Production: ${response.data.Country}`);
            console.log(`Movie Langauge: ${response.data.Language}`);
            console.log(`Movie Plot: ${response.data.Plot}`);
            console.log(`Movie Actors: ${response.data.Actors}`);

            var logged = [`Movie Title:  ${response.data.Title}`, `\nRelease Year:  ${response.data.Year}`, `\nIMDB Rating: ${response.data.imdbRating}`,
            `\nRotten Tomatoes Rating: ${response.data.Ratings[1].Value}`, `\nCountry of Production: ${response.data.Country}`, `\nMovie Langauge: ${response.data.Language}`,
            `\nMovie Plot: ${response.data.Plot}`, `\nMovie Actors: ${response.data.Actors}`]

            var info = "node liri-js \n" + topic + " \n" + term + " \n" + logged
            fs.appendFile("log.txt", info, "utf-8", function (err) {
                if (err) throw err;
                // if no error
                console.log("Data is appended to file successfully.")
            })
        }).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                // console.log("Error", error.message);
            }
            console.log(error.config)
        })
    }




    // Then run a request with axios to the OMDB API with the movie specified

}

var read = function () {
    fs.readFile("./random.txt", "utf-8", (err, data) => {
        if (err) throw err;
        // console.log(data);
        var dataArray = data.split(",")
        // console.log(dataArray)
        topic = dataArray[0];
        term = dataArray[1];
        song();

    })
}



switch (topic) {
    case "concert-this":
        concert();
        break;
    case "spotify-this-song":
        song();
        break;
    case "movie-this":
        movie();
        break;
    case "do-what-it-says":
        read();
        break;
    default:
        console.log("");
}

