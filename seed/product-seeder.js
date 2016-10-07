var Product = require('../models/product'); //import my product model; note the .js is not needed whe re

var mongoose = require('mongoose'); //connect with mongoose inside this file

var mongoUri = process.env.MONGO_URI

mongoose.connect(mongoUri); //copy connect object from app.js 

var products = [
	new Product({ //create a new product the model I import here; pass the javascript object the actual data I want write into the database
		imagePath: 'http://cookdiary.net/wp-content/uploads/images/Mocha-Coffee_6845.jpg', //image
		title: 'Caffe Mocha', //name
		description: 'Delicious mocha coffee!', 
		price: 4
	}),
	new Product({ //create a new product the model I import here; pass the javascript object the actual data I want write into the database
		imagePath: 'http://www.attibassicafe.com/wp-content/uploads/2013/02/web10.jpg', //image
		title: 'Caffe Latte', //name
		description: 'Delicious cafe latte coffee!', 
		price: 5
	}),
	new Product({ //create a new product the model I import here; pass the javascript object the actual data I want write into the database
		imagePath: 'http://www.tampabay.com/resources/images/dti/rendered/2009/06/food_cappuccino_73346a_8col.jpg', //image
		title: 'Caffe Cappuccino', //name
		description: 'Delicious cappuccino!', 
		price: 3
	}),
	new Product({ //create a new product the model I import here; pass the javascript object the actual data I want write into the database
		imagePath: 'https://s-media-cache-ak0.pinimg.com/236x/3a/1c/18/3a1c187f657ebd50682861139d317199.jpg', //image
		title: 'Caffe Macchiato', //name
		description: 'Delicious macchiato coffee!', 
		price: 4
	}),
	new Product({ //create a new product the model I import here; pass the javascript object the actual data I want write into the database
		imagePath: 'http://cdn.taccuinistorici.it/preview_images/news/2119_0.jpg', //image
		title: 'Caffe Espresso', //name
		description: 'Delicious espresso coffee!', 
		price: 2
	})
];

var done = 0;
for (var i = 0; i < products.length; i++) {//loop through products
	products[i].save(function(err, result) { //in the callback of each save operation either error or result
		done++; //increment done by one
		if (done === products.length) { //check if done is equal to products length, just finished with last item of the array, therefor we increment products first products length will be not starting at 0 last item has index 4 and length is 5, if length is equal I know we are done, incrementing it first 
			exit(); //call the exit function which we define below
		}
	}); //store it here; save method with mongoose allows to save a model to the database, will create a new products collection for this model, based on this data
}//into this collection will then insert or save this document, like sql we have database tables and entries, here we have collections and documents
//create a new document with the save command based on the data we have here; this does not work here, because mongoose or mongodb will not be 
//connected to the application(we are connecting in the appjs, well yes, but the seeder will not be running at run time during run time, it is not a normal part of the application, 
//we only want to do here at the beggining manually or during development only
//will manually at the beggining with node js; we neeed to connect with mongoose inside of this file.
//saving to the database is asynchronous; loop through items, start saving, items, but continue disconnecting, chances are high we will disconnect before items have been saved
//therefor, we need to change the disconnect to a new location inside the for loop in the callback with helper variable done

function exit() { //in this function we disconnect
	mongoose.disconnect();
}