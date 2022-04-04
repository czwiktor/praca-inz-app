const { admin, db } = require('../scripts/admin');
const { validateRegistrationData, validateLoginData} = require('../util/validator');

const firebaseApp = require('firebase/app');
const firebaseAuth = require('firebase/auth');
const config = require('../scripts/config');

firebaseApp.initializeApp(config);

const auth = firebaseAuth.getAuth();

exports.register = (req, res) => {
    let token, userId;
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        name: req.body.name,
        role: 'user',
        creationDate: new Date().toISOString()
    };

    const {errors, valid} = validateRegistrationData(newUser);

    if (!valid) {
        return res.status(400).json(errors);
    }

    db
        .doc(`/users/${newUser.email}`)
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
                userId: userId,
                name: req.body.name,
                role: 'user'
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
        return res.status(400).json('elo' + errors + 'elo2' + user.email + 'elo3' + user.password);
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

// Get any user's details
exports.getUserDetails = (req, res) => {
    let userData = {};
    db
        .doc(`/users/${req.params.email}`)
        .get()
        .then((doc) => {
        if (doc.exists) {
            userData.user = doc.data();
            return res.json(userData);
        } else {
            return res.status(404).json({ errror: "User not found" });
        }
        })
        .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
        });
  };

// Get own user details
  exports.getAuthenticatedUser = (req, res) => {
    let userData = {};
    db.doc(`/users/${req.user.email}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          userData.credentials = doc.data();
          return res.json(userData);
        }
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
  };