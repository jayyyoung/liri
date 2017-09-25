var keys = require("./keys.js");
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("omdb");
var fs = require('fs');


console.log("Type my-tweets , spotify-this-song , movie-this");
var userCommand = process.argv[2];
var secondCommand = process.argv[3];
//process multiple words. Triggers if user types anything more than the above console logged options and first parameter.
	for(i = 4; i < process.argv.length; i++){
	    secondCommand += '+' + process.argv[i];
	}

function switchCommand(){
	switch(userCommand){

		case 'my-tweets':
		twitterSearch();
		break;

		case 'spotify-this-song':
		mySpotify();
		break;

		case 'movie-this':
		myMovieSearch();
		break;
		
	}
};


// Twitter search is not properly working. It is saying that the variable 'Twitter is not defined' which does not make sense because it is defined. 
function twitterSearch(){
	console.log("Here are my tweets.");
	
	var client = new twitter({
		consumer_key: 'keys.twitterKeys.consumer_key',
		consumer_secret: 'keys.twitterKeys.consumer_secret',
		access_token_key: 'keys.twitterKeys.access_token_key',
		access_token_secret: 'keys.twitterKeys.access_token_secret'
	});

	
	var parameters = {
		screen_name: 'jay.',
		count: 20
	};

	client.get('statuses/user_timeline', parameters, function(error, tweets, response){
		if (!error) {
	        for (i = 0; i < tweets.length; i++) {
	            var returnedData = ('Number: ' + (i + 1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
	            console.log("=========================");
	            console.log(returnedData);
	            console.log("=========================");
	        }
	    };
	});
};
1

// Spotify will also not run properly. States that 'items cannot be found'.
function mySpotify(){
	console.log("Lets get those tunes going.");

	var searchTrack;
	if(secondCommand === undefined){
		searchTrack = "Suite-Pee";
	} else{
		searchTrack = secondCommand;
	}

	spotify.search({type:'track', query:searchTrack}, function(err,data){
	    if(err){
	        console.log('Error occurred: ' + err);
	        return;
	    } else {
	  		console.log("Artist: " + data.tracks.items[0].artists[0].name);
	        console.log("Song: " + data.tracks.items[0].name);
	        console.log("Album: " + data.tracks.items[0].album.name);
	    }
	});
};


// Same as the others
function myMovieSearch(){
	console.log("Movie Search");
	var omdb = require('omdb');
 
	omdb.search('saw', function(err, movies) {
	    if(err) {
	        return console.error(err);
	    }
 
	    if(movies.length < 1) {
    	    return console.log('No movies were found!');
	    }
 
   		movies.forEach(function(movie) {
        	console.log('%s (%d)', movie.title, movie.year);
    	});
 
	});
 
	omdb.get({ title: 'Saw', year: 2004 }, true, function(err, movie) {
  	  if(err) {
        	return console.error(err);
    	}
 
    	if(!movie) {
        	return console.log('Movie not found!');
    	}
 
    	console.log('%s (%d) %d/10', movie.title, movie.year, movie.imdb.rating);
    	console.log(movie.plot);
 
     
	});
};

switchCommand();