const request = require('superagent');
const GifModel = require('./gifs');
const config = require('../../config');

const getTrendingGif = (options, done) => {
	request//superagent call is made in order to get the data
			.get(`${config.URL}/trending?api_key=${config.KEY}&limit=${options.limit}&rating=${options.rating}`)
			.end((err,response) => {
				if(err){
					console.log (" error in getting the gif videos");
					done(err);
				}//
				//console.log(`Service end`, JSON.parse(response.text));
				done(null, JSON.parse(response.text));				
			});
}

const getSearchGif = (options, done) => {
	request
		.get(`${config.URL}/search?api_key=${config.KEY}&limit=10&rating=R&q=${options.search}`)
		.end((err,response) => {
			if(err){
				return (" error in getting the gif videos");
				done (err);
			}
			done(null, JSON.parse(response.text));
		});
}

const postFavPost = (fav,done) => {
	let gif = new GifModel();
	gif.id = fav.id;
  gif.rating = fav.rating;
  gif.source = fav.source;
  gif.images = fav.images;
  gif.title = fav.title;
  gif.save(function(err) {
  	if(err) {
  		done("error");
  	}
  	console.log("Gif doc", gif);
  	done(null,"Added to Favorites");
  	});
}

const getFavList = (done) => {
	GifModel.find(function(err, gifCollection){//find({}) is a mongoose function that returns ALL the data in the database
			if(err){
				done(err);
			}
			else{
				console.log("Gif collection is",gifCollection)
				done(null,gifCollection);
			}
		});
}

module.exports ={
	getTrendingGif,
	getSearchGif,
	postFavPost,
	getFavList
};