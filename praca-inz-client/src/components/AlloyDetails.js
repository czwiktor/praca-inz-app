import React, { Component} from "react";
import { Typography } from "@material-ui/core";
import { Container } from '@material-ui/core';

import FusionCharts from "fusioncharts/core";

// include chart from viz folder - import ChartType from fusioncharts/viz/[ChartType];
import Column2D from "fusioncharts/viz/column2d";

// add chart as dependency - FusionCharts.addDep(ChartType);
FusionCharts.addDep(Column2D);


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

        console.log(props);
        console.log(composition);

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

        // instantiate the chart.
        var chartInstanceComp = new FusionCharts({
            type: "Column2D",
            renderAt: "chart-container", // div container where chart will render
            width: "600",
            height: "400",
            dataFormat: "json",
            dataSource: {
            // chart configuration
            chart: {
                caption: "Countries With Most Oil Reserves [2017-18]",
                subcaption: "In MMbbl = One Million barrels",
            },
            // chart data
            data: compArray
            },
        });

        var chartInstanceProps = new FusionCharts({
            type: "Column2D",
            renderAt: "chart-container", // div container where chart will render
            width: "600",
            height: "400",
            dataFormat: "json",
            dataSource: {
            // chart configuration
            chart: {
                caption: "Countries With Most Oil Reserves [2017-18]",
                subcaption: "In MMbbl = One Million barrels",
            },
            // chart data
            data: propsArray
            },
        });
  
        let propertiesMarkup = chartInstanceComp;
        let compositionMarkup = chartInstanceProps;
        
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