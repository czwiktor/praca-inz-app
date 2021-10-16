const functions = require("firebase-functions");
const admin = require('firebase-admin');


admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});


exports.getMostPopular = functions.https.onRequest((request, response) => {
    admin.firestore().collection('MostPopular').get()
    .then((query) => {
        let articles = [];
        query.forEach(doc => {
            articles.push(doc.data());
        });

        return response.json(articles);
    })
    .catch((error) => console.error(error));
});