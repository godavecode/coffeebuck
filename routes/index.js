var express = require('express');
var router = express.Router();
var Product = require('../models/product'); //importing product model from models folder
var csrf = require('csurf');

var csrfProtection = csrf(); //starting csrf use it as middleware
router.use(csrfProtection);//apply middleware to the router to save my routes; all routes should be protected by csrf protection
/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err, docs) { //products fetched like db.product.find() gets the exact same data; get rid of var products 
  	var productChunks = []; 		 //empty array at beggining
  	var chunkSize = 3;
  	for (var i = 0; i < docs.length; i += chunkSize) { 		//loop until I reach the documents length until I'm at the last element of products variable or products I get back
  		productChunks.push(docs.slice(i, i + chunkSize));	//increase i not by 1 but by chunksize to jump in these chunk size steps here
  	}												   		//then I will use the productChunks array to push new item, the new item will be another array, so I will take my document, all my products here and slice a 
  													   		//slice a part out of there, slice from current i index here or current loop index to i plus chunk size, so if we are at first iteration where i is 0 
  													   //then I will take a part of the product array starting at the first element, all the way up to the 3rd element, excluding the 4th element
  													   //so i 0 plus 3 is 3 which is the chunk size, so it will be the first chunk I take out; now to the next iteration, i is incremented by 3 which is the chink size, 
  													   //now i is 3, it was 0 incremented by 3, it is 3; the next slice I take will begin at the 4th element, since the array index starts at 0, and go up to 6, my array only has 5 items so I will take 
  													   //the last 2 elements; therefor creating the new productChunks array which has 2 elements, 2 arrays, the first array having 3 product or 3 elements and the secondary having 2. 
  													   //I then pass this productchunk array here and in my view, we can loop through this, leave the name product if I like; will copy one row put it into the loop, get rid of all columns but one
  													   //inside the loop because I want to create a row for each chunk which is the outer each loop, now we will create an inner each loop, inside this I will loop through to create my columns
  													   //which will be each individual product in each row, and we simply loop through this which is a keyword in handlebars, if we have loop each products, then we can reference the current element of the loop with this
  													   //and this will be another array since we have the chunk array with its elements which are arrays too. Then loop through each element. 
  													   //Then we can output the data, start with source of the image, we can use handlebars syntax, to use this, this is in the loop; this is not referring to the array here anymore, but to the individual object. 
  													   //Object will have an image path since it is what I set up in the schema. 



  	res.render('shop/index', { title: 'Shopping Cart', products: productChunks }); //pass data to the view with a separate new products variable
  }); //instead we will create a new callback we either get an error or all the documentsl; inside of the callback I will call this render method and pass the documents								
});	  //in the index.hbs file I can loop through this; if I restart the server and relaod it is much better, now we have 5 products, same as db, since we seeded 5 products									
											
router.get('/user/signup', function(req, res, next) {
  res.render('user/signup', {csrfToken: req.csrfToken()});
});

router.post('/user/signup', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
