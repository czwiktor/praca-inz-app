import React from 'react';
import { Typography } from "@material-ui/core";
import { Accordion } from "@material-ui/core";
import { AccordionDetails } from "@material-ui/core";
import { AccordionSummary } from "@material-ui/core";
import BasicTable from './Table';

export default function AccordionEl() {

    const [expanded, setExpanded] = React.useState(false);
    
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const {attrs} = this.prop;

    console.log('test3 ' + attrs);

   return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    Composition
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}> 
                    Chemical composition of an alloy 
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <BasicTable key='Composition' attributes={attrs.composition}></BasicTable>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Properties</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                    Mechanical properties of an alloy
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <BasicTable key='Properties' attributes={attrs.properties}> </BasicTable>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}