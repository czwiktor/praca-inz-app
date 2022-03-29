const functions = require('firebase-functions');
const app  = require('express')();
const FBAuth = require('./scripts/auth');

// Functions imports
const { getAllAlloys, addAlloy, addAllAlloys, getAlloy, queryAlloys, getAllProperties, getAllElements } = require('./controllers/Alloys');
const { register, login, getUserDetails, getAuthenticatedUser } = require('./controllers/Users');

const cors = require('cors');

app.use(cors());

// Show all alloys
app.get('/show', FBAuth, getAllAlloys);

// Get all properties
app.get('/getProps', FBAuth, getAllProperties);

// Get all elements
app.get('/getElements', FBAuth, getAllElements);

// Add an alloy
app.get('/showDetails/:alloy_name',  FBAuth, getAlloy);

// Add an alloy
app.post('/add', FBAuth, addAlloy);

// Add an alloy
app.post('/addAll', FBAuth, addAllAlloys);

// Get user details
app.get('/user/:handle', getUserDetails);

// Get Auth user details
app.get('/user', FBAuth, getAuthenticatedUser);

// Find matched alloys
app.post('/search', FBAuth, queryAlloys);

// User's registration
app.post('/register', register);

// User's login
app.post('/login', login);

exports.api = functions.region('europe-west1').https.onRequest(app);