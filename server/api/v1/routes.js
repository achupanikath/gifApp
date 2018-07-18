const express=require('express');//imports express middleware
const router=express.Router();//imports router middleware
const service = require('./service');

//the following lines of code help route the calls using GET,POST,DELETE and PUT
router.get('/trending',function(req,res){  
	try{
		let options = {
			"limit" : 10,
			"rating": 'R'
		}
		service.getTrendingGif(options, (err, result) => {
			if(err) {
				console.log(" error in getting trending gifs", err);
				res.status(404).end({"error": "unable to get trending gifs"})
			} else {
				console.log("result", result.data);
				res.send(result.data).status(200);
			}
		})
	}
	catch(err){
		res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
		return
		}
});

router.get('/gifs',function(req,res){  
	try{
			let options = {
					"limit" : 10,
					"rating": 'R',
					"search": req.query.search
				}
			service.getSearchGif(options, (err, result) => {
			if(err) {
				console.log(" error in getting search gifs", err);
				res.status(404).end({"error": "unable to get search gifs"})
			} else {
				console.log("result", result.data);
				res.send(result.data).status(200);
			}
		})
		}
		catch(err){
			res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
			return
			}
});

router.post('/fav',function(req,res,next){

	let favoritePost = req.body;
	console.log("Post value", req.body);
	service.postFavPost(favoritePost, (err,result) => {
		if(err)
		{
			res.status(400).send({"error": "unable to post gifs"});
		}
		else
		{
			res.send(result.data).status(200);
		}
	});
});

router.get('/favorites',function(req,res){
	let options = {
			"limit" : 10,
			"rating": 'R'
		}
		service.getFavList((err, result) => {
			if(err) {
				console.log(" error in getting favorite gifs", err);
				res.status(404).end({"error": "unable to get favorite gifs"})
			} else {
				console.log("result", result);
				res.send(result).status(200);
			}
		})
});

router.delete('/del/:id',function(req,res,next){
		GifModel.findByIdAndRemove({_id: req.params.id}).then(function(gifCollection){//the unique id assigned to each datum
			res.status(200).send(`Deleted the file : ${gifCollection}`);	//by mongodb is used for identification and removal
		});
});

module.exports=router;//module is exported