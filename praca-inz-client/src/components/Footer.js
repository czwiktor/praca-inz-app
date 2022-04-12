import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from "@material-ui/core";

const mql = window.matchMedia('(max-width: 1024px)');

let footerComponent = (
    <Typography variant="body2">
        Wydział Odlewnictwa - Praca inżynierska - Wiktor Czech 2022 KWPI ©
    </Typography>
   
)

export default function BottomAppBar() {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar className="footer" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar className="footer__bar" >
          {footerComponent}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}