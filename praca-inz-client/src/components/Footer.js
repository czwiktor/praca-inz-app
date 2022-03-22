import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { Typography } from "@material-ui/core";

const mql = window.matchMedia('(max-width: 1024px)');
const mobileView = mql.matches;

let footerComponent = (
    <Typography variant="body2" color="text.secondary">
        Wydział Odlewnictwa - Praca inżynierska - Wiktor Czech 2022 KWPI ©
    </Typography>
   
)

if (mobileView) {
    footerComponent = (
        <IconButton color="inherit" aria-label="open drawer" className="footer__icon">
            <MenuIcon />
        </IconButton>
    )
}



export default function BottomAppBar() {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar className="footer" position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar className="footer__bar" >
          {footerComponent}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}