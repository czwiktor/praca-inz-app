const { admin } = require('../scripts/admin');

const firebaseApp = require('firebase/app');
const config = require('../scripts/config')

firebaseApp.initializeApp(config);

exports.showAlloys = (req, res) => {
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
}

exports.addAlloy = (req, res) => {
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