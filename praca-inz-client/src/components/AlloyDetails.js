import React, { Component} from "react";
import { Typography } from "@material-ui/core";
import { Container } from '@material-ui/core';
import AccordionEl from './Accordion';

const classes = {
    main: 'alloy-details',
    alloySidebar: 'alloy-details__sidebar',
    alloyContent: 'alloy-details__content',
    alloyText: 'alloy-details__text',
    alloyAccordions: 'alloy-details__accordons'
}

class AlloyDetails extends Component {
    render() {
        const {alloy} = this.props;
        const attrs = [];
        attrs.push(alloy.properties);
        attrs.push(alloy.composition);

        console.log('test1 ' + attrs);
        console.log('test2 ' + alloy);

        return (
            <Container>
                <div class={classes.main}>
                    <div class={classes.alloySidebar}>
                        <img src="logo192.png"></img>
                    </div>
                    <div class={classes.alloyContent}>
                        <div className={classes.alloyText}> 
                            <Typography variant="h1" align="center"> {alloy.name} </Typography>
                            <Typography variant="h3" align="justify"> {alloy.group} </Typography>
                            <Typography variant="p" align="right"> {alloy.author} </Typography>
                        </div>
                        <div className={classes.alloyAccordions}> 
                            
                        </div>
                    </div>
                </div>
            </Container>
        
        )
    }
}

export default AlloyDetails;