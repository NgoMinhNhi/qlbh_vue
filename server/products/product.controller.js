var express = require('express');
var multer = require('multer');
var fs = require('fs');
var router = express.Router();
var Product = require('./product.model');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  }
});

var upload = multer({ storage:  storage });
 
// CREATES A NEW PRODUCT
router.post('/', upload.single('file'), function(req, res) {
    let pathImg = req.file.path
    pathImg= pathImg.replace("\\","/")
    pathImg= pathImg.replace("\\","/")
    pathImg = pathImg.substring(7, pathImg.length);
     
    Product.create({
        name : req.body.name,
        description : req.body.description,
        price: req.body.price,
        condition: req.body.condition,
        brand: req.body.brand,
        imgSrc: 'http://localhost:3000/'+pathImg,
    },
    function (err, product) {
        if (err) return res.status(500).send("There was a problem adding the information to the database.");
        res.status(200).send(product);
    }
    );
});

// RETURNS ALL THE PRODUCT IN THE DATABASE
router.get('/', function (req, res) {
    Product.find({}, function (err, products) {
        if (err) return res.status(500).send("There was a problem finding the products.");
        res.status(200).send(products);
    });
});

// GETS A SINGLE PRODUCT FROM THE DATABASE
router.get('/:id', function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return res.status(500).send("There was a problem finding the product.");
        if (!product) return res.status(404).send("No product found.");
        res.status(200).send(product);
    });
});

// UPDATES A SINGLE PRODUCT IN THE DATABASE
router.put('/:id', upload.single('file'),function (req, res) {
    let preImg = req.body.preImg
    console.log(preImg)
    let pathImg = ''
    if(req.body.noChangeImg === '-1'){
        pathImg = req.file.path
        pathImg= pathImg.replace("\\","/")
        pathImg= pathImg.replace("\\","/")
        pathImg = pathImg.substring(7, pathImg.length)
    }
    if(pathImg!== ''){
        pathImg = 'http://localhost:3000/'+pathImg
    }else {
        pathImg = preImg
    }
    const productUpdated = {
        name : req.body.name,
        description : req.body.description,
        price: req.body.price,
        condition: req.body.condition,
        brand: req.body.brand,
        imgSrc: pathImg,
    }
    Product.findByIdAndUpdate(req.params.id, productUpdated ,function (err, product) {
        if (err) return res.status(500).send("There was a problem updating the product.");
        res.status(200).send(product);
    });
});

// DELETES A PRODUCT FROM THE DATABASE
router.delete('/:id',  function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err, product) {
        if (err) return res.status(500).send("There was a problem deleting the product.");
        // const imgSrc = product.imgSrc;
        // imgSrc = imgSrc.replace("http://localhost:3000", "./server");
        // fs.unlink(imgSrc)
        res.status(200).send("Product: "+ product.name +" was deleted.");
    });
});



module.exports = router;