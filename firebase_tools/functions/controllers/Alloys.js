const { admin, db } = require('../scripts/admin');

const firebaseApp = require('firebase/app');
const config = require('../scripts/config')

firebaseApp.initializeApp(config);

exports.showAlloys = (req, res) => {
    admin
        .firestore()
        .collection('alloys')
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
}

exports.addAlloy = (req, res) => {
    const alloy = {
        id: req.body.id,
        name: req.body.name,
        creationDate: new Date().toISOString(),
        group: req.body.group,
        addedBy: req.body.author,
        composition: req.body.composition,
        properties: req.body.props
    };

    admin
        .firestore()
        .collection('alloys')
        .add(alloy)
        .then((query) => {
            query.id = req.body.name;
            res.json({ message: `Alloy with unique ID = ${query.id} added successfully!` });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Oops, something went wrong! :(' })
            console.error(error)
        });
}

exports.getAlloy = (req, res) => {
    let alloy = {};
    db.doc(`/alloys/${req.params.alloyId}`).get()
        .then( (doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Alloy not found!'});
            }

            alloy = doc.data();
            alloy.alloyId = doc.id;

            return db
                .collection('composition')
                .where('alloyId', '==', req.params.alloyId)
                .get();
        })
        .then(() => {
            alloy.composition = [];
            alloy.forEach((doc) => {
                alloy.composition.push(doc.data());
            });

            return res.json(screamData);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        })
}

exports.getAllAlloys = (req, res) => {
    let alloys = [];
    db.collection('alloys')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach( (doc) => {
                alloys.push(doc.data());
            });
        
            return res.json(alloys);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        })
}

exports.getAllElements= (req, res) => {
    let elements = {};
    db.collection('elements')
        .get()
        .then( (doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'No elements found!'});
            }

            elements = doc.data();
        
            return res.json(elements);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        })
}

exports.getAllProperties = (req, res) => {
    let properties = {};
    db.collection('mechanical_props')
        .get()
        .then( (doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'No properties found!'});
            }

            properties = doc.data();
        
            return res.json(properties);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        })
}