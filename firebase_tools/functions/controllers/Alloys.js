const { admin, db } = require('../scripts/admin');

const firebaseApp = require('firebase/app');
const config = require('../scripts/config')

firebaseApp.initializeApp(config);

class Alloy {
    constructor (data) {
        this.id = data.alloy_id;
        this.name = data.alloy_name;
        this.date = data.alloy_date;
        this.group = data.alloys_group;
        this.author = data.alloy_author;
        this.composition = {
            Al: data.composition.Al,
            Cu: data.composition.Cu,
            Fe: data.composition.Fe,
            Mg: data.composition.Mg,
            Ni: data.composition.Ni,
            Si: data.composition.Si,
            Zn: data.composition.Zn
        }
        this.props = {
            R02: data.properties['R0,2'],
            Rm: data.properties.Rm,
            A5: data.properties['A5'],
            HB: data.properties['HB']
        }
    }
}

class compQuery {
    constructor (query) {
        this.Al = {
            min: query.Al.min,
            max: query.Al.max
        };
        this.Cu = {
            min: query.Cu.min,
            max: query.Cu.max
        };
        this.Fe = {
            min: query.Fe.min,
            max: query.Fe.max
        };
        this.Mg = {
            min: query.Mg.min,
            max: query.Mg.max
        };
        this.Ni = {
            min: query.Ni.min,
            max: query.Ni.max
        };
        this.Si = {
            min: query.Si.min,
            max: query.Si.max
        };
        this.Zn = {
            min: query.Zn.min,
            max: query.Zn.max
        };
    }
}

class propsQuery {
    constructor (query) {
        this['R0,2'] = {
            min: query['R0,2'].min,
            max: query['R0,2'].max 
        };
        this['Rm'] = {
            min: query['Rm'].min,
            max: query['Rm'].max
        };
        this['A5'] = {
            min: query['A5'].min,
            max: query['A5'].max
        };
        this['HB'] = {
            min: query['HB'].min,
            max: query['HB'].max
        };
    }
}

exports.queryAlloys = (req, res) => {
    const queries = {
        group: req.body.group,
        composition: req.body.composition,
        props: req.body.props
    };

    let index = 0
    const querySettings = Object.keys(queries);
    let result = [];

    db.collection('alloys')
        .orderBy('creationDate', 'desc')
        .where(querySettings[index], 'in', querySettings[index])
        .get()
        .then((query) => {
            index++
            let alloy = {};
            let data;
            let property;
            query.forEach(doc => {
                data = doc.data() 
                alloy = new Alloy(data);

                for (let j = index; j < querySettings.length; j++) {
                    for (property in alloy.querySettings[j]) {
                        if (!querySettings.min && !querySettings.max) {
                            if (valueOf(property) == querySettings[j]) {
                                result.push(alloy);
                                j++;
                                break;
                            }
                        }
                    
                        if (valueOf(property) >= querySettings[j].min && valueOf(property) <= querySettings[j].max) {
                            result.push(alloy);
                            j++;
                            break;
                        }
                    }
                }
                
            })

            return res.json(result);
        })
        .catch((error) => console.error(error));
}

exports.addAlloy = (req, res) => {
    const data = {
        id: req.body.id,
        name: req.body.name,
        group: req.body.group,
        creationDate: new Date().toISOString(),
        addedBy: req.body.author,
        composition: req.body.composition,
        properties: req.body.props
    };

    const alloy = new Alloy(data);

    db.collection('alloys')
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
    db.doc(`/alloys/${req.params.alloyId}`)
        .get()
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
    let data = {};
    db.collection('alloys')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach( (doc) => {
                data = doc.data();
                alloys.push(new Alloy(data));
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