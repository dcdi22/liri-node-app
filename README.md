# liri-node-app

## Description
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Code Explanation 
- Run `node liri.js` followed by one of the following parameters:
    * `my-tweets` if you want your 20 most recent tweets
    * `spotify-this-song` enter a track title to get more info about the song and it's artist
    * `movie-this` enter a movie title and get a shmorgishborg of info you didn't know you didn't really need
    * `do-what-it-says` will do what ever you say in the random.txt 

## Requirements
- Make a Node.js app that depends on user input from the command line
- Integrate Twitter, Spotify, and OMDb APIs via the appropriate NPM modules
- Use API calls and parse through returned JSON objects, outputting them in a specified format
- Read commands and queries from file

## Technologies Used
- Node.js
- JavaScript
- Twitter API (via twitter npm module)
- Spotify API (via spotify npm module)
- OMDb API (via request npm module)
