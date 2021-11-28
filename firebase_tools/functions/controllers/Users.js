const { admin, db } = require('../scripts/admin');
const { validateRegistrationData, validateLoginData, reduceUserDetails } = require('../util/validator');

const firebaseApp = require('firebase/app');
const firebaseAuth = require('firebase/auth');
const config = require('../scripts/config');
const { UserRecordMetadata } = require('firebase-functions/v1/auth');

firebaseApp.initializeApp(config);

const auth = firebaseAuth.getAuth();

exports.register = (req, res) => {
    let token, userId;
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    };

    const {errors, valid} = validateRegistrationData(newUser);

    if (!valid) {
        return res.status(400).json(errors);
    }

    db.doc(`/users/${newUser.email}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                return res.status(400).json({ email: 'this email is already taken' });
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
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId: userId
            };
            return db.doc(`/users/${newUser.email}`).set(credentials);
        })
        .then(() => {
            return res.status(201).json({ token });
        })
        .catch((err) => {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                return res.status(400).json({ email: 'Email is already in use' })
            } else {
                return res.status(500).json({ general: 'Ups! Something went wrong!' });
            }
        });
}

exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    const {errors, valid} = validateLoginData(user);

    if (!valid) {
        return res.status(400).json(errors);
    }

    firebaseAuth.signInWithEmailAndPassword(auth, user.email, user.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            return res.json({ token });
        })
        .catch( (err) => {
            console.error(err);
            return res.status(403).json({ general: 'Wrong email or password' })
        })
}

exports.addUserDetails = (req, res) => {
    let userDetails = reduceUserDetails(req.body);

    db.doc(`/users/${req.user.email}`).update(userDetails)
        .then(() => {
            return res.json({ message: 'Success!'});
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code});
        })
}


exports.getUserDetails = (req, res) => {
    let resData = {};

    db.doc(`/users/${req.user.email}`)
        .get()
        .then( (doc) => {
            if (!doc) {
                return;
            }

            userData.credentials = doc.data();
        });
}