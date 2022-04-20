import React, { Component} from "react";
import { Typography } from "@material-ui/core";
import { Container } from '@material-ui/core';
import TableProps from './TableProps';
import TableElements  from './TableElements';

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
        const { props, composition } = this.props.alloy;

        let propsArray = [];
        let compArray = [];

        if (props) {
            for (const [key, value] of Object.entries(props)) {
                let propObj = {
                    label: key,
                    value: value
                }

                propsArray.push(propObj);
            }
        }

        if (composition) {
            for (const [key, value] of Object.entries(composition)) {
                let propObj = {
                    label: key,
                    value: value
                }

                compArray.push(propObj);
            }
        }

        const chartInstanceComp = <div className="alloy-details__elements"> 
        <Typography className="alloy-details__text-item" variant="h2"> <b> Własności mechaniczne stopu: </b> </Typography>
        <TableProps attr={props} />
        </div>;
        const chartInstanceProps = <div className="alloy-details__elements"> 
            <Typography className="alloy-details__text-item" variant="h2"> <b> Zawartość pierwiastków w stopie:  </b> </Typography>
            <TableElements attr={composition} />
        </div>
  
        let propertiesMarkup = chartInstanceComp;
        let compositionMarkup = chartInstanceProps;
        
        return (
            <Container className="alloy-details">
                <Typography variant="h2" className='header-text'>
                    Szczegóły stopu
                </Typography>
                <div className={classes.alloyText}> 
                    <Typography className="alloy-details__text-item" variant="h2"> <b> Nazwa stopu:  </b> {alloy.name} </Typography>
                    <Typography className="alloy-details__text-item" variant="h2"> <b> Grupa stopów: </b> {alloy.group} </Typography>
                    <Typography className="alloy-details__text-item" variant="body2"> <b> Autor: </b> {alloy.author} </Typography>
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