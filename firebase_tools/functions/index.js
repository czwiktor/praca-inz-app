const functions = require('firebase-functions');
const app  = require('express')();

// Functions imports
const { getAllAlloys, addAlloy, addAllAlloys, getAlloy, queryAlloys, getAllProperties, getAllElements } = require('./controllers/Alloys');
const { register, login, getUserDetails, getAuthenticatedUser } = require('./controllers/Users');
const FBAuth = require('./scripts/auth');

const cors = require('cors');

app.use(cors());

// Show all alloys
app.get('/show', getAllAlloys);

// Get all properties
app.get('/getProps', getAllProperties);

// Get all elements
app.get('/getElements', getAllElements);

// Add an alloy
app.get('/showDetails/:alloy_id',  FBAuth, getAlloy);

// Add an alloy
app.post('/add', FBAuth, addAlloy);

// Add an alloy
app.post('/addAll', FBAuth, addAllAlloys);

// Get user details
app.get('/user/:handle', getUserDetails);

// Get Auth user details
app.get('/user', FBAuth, getAuthenticatedUser);

// Find matched alloys
app.get('/search', queryAlloys);

// User's registration
app.post('/register', register);

// User's login
app.post('/login', login);

exports.api = functions.region('europe-west1').https.onRequest(app);