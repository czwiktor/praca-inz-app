import React, { Component} from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";

import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
};

const classes = {
    container: 'card-item',
    content: 'card-item__content',
    button: 'card-item__button'
};

class Alloy extends Component {
    render() {
        const { alloy: {id, name, group} } = this.props;

        return (
            <Card xs={{ maxWidth: 320}} sm={{maxWidth: 420}} md={{ maxWidth: 768}} className={classes.container}>
                <CardContent className={classes.content}>
                    <Typography gutterBottom variant="h4" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button className={classes.button} size="large" component={Link} to={`/showDetails/${name}`}> Sprawdź </Button>
                </CardActions>
            </Card>
        )
    }
}

Alloy.propTypes = {
  alloy: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps)(withStyles(styles)(Alloy));
