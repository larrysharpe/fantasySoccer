// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var serveIndex = require('serve-index');
var serveStatic = require('serve-static');
var Bear     = require('./models/bear');

var app        = express(); 				// define our app using express

mongoose.connect('mongodb://localhost:27017/'); // connect to our database
mongoose.connection.on('error', function(e){ console.log('Mongoose could not connect') });


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(express.directory('../client/app'));
//app.use(express.static('../client/app'));
//app.use('/', serveIndex('../client/app/', {'icons': true}))
app.set('view engine', 'ejs');

var port = process.env.PORT || 3030;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
   // res.json({ message: 'hooray! welcome to our api!' });
    res.render('../client/app/index');
});


// on routes that end in /bears
// ----------------------------------------------------
router.route('/api/bears')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var bear = new Bear(); 		// create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });

    })

    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/api/bears/:bear_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        })
    })

    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function(err, bear) {

            if (err)
                res.send(err);

            bear.name = req.body.name; 	// update the bears info

            // save the bear
            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        })
    })

    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });



// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);