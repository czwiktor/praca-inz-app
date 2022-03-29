import React from 'react';
import { Typography } from "@material-ui/core";
import { Accordion } from "@material-ui/core";
import { AccordionDetails } from "@material-ui/core";
import { AccordionSummary } from "@material-ui/core";
import BasicTable from './Table';

export default function AccordionEl(attribute) {
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    let tableMarkup = attribute ? <BasicTable key={attribute[0]} attributes={attribute} /> : '';

   return (
        <div>
            <Accordion className="alloy-table" expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                <Typography className="alloy-table__header">
                    <h3>
                        Tabela właściwości:   
                    </h3>
                    <span>
                        Kliknij aby rozwinąć
                    </span>
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {tableMarkup}
                </AccordionDetails>
            </Accordion>
        </div>
    )
}