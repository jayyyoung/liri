twitter
var client = new twitter({
	consumer_key: process.env.Sohbg6Y6zwmNfULwAmEQt0w7T,
	consumer_secret: process.env.LMQNqc6lRzAG5UUsAWE976dLd0CaGMalro9CI4CYOKoHnlump4,
	access_token_key: process.env.CXgrOHJIlaoAPhX8V69vmdN5HZpmJZpfV2mkwdrq,
	access_token_secret: process.env.u7xRhP9Trrgq8zqLNgAwC0A10b4v56IjUPvpciEZP8Six
});


// spotify
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: '200c2feb207d41c6ac5596747a9a7486',
  secret: '862a600c42624a12a3cfd7e0a1aac7ca'
});
 
spotify.search({ type: 'track', query: 'Suite-Pee' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});


// omdb