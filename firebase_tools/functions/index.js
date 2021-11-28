const functions = require('firebase-functions');
const app  = require('express')();

// Functions imports
const { showAlloys, addAlloy } = require('./controllers/Alloys');
const { register, login, addUserDetails, getUserDetails } = require('./controllers/Users');
const FBAuth = require('./scripts/auth');

// Show all alloys
app.get('/show', FBAuth, showAlloys);

// Add an alloy
app.post('/add', FBAuth, addAlloy);

// Add user details
app.post('/addDetails', FBAuth, addUserDetails);

// Add user details
app.post('/getDetails', FBAuth, getUserDetails);

//TODO Find matched alloys
//app.get('/find', FBAuth, findAlloy);

//TODO Get all requirements
//app.get('/find', FBAuth, getReqs);

// User's registration
app.post('/register', register);

// User's login
app.post('/login', login);

exports.api = functions.region('europe-west1').https.onRequest(app);