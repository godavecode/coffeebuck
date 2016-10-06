var mongoose = require('mongoose');
var Schema = mongoose.Schema;//we use mongoose schema object

var schema = new Schema({//define how data I work with should look like. 
	imagePath: {type: String, required: true},  //will not store the actual image in the db, but the path to the image; javascript object will have a type of string that will be the path and make it required as we will always need the image path
    title: {type: String, required: true}, 		//Schema is blueprint for each new entry we enter into the database
    description: {type: String, required: true}, //however this is just a blueprint that we will not work with in the application; 
    price: {type: Number, required: true} //we will work with models that are based on this blueprint.
}); //create a new schema notice var lowercase schema; as an arguement, I pass a javascript object describing/defining the schema
//see product image, title, description and price fields; set them up in the new schema
module.exports = mongoose.model('Product', schema);
//to do this, I will export something from this file here with model.exports, import functionality of this file and other files in my appli
//export mongoose and the model function, model method specify the name of the model product,  and the schema on which the model will be based.
//we are using the blueprint to create a model in which we can work
//now we seed data into the db so we have something to work with
//install external packages to make seeding simple or make your own seeder