const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebaseApp = require("firebase/app");
const firebaseAuth = require("firebase/auth");

const config = {
    apiKey: "AIzaSyC-wVeCGw0qL_3Q9_1fGAyE0Mjj5WZJM7Q",
    authDomain: "praca-inz-cf3bb.firebaseapp.com",
    databaseURL: "https://praca-inz-cf3bb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "praca-inz-cf3bb",
    storageBucket: "praca-inz-cf3bb.appspot.com",
    messagingSenderId: "692347929146",
    appId: "1:692347929146:web:87ea9373da2fc0620c6b03",
    measurementId: "G-LVTF55GD18"
};

admin.initializeApp();
firebaseApp.initializeApp(config);
const auth = firebaseAuth.getAuth();
const db = admin.firestore();
const app  = require('express')();
const { onCall } = require('firebase-functions/v1/https');

// Show an alloy
app.get('/Show-Alloy', (req, res) => {
    admin
        .firestore()
        .collection('Most-popular')
        .orderBy('creationDate', 'desc')
        .get()
        .then((query) => {
            let alloys = [];
            query.forEach(doc => {
                alloys.push({
                    alloyId: doc.id,
                    alloyName: doc.data().name,
                    creationDate: doc.data().creationDate,
                    addedBy: doc.data().author
                });
            });

            return res.json(alloys);
        })
        .catch((error) => console.error(error));
})

// Add an alloy
app.post('/Add-Alloy', (req, res) => {
    const alloy = {
        id: req.body.id,
        name: req.body.name,
        creationDate: new Date().toISOString(),
        addedBy: req.body.author
    };

    admin
        .firestore()
        .collection('Most-popular')
        .add(alloy)
        .then((query) => {
            res.json({ message: `Alloy with unique ID = ${query.id} added successfully!` });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Oops, something went wrong! :(' })
            console.error(error)
        });
});

app.post('/register', (req, res) => {
    let token, userId;
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle
    };
    // TO DO validator
    
    db.doc(`/users/${newUser.handle}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                return res.status(400).json({ handle: 'this handle is already taken'});
            } else {
                return firebaseAuth
                .createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
            }
        })
        .then((data) => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then((token) => {
            return res.status(201).json({ token });
        })
        .then((idToken) => {
            token = idToken;
            const credentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId: userId
            };
            return db.doc(`/users/${newUser.handle}`).set(credentials);
        })
        .then(() => {
            return res.status(201).json({ token });
        })
        .catch((err) => {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                return res.status(400).json({ email: 'Email is already in use'})
            } else {
                return res.status(500).json({ error: err.code });
            }
        }); 
});

exports.api = functions.region('europe-west1').https.onRequest(app);