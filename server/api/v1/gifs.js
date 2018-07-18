const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create gif Schema

const gifSchema = new Schema({
	id : {
		type : String,
		required : [true, "Id field is requried"]
	},
	rating : {
		type : String,
		required : [true, "Rating field is requried"]
	},
	source : {
		type : String
	},
	title : {
		type : String,
		required: [true, "title field is required"]
	},
	images : {
		type : Object,//notice Object
		required: [true, "Image field is required"]
	}
})

let GifModel = mongoose.model('gifCollection', gifSchema);//the moddle is created and "gifCollection is made"

module.exports = GifModel;//exported