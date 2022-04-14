const { admin, db } = require('../scripts/admin');

const firebaseApp = require('firebase/app');
const config = require('../scripts/config');

firebaseApp.initializeApp(config);

const docs = [
    {
   "alloy_id": 1,
   "author": "Admin",
   "alloy_name": "AlMg9",
   "props": {
       "R0,2": 130,
       "Rm min": 220,
       "A5 min": 1,
       "HB min": 70
   },
   "composition": {
    "Si": 2.5,
    "Fe": 1,
    "Cu": 0.1,
    "Mn": 0.55,
    "Mg": 10.5,
    "Cr": 0,
    "Ni": 0.1,
    "Zn": 0.25,
    "Pb": 0.1,
    "Sn": 0.1,
    "Ti": 0.2,
    "inne": 0.15,
    "Al": 94.95
     }
   },
    {
   "alloy_id": 2,
   "author": "Admin",
   "alloy_name":"AlMg5",
   "props": {
       "R0,2": 95,
       "Rm min": 170,
       "A5 min": 3,
       "HB min": 55
   },
   "composition": {
    "Si": 0.55,
    "Fe": 0.55,
    "Cu": 0.1,
    "Mn": 0.45,
    "Mg": 6.5,
    "Cr": 0,
    "Ni": 0,
    "Zn": 0.1,
    "Pb": 0,
    "Sn": 0,
    "Ti": 0.2,
    "inne": 0.15,
    "Al": 91.4
       }
    },
    {
   "alloy_id": 3,
   "author": "Admin",
   "alloy_name":"AlMg5Si2Mn",
   "props": {
       "R0,2": 110,
   "Rm min": 180,
   "A5 min": 3,
   "HB min": 65
   },
   "composition": {
    "Si": 2.6,
    "Fe": 0.25,
    "Cu": 0.05,
    "Mn": 0.8,
    "Mg": 6,
    "Cr": 0,
    "Ni": 0,
    "Zn": 0.07,
    "Pb": 0,
    "Sn": 0,
    "Ti": 0.25,
    "inne": 0.15,
    "Al": 89.83
     }
    },
    {
   "alloy_id": 4,
   "author": "Admin",
   "alloy_name":"AlCu4MgTi",
   "props": {
       "R0,2": 200,
   "Rm min": 320,
   "A5 min": 5,
   "HB min": 90
   },
   
   "composition": {
    "Si": 0.2,
    "Fe": 0.35,
    "Cu": 5,
    "Mn": 0.1,
    "Mg": 0.35,
    "Cr": 0,
    "Ni": 0.05,
    "Zn": 0.1,
    "Pb": 0.05,
    "Sn": 0.05,
    "Ti": 0.3,
    "inne": 0.1,
    "Al": 93.35000000000001
       }
    },
    {
   "alloy_id": 5,
   "author": "Admin",
   "alloy_name":"AlCu4Ti",
   "props": {
       "R0,2": 220,
   "Rm min": 330,
   "A5 min": 3,
   "HB min": 95
   },
   "composition": {
   "Si": 0.18,
   "Fe": 0.19,
   "Cu": 5.2,
   "Mn": 0.55,
   "Mg": 0,
   "Cr": 0,
   "Ni": 0,
   "Zn": 0.07,
   "Pb": 0,
   "Sn": 0,
   "Ti": 0.3,
   "inne": 0.1,
   "Al": 93.41
   }
    },
    {
   "alloy_id": 6,
   "author": "Admin",
   "alloy_name":"AlCu4MnMg",
   "props": {
       "R0,2": 310,
   "Rm min": 370,
   "A5 min": 3,
   "HB min": 110
   },
   
   "composition": {
   "Si": 0.1,
   "Fe": 0.2,
   "Cu": 5,
   "Mn": 0.5,
   "Mg": 0.5,
   "Cr": 0,
   "Ni": 0.05,
   "Zn": 0.1,
   "Pb": 0.03,
   "Sn": 0.03,
   "Ti": 0.1,
   "inne": 0.1,
   "Al": 93.29
   }
    },
    {
   "alloy_id": 7,
   "author": "Admin",
   "alloy_name":"AlZn10Si8Mg",
   "props": {
       "R0,2": 140,
   "Rm min": 250,
   "A5 min": 5,
   "HB min": 70
   },
   "composition": {
   "Si": 9.5,
   "Fe": 0.3,
   "Cu": 0.1,
   "Mn": 0.15,
   "Mg": 0.5,
   "Cr": 0,
   "Ni": 0,
   "Zn": 10.5,
   "Pb": 0,
   "Sn": 0,
   "Ti": 0.15,
   "inne": 0.15,
   "Al": 78.65
   }
    },
    {
   "alloy_id": 8,
   "author": "Admin",
   "alloy_name":"AlSi2MgTi",
   "props": {
   "R0,2": 180,
   "Rm min": 240,
   "A5 min": 3,
   "HB min": 85
   },
   "composition": {
   "Si": 2.4,
   "Fe": 0.6,
   "Cu": 0.1,
   "Mn": 0.5,
   "Mg": 0.65,
   "Cr": 0,
   "Ni": 0.05,
   "Zn": 0.1,
   "Pb": 0.05,
   "Sn": 0.05,
   "Ti": 0.2,
   "inne": 0.15,
   "Al": 95.15
   }
    },
    {
   "alloy_id": 9,
   "author": "Admin",
   "alloy_name":"AlSi7Mg",
   "props": {
   "R0,2": 180,
   "Rm min": 220,
   "A5 min": 2,
   "HB min": 75
   },
   "composition": {
   "Si": 7.5,
   "Fe": 0.55,
   "Cu": 0.2,
   "Mn": 0.35,
   "Mg": 0.65,
   "Cr": 0,
   "Ni": 0.15,
   "Zn": 0.15,
   "Pb": 0.15,
   "Sn": 0.05,
   "Ti": 0.25,
   "inne": 0.15,
   "Al": 89.85
   }
    },
    {
   "alloy_id": 10,
   "author": "Admin",
   "alloy_name":"AlSi7Mg0,3",
   "props": {
       "R0,2": 190,
   "Rm min": 230,
   "A5 min": 2,
   "HB min": 75
   },
   "composition": {
   "Si": 7.5,
   "Fe": 0.19,
   "Cu": 0.05,
   "Mn": 0.1,
   "Mg": 0.65,
   "Cr": 0,
   "Ni": 0.05,
   "Zn": 0.1,
   "Pb": 0.05,
   "Sn": 0.05,
   "Ti": 0.2,
   "inne": 0.15,
   "Al": 90.91
   }
    },
    {
   "alloy_id": 11,
   "author": "Admin",
   "alloy_name":"AlSi10Mg(a)",
   "props": {
   "R0,2": 180,
   "Rm min": 220,
   "A5 min": 2,
   "HB min": 75
   },
   "composition": {
   "Si": 11,
   "Fe": 0.55,
   "Cu": 0.05,
   "Mn": 0.45,
   "Mg": 0.45,
   "Cr": 0,
   "Ni": 0.05,
   "Zn": 0.1,
   "Pb": 0.05,
   "Sn": 0.05,
   "Ti": 0.15,
   "inne": 0.15,
   "Al": 86.95
   }
    },
    {
   "alloy_id": 12,
   "author": "Admin",
   "alloy_name":"AlSi10Mg(Cu)",
   "props": {
       "R0,2": 180,
       "Rm min": 220,
       "A5 min": 1,
       "HB min": 75
   },
   "composition": {
   "Si": 11,
   "Fe": 0.65,
   "Cu": 0.35,
   "Mn": 0.55,
   "Mg": 0.45,
   "Cr": 0,
   "Ni": 0.15,
   "Zn": 0.35,
   "Pb": 0.1,
   "Sn": 0,
   "Ti": 0.2,
   "inne": 0.15,
   "Al": 86.05
   }
    },
    {
   "alloy_id": 13,
   "author": "Admin",
   "alloy_name":"AlSi11",
   "props": {
       "R0,2": 70,
   "Rm min": 150,
   "A5 min": 6,
   "HB min": 45
   },
   "composition": {
   "Si": 11.8,
   "Fe": 0.19,
   "Cu": 0.05,
   "Mn": 0.1,
   "Mg": 0.45,
   "Cr": 0,
   "Ni": 0,
   "Zn": 0.07,
   "Pb": 0,
   "Sn": 0,
   "Ti": 0.15,
   "inne": 0.1,
   "Al": 87.09
   }
    },
    {
   "alloy_id": 14,
   "author": "Admin",
   "alloy_name":"AlSi12",
   "props": {
       "R0,2": 70,
       "Rm min": 150,
       "A5 min": 4,
       "HB min": 50
   },
   "composition": {
   "Si": 13.5,
   "Fe": 0.55,
   "Cu": 0.05,
   "Mn": 0.35,
   "Mg": 0,
   "Cr": 0,
   "Ni": 0,
   "Zn": 0.1,
   "Pb": 0,
   "Sn": 0,
   "Ti": 0.15,
   "inne": 0.15,
   "Al": 85.15
   }
    },
    {
   "alloy_id": 15,
   "author": "Admin",
   "alloy_name":"AlSi9",
   "props": {
       "R0,2": 90,
   "Rm min": 180,
   "A5 min": 5,
   "HB min": 55
   },
   
   "composition": {
   "Si": 11,
   "Fe": 0.65,
   "Cu": 0.1,
   "Mn": 0.5,
   "Mg": 0.1,
   "Cr": 0,
   "Ni": 0.05,
   "Zn": 0.15,
   "Pb": 0.05,
   "Sn": 0.05,
   "Ti": 0.15,
   "inne": 0.15,
   "Al": 87.05
   }
    },
    {
   "alloy_id": 17,
   "author": "Admin",
   "alloy_name":"AlSi6Cu4",
   "props": {
       "R0,2": 100,
   "Rm min": 170,
   "A5 min": 1,
   "HB min": 60
   },
   "composition": {
   "Si": 7,
   "Fe": 1,
   "Cu": 5,
   "Mn": 0.65,
   "Mg": 0.55,
   "Cr": 0.15,
   "Ni": 0.45,
   "Zn": 2,
   "Pb": 0.3,
   "Sn": 0.15,
   "Ti": 0.25,
   "inne": 0.35,
   "Al": 82.15
   }
    },
    {
   "alloy_id": 18,
   "author": "Admin",
   "alloy_name":"AlSi5Cu3Mg",
   "props": {
       "R0,2": 110,
   "Rm min": 230,
   "A5 min": 2,
   "HB min": 100
   },
   
   "composition": {
   "Si": 6,
   "Fe": 0.6,
   "Cu": 3.6,
   "Mn": 0.55,
   "Mg": 0.45,
   "Cr": 0,
   "Ni": 0.1,
   "Zn": 0.2,
   "Pb": 0.1,
   "Sn": 0.05,
   "Ti": 0.25,
   "inne": 0.15,
   "Al": 87.95
   }
    },
    {
   "alloy_id": 19,
   "author": "Admin",
   "alloy_name":"AlSi7Cu0,5Mg",
   "props": {
       "R0,2": 240,
   "Rm min": 320,
   "A5 min": 1,
   "HB min": 85
   },
   
   "composition": {
   "Si": 7.5,
   "Fe": 0.25,
   "Cu": 0.7,
   "Mn": 0.15,
   "Mg": 0.45,
   "Cr": 0,
   "Ni": 0,
   "Zn": 0.07,
   "Pb": 0,
   "Sn": 0,
   "Ti": 0.2,
   "inne": 0.1,
   "Al": 90.58
   }
    },
    {
   "alloy_id": 20,
   "author": "Admin",
   "alloy_name":"AlSi9Cu3(Fe)",
   "props": {
       "R0,2": 140,
   "Rm min": 240,
   "A5 min": 1,
   "HB min": 80
   },
   
   "composition": {
   "Si": 7.5,
   "Fe": 0.6,
   "Cu": 3.6,
   "Mn": 0.55,
   "Mg": 0.45,
   "Cr": 0,
   "Ni": 0.1,
   "Zn": 0.2,
   "Pb": 0.1,
   "Sn": 0.05,
   "Ti": 0.25,
   "inne": 0.15,
   "Al": 86.45
   }
    },
    {
   "alloy_id": 21,
   "author": "Admin",
   "alloy_name":"AlSi8Cu3",
   "props": {
       "R0,2": 100,
   "Rm min": 170,
   "A5 min": 1,
   "HB min": 60
   },
   
   "composition": {
   "Si": 9.5,
   "Fe": 0.8,
   "Cu": 3.5,
   "Mn": 0.65,
   "Mg": 0.55,
   "Cr": 0,
   "Ni": 0.35,
   "Zn": 1.2,
   "Pb": 0.25,
   "Sn": 0.15,
   "Ti": 0.25,
   "inne": 0.25,
   "Al": 82.55
   }
    },
    {
   "alloy_id": 22,
   "author": "Admin",
   "alloy_name":"AlSi9Cu1Mg",
   "props": {
       "R0,2": 235,
   "Rm min": 275,
   "A5 min": 1,
   "HB min": 60
   },
   
   "composition": {
   "Si": 9.7,
   "Fe": 0.8,
   "Cu": 1.3,
   "Mn": 0.55,
   "Mg": 0.65,
   "Cr": 0,
   "Ni": 0.2,
   "Zn": 0.8,
   "Pb": 0.1,
   "Sn": 0.1,
   "Ti": 0.2,
   "inne": 0.25,
   "Al": 85.35
   }
    },
    {
   "alloy_id": 23,
   "author": "Admin",
   "alloy_name":"AlSi17Cu4NiMg",
   "props": {
       "R0,2": 260,
   "Rm min": 295,
   "A5 min": 1,
   "HB min": 125
   },
   
   "composition": {
   "Si": 13.5,
   "Fe": 0.7,
   "Cu": 1.5,
   "Mn": 0.35,
   "Mg": 1.5,
   "Cr": 0,
   "Ni": 1.3,
   "Zn": 0.35,
   "Pb": 0,
   "Sn": 0,
   "Ti": 0.25,
   "inne": 0.15,
   "Al": 80.4
   }
    },
    {
   "alloy_id": 24,
   "author": "Admin",
   "alloy_name":"Anticorodal-50",
   "props": {
       "R0,2": 290,
   "Rm min": 320,
   "A5 min": 7,
   "HB min": 115
   },
   
   "composition": {
   "Si": 6,
   "Fe": 0.15,
   "Cu": 0.02,
   "Mn": 0.1,
   "Mg": 0.8,
   "Cr": 0,
   "Ni": 0,
   "Zn": 0.1,
   "Pb": 0,
   "Sn": 0,
   "Ti": 0.2,
   "inne": 0,
   "Al": 92.63
   }
    },
    {
   "alloy_id": 25,
   "author": "Admin",
   "alloy_name":"Castasil-37",
   "props": {
       "R0,2": 150,
   "Rm min": 300,
   "A5 min": 14,
   "HB min": 75
   },
   
   "composition": {
   "Si": 10.5,
   "Fe": 0.15,
   "Cu": 0.05,
   "Mn": 0.6,
   "Mg": 0.06,
   "Cr": 0,
   "Ni": 0,
   "Zn": 0.07,
   "Pb": 0,
   "Sn": 0,
   "Ti": 0,
   "inne": 0.6,
   "Al": 87.97
   }
    },
    {
   "alloy_id": 26,
   "author": "Admin",
   "alloy_name":"Alufont-60",
   "props": {
       "R0,2": 220,
   "Rm min": 280,
   "A5 min": 1.5,
   "HB min": 90
   },
   
   "composition": {
   "Si": 0.2,
   "Fe": 0.3,
   "Cu": 5.2,
   "Mn": 0.3,
   "Mg": 0.1,
   "Cr": 0,
   "Ni": 1.7,
   "Zn": 0.1,
   "Pb": 0,
   "Sn": 0,
   "Ti": 0.3,
   "inne": 0.7,
   "Al": 91.1
   }
    },
    {
   "alloy_id": 27,
   "author": "Admin",
   "alloy_name":"Thermodur-72",
   "props": {
       "R0,2": 240,
   "Rm min": 370,
   "A5 min": 18,
   "HB min": 110
   },
   
   "composition": {
   "Si": 3.2,
   "Fe": 0.15,
   "Cu": 0.03,
   "Mn": 0.8,
   "Mg": 8.8,
   "Cr": 0,
   "Ni": 0,
   "Zn": 0.07,
   "Pb": 0,
   "Sn": 0,
   "Ti": 0.15,
   "inne": 0.004,
   "Al": 86.79599999999999
   }
    }
];

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

const resolveQueries = (alloys, compQuery, propQuery) => {
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
    })

    result = resultsFirst;

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
        group: request.group,
        composition: request.composition,
        props: request.properties
    };

    let result = [];
 
    const groupQuery = queries.group;
    const compQuery = queries.composition;
    const propQuery = queries.props;

    if (false) {
        queriedByGroup = true;
        db
            .collection('alloys')
            .where('alloy_group', 'in', groupQuery)
            .get()
            .then((query) => {
                let alloys= query.data();
                result = resolveQueries(alloys, compQuery, propQuery);
                return res.json(result);
            })
            .catch((error) => console.error(error));
    } else {
        db
            .collection('alloys')
            .get()
            .then((query) => {
                let alloys = query;
                if ((!compQuery.length && !Object.keys(propQuery).length)) {
                    let alloy;
                    query.forEach((doc) => {
                        alloy = new Alloy(doc.data());
                        result.push(alloy)
                    })
                } else {
                    result = resolveQueries(alloys, compQuery, propQuery);
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