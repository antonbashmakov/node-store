var express = require('express');
var ObjectID = require('mongodb').ObjectID
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/product/:productId', function(req, res) {

	var db = req.db;
    
    console.log('Searching product with id : ' + req.params.productId);

	var id = new ObjectID(req.params.productId);
	var collection = db.get('data');
	    collection.findOne({'_id' : id}, function(e, doc){

        res.render('product', {
            "product" : doc
        });
    });
});

router.get('/products', function(req, res) {
    var db = req.db;
    var collection = db.get('data');
    collection.find({},{},function(e, docs){
        res.render('products', {
            "products" : docs
        });
    });
});


module.exports = router;
