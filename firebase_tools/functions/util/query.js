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

exports.checkComposition = (query) => {
    if (!query || query.length <= 0) {
        return;
    }

    const comp = query.composition;
}

exports.checkGroups = (query) => {
    if (!query || query.length <= 0) {
        return;
    }

    const group = query.group;
}

exports.checkProps = (query) => {
    if (!query || query.length <= 0) {
        return;
    }

    const props = query.props;
}