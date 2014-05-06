var express = require('express');
//var S = require('string');
var router = express.Router();
var Grid = require('gridfs-stream');
var mongo = require('mongodb');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

router.post('/addfile', function(req, res) {
    var db = req.db;

    var gfs = Grid(db, mongo);
    req.pipe(gfs.createWriteStream({
    filename: 'test'
  }));
  res.send("Success!");
   
});
    
    
/* GET allhouses */
router.get('/getallHouses', function(req, res) {
    var db = req.db;
    var collection = db.get('HouseInformation');
    collection.findOne({},{},function(e,docs){
        res.json(docs); 
    });
});

/* GET housebyID */
router.get('/searchHouseBypropertyID/:propertyID', function(req, res) {
    var db = req.db;
    var collection = db.get('HouseInformation');
    collection.find({"propertyID":Number(req.params.propertyID)},{},function(e,docs){
        res.json(docs); 
    });
});
/* GET housebyAgentID */
router.get('/searchHouseByagentID/:agentID', function(req, res) {
    var db = req.db;
    var collection = db.get('HouseInformation');
    collection.find({"agentID":Number(req.params.agentID)},{},function(e,docs){
        res.json(docs); 
    });
});
/* GET housebyAgentID */
router.get('/searchHouseBycriteria', function(req, res) {
    var db = req.db;
    var zipcode = Number(req.body.zipcode);
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var price = req.body.price;
    var squarefeet = Number(req.body.squarefeet);
    var type = req.body.type;
    var bed = Number(req.body.bed);
    var bath = Number(req.body.bath);
    var status = req.body.status;
    var description = req.body.description;
    var agentID = Number(req.body.agentID);
    
    console.log(city );
    var collection = db.get('HouseInformation');
    collection.find({"city" :city , "state":state1,"price" :"777K" },{},function(e,docs){
        res.json(docs); 
    });
});
/* POST to Add User Service */
router.post('/addHouse', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var zipcode = req.body.zipcode;
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var price = req.body.price;
    var squarefeet = req.body.squarefeet;
    var type = req.body.type;
    var bed = req.body.bed;
    var bath = req.body.bath;
    var status = req.body.status;
    var description = req.body.description;
    var agentID = req.body.agentID;
    var propertyID = req.body.propertyID;
   

    // Set our collection
    var collection = db.get('HouseInformation');

    // Submit to the DB
    collection.insert({
        "zipcode" : Number(zipcode),
        "address" : address,
         "city" : city,
        "state" : state,
         "price" : price,
        "squarefeet" : Number(squarefeet),
         "type" : type,
        "bed" : Number(bed),
         "bath" : Number(bath),
        "status" : status,
         "description" : description,
        "agentID" : Number(agentID),
        "propertyID" : Number(propertyID)
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.send(200, JSON.stringify({result:'true'}));
            // If it worked, set the header so the address bar doesn't still say /adduser
           // res.location("userlist");
            // And forward to success page
            //res.redirect("userlist");
        }
    });
});


/* POST to Add User Service */
router.put('/modifyHouse/:propertyID', function(req, res) {

    // Set our internal DB variable
    var db = req.db;


    // Get our form values. These rely on the "name" attributes
  
    var zipcode = req.body.zipcode;

    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var price = req.body.price;
    var squarefeet = req.body.squarefeet;
    var type = req.body.type;
    var bed = req.body.bed;
    var bath = req.body.bath;
    var status = req.body.status;
    var description = req.body.description;
    var agentID = req.body.agentID;
    var propertyID = req.body.propertyID;
   

    // Set our collection
    var collection = db.get('HouseInformation');

    // Submit to the DB
    collection.update({ "propertyID":Number(req.params.propertyID)},{
        $set : {"zipcode" : Number(zipcode),
         "address" : address,
          "city" : city,
         "state" : state,
        "price" : price,
         "squarefeet" : Number(squarefeet),
        "type" : type,
        "bed" : Number(bed),
         "bath" : Number(bath),
       "status" : status,
         "description" : description,
        "agentID" : Number(agentID)}
       
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.send(200, JSON.stringify({result:'true'}));
            // If it worked, set the header so the address bar doesn't still say /adduser
           // res.location("userlist");
            // And forward to success page
            //res.redirect("userlist");
        }
    });
});

router.put('/modifyUserProfile/:UserID', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var UserID = req.body.UserID;
    var password = req.body.password;
    var UserName = req.body.UserName;
    var EmailID = req.body.EmailID;
    var UserType = req.body.UserType;
    var SecurityQue = req.body.SecurityQue;
    var SecurityAns = req.body.SecurityAns;
    var PhoneNo = req.body.PhoneNo;
    // Set our collection
    var collection = db.get('UserProfile');

    // Submit to the DB
    collection.update({
        "UserID" : Number(UserID)}, {$set : { 
        "password" : password,
         "UserName" : UserName,
        "EmailID" : EmailID,
        "UserType" : UserType,
        "SecurityQue" : SecurityQue,
         "SecurityAns" : SecurityAns,
        "PhoneNo" : Number(PhoneNo) }

    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.send(200, JSON.stringify({result:'true'}));
            // If it worked, set the header so the address bar doesn't still say /adduser
           // res.location("userlist");
            // And forward to success page
            //res.redirect("userlist");
        }
    });
});


/* POST to Add User Service */
router.delete('/deleteHouse/:propertyID', function(req, res) {

    // Set our internal DB variable
    var db = req.db;
    // Set our collection
    var collection = db.get('HouseInformation');

    // Submit to the DB
    collection.remove( {"propertyID": Number(req.params.propertyID)}
       , function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.send(200, JSON.stringify({result:'true'}));
            // If it worked, set the header so the address bar doesn't still say /adduser
           // res.location("userlist");
            // And forward to success page
            //res.redirect("userlist");
        }
    });
});

router.delete('/deleteUserProfile:UserID', function(req, res) {

    // Set our internal DB variable
    var db = req.db;
    // Set our collection
    var collection = db.get('UserProfile');

    // Submit to the DB
    collection.remove( {"UserID": Number(req.params.UserID)}
       , function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.send(200, JSON.stringify({result:'true'}));
            // If it worked, set the header so the address bar doesn't still say /adduser
           // res.location("userlist");
            // And forward to success page
            //res.redirect("userlist");
        }
    });
});


router.post('/addFavoriteHouse', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userID = req.body.userID;
    var housePropertyID = req.body.housePropertyID;
    // Set our collection
    var collection = db.get('FavoriteHouse');

    // Submit to the DB
    collection.insert({
        "userID" : Number(userID),
        "housePropertyID" : Number(housePropertyID)

    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.send(200, JSON.stringify({result:'true'}));
            // If it worked, set the header so the address bar doesn't still say /adduser
           // res.location("userlist");
            // And forward to success page
            //res.redirect("userlist");
        }
    });
});
router.post('/createUserProfile', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var UserID = req.body.UserID;
    var password = req.body.password;
    var UserName = req.body.UserName;
    var EmailID = req.body.EmailID;
    var UserType = req.body.UserType;
    var SecurityQue = req.body.SecurityQue;
    var SecurityAns = req.body.SecurityAns;
    var PhoneNo = req.body.PhoneNo;
    // Set our collection
    var collection = db.get('UserProfile');

    // Submit to the DB
    collection.insert({
        "UserID" : Number(UserID),
        "password" : password,
         "UserName" : UserName,
        "EmailID" : EmailID,
        "UserType" : UserType,
        "SecurityQue" : SecurityQue,
         "SecurityAns" : SecurityAns,
        "PhoneNo" : Number(PhoneNo)

    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.send(200, JSON.stringify({result:'true'}));
            // If it worked, set the header so the address bar doesn't still say /adduser
           // res.location("userlist");
            // And forward to success page
            //res.redirect("userlist");
        }
    });
});

/* GET getUserByUserID */
router.get('/getUserByUserID/:UserID', function(req, res) {
    var db = req.db;
    var collection = db.get('UserProfile');
    collection.find({"UserID": Number(req.params.UserID)},{},function(e,docs){
        res.json(docs); 
    });
});
/* GET getUserByEmailID */
router.get('/getUserByEmailID/:EmailID', function(req, res) {
    var db = req.db;
    var collection = db.get('UserProfile');
    collection.find({"EmailID":req.params.EmailID},{},function(e,docs){
        res.json(docs); 
    });
});
module.exports = router;
