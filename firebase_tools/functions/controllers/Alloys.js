const { admin, db } = require('../scripts/admin');

const firebaseApp = require('firebase/app');
const config = require('../scripts/config');

firebaseApp.initializeApp(config);

class Alloy {
    constructor (data) {
        this.id = data.alloy_id;
        this.name = data.alloy_name;
        this.date = data.date;
        this.group = data.group;
        this.author = data.author;
        this.composition = {
            Al: data.composition.Al,
            Cu: data.composition.Cu,
            Fe: data.composition.Fe,
            Mg: data.composition.Mg,
            Mn: data.composition.Mn,
            Cr: data.composition.Cr,
            Pb: data.composition.Pb,
            Ti: data.composition.Ti,
            Ni: data.composition.Ni,
            Si: data.composition.Si,
            Sr: data.composition.Sr,
            Zn: data.composition.Zn,
            Others: data.composition.inne
        }
        this.props = {
            R02: data.props['R0,2'],
            Rm: data.props['Rm min'],
            A5: data.props['A5 min'],
            HB: data.props['HB min']
        }
    }
}

const resolveQueries = (alloys, compQuery, propQuery, isGrouped) => {
    let result = [];
    let resultsSecond = [];
    let resultsFirst = [];

    alloys.forEach((data) => {
        let alloy = new Alloy(data.data());
        let composition = alloy.composition;
        let props = alloy.props;

        if (compQuery && compQuery.length) {
            let propsNames = compQuery;
            let flag = false;

            for (let i = 0; i < propsNames.length; i++) {
                let queryName = propsNames[i];
                let alloyComp = composition[queryName];

                if (alloyComp > 0) {
                   flag = true;
                }
            }

            if (flag) {
                resultsFirst.push(alloy);
            }
        }

        if (propQuery) {
            let propsNames = Object.keys(propQuery);

            let flag = true;
            if (propsNames.length) {
                for (let j = 0; j < propsNames.length; j++) {
                    let queryName = propsNames[j];
                    let alloyProp = props[queryName];
                    let queryProp = propQuery[queryName];
                
                    if (alloyProp < queryProp['min'] || alloyProp > queryProp['max']) {
                        flag = false;
                    }
    
                    if (flag) {
                        resultsSecond.push(alloy);
                    }
                }
            } else {
                propQuery = false;
            }
        }
        
        if (!resultsFirst.length && !resultsSecond.length && isGrouped) {
            result.push(alloy);
        }
    })

    if (resultsFirst.length) {
        result = resultsFirst;
    }

    if (propQuery) {
        result = resultsFirst.filter(x => resultsSecond.includes(x));
    }

    if (propQuery && (!compQuery || !compQuery.length)) {
        result = resultsSecond;
    }

    return result;
}

exports.queryAlloys = (req, res) => {
    var isNotEmpty = req.body ? req.body : false;
    var request = isNotEmpty ? req.body : '';

    const queries = {
        groups: request.groups,
        composition: request.composition,
        props: request.properties
    };

    let result = [];
 
    const groupQuery = queries.groups;
    const compQuery = queries.composition;
    const propQuery = queries.props;

    if (groupQuery != undefined && groupQuery.length) {
        db
            .collection('alloys')
            .where('group', 'in', groupQuery)
            .get()
            .then((query) => {
                let alloys= query;
                result = resolveQueries(alloys, compQuery, propQuery, true);
                return res.json(result);
            })
            .catch((error) => console.error(error));
    } else {
        db
            .collection('alloys')
            .get()
            .then((query) => {
                let alloys = query;
                if (((compQuery == undefined || !compQuery.length) && (propQuery == undefined || !Object.keys(propQuery).length))) {
                    alloys.forEach((doc) => {
                        let alloy = new Alloy(doc.data());
                        result.push(alloy)
                    })
                } else {
                    result = resolveQueries(alloys, compQuery, propQuery, false);
                }
                
                return res.json(result);
            })
            .catch((error) => console.error(error));
    }
};

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

    db
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

exports.addAllAlloys = (req, res) => {
    var docs = req.body

    docs.forEach((doc) => {
        db
        .collection("alloys")
        .doc(doc.alloy_name)
        .set(doc);
    })
}

exports.getAlloy = (req, res) => {
    let alloy = {};
    let result = []
    db
        .doc(`/alloys/${req.params.alloy_name}`)
        .get()
        .then((doc) => {
            alloy = new Alloy(doc.data());
            result.push(alloy )
            return res.json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        })
}

exports.getAllAlloys = (req, res) => {
        let alloys = [];
        let data = {};
        db
            .collection('alloys')
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
            });
    }

exports.getAllElements = (req, res) => {
    let elements = [];
    db  
        .collection('elements')
        .get()
        .then((querySnapshot) => { 
            querySnapshot.forEach((doc) => {
                data = doc.data();
                elements.push(data);
            });
        
            return res.json(elements);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        })
}

exports.getAllGroups = (req, res) => {
    let groups = [];
    db  
        .collection('groups')
        .get()
        .then((querySnapshot) => { 
            querySnapshot.forEach((doc) => {
                data = doc.data();
                groups.push(data);
            });
        
            return res.json(groups);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        })
}

exports.getAllProperties = (req, res) => {
    let properties = [];
    db
        .collection('mechanical_props')
        .get()
        .then((querySnapshot) => { 
            querySnapshot.forEach((doc) => {
                data = doc.data();
                properties.push(data);
            });
        
            return res.json(properties);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        })
}