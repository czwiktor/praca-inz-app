import React, { Component} from "react";
import { Typography } from "@material-ui/core";
import { Container } from '@material-ui/core';
import AccordionEl from './AccordionEl';

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
        const properties = alloy.props;
        const composition = alloy.composition;

        let attributes = []
        attributes.push(properties);
        attributes.push(composition);

        let attributesMarkup = attributes.map((attr, i) => 
            <AccordionEl key={i} attribute={attr} />
        )

        return (
            <Container>
                <div class={classes.main}>
                    <div class={classes.alloySidebar}>
                    </div>
                    <div class={classes.alloyContent}>
                        <div className={classes.alloyText}> 
                            <Typography className="alloy-details__text-item" variant="h2"> <b> Szczegóły stopu:  </b> {alloy.name} </Typography>
                            <Typography className="alloy-details__text-item" variant="h4"> <b> Grupa stopów: </b> Lorem ipsum dolor sit amet {alloy.group} </Typography>
                            <Typography className="alloy-details__text-item" variant="p"> <b> Autor: </b> Lorem ipsum dolor sit amet {alloy.author} </Typography>
                        </div>
                        <div className={classes.alloyAccordions}> 
                            {attributesMarkup}
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}

export default AlloyDetails;