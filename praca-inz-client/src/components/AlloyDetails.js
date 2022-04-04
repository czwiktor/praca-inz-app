import React, { Component} from "react";
import { Typography } from "@material-ui/core";
import { Container } from '@material-ui/core';
import TableProperties from './TableProps';
import TableComposition from './TableElements';

const classes = {
    main: 'alloy-details__item',
    alloySidebar: 'alloy-details__sidebar',
    alloyContent: 'alloy-details__content',
    alloyText: 'alloy-details__text',
    alloyAccordions: 'alloy-details__accordions'
}

class AlloyDetails extends Component {
    render() {
        const {alloy} = this.props;
        let properties = [];
        let composition = [];

        properties.push(alloy.props);
        composition.push(alloy.composition);

        console.log(properties);
        console.log(composition);

        let propertiesMarkup = <TableProperties attr={properties} />
        let compositionMarkup = <TableComposition attr={composition} />
        
        return (
            <Container className="alloy-details">
                <Typography variant="h2" className='header-text'>
                    Szczegóły stopu
                </Typography>
                <div className={classes.alloyText}> 
                    <Typography className="alloy-details__text-item" variant="h2"> <b> Nazwa stopu:  </b> {alloy.name} </Typography>
                    <Typography className="alloy-details__text-item" variant="h4"> <b> Grupa stopów: </b> Lorem ipsum dolor sit amet {alloy.group} </Typography>
                    <Typography className="alloy-details__text-item" variant="p"> <b> Autor: </b> {alloy.author} </Typography>
                </div>
                <div className={classes.alloyAccordions}> 
                    {propertiesMarkup}

                    {compositionMarkup}
                </div>
            </Container>
        )
    }
}

export default AlloyDetails;