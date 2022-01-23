import React, { Component} from "react";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";
import { Typography } from "@material-ui/core";

const styles = {
    container: {
        display: 'flex',
        marginBottom: 60,
        padding: 16
    }
    
}

class Alloy extends Component {
    render() {
        const { classes, alloy: {name, props, composition, group} } = this.props;

        return (
            <Card sx={{ maxWidth: 320}} className={classes.container}>
                {/* <CardMedia
                    component="img"
                    alt="alloy image"
                    height="140"
                    image={alloyImage}
                /> */}
                <CardContent class={classes.content}>
                    <Typography gutterBottom variant="h4" component="div">
                        {name} {group}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props}  {composition}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="medium" component={Link} to={`/getDetails/${name}`}> Sprawdź </Button>
                </CardActions>
            </Card>
        )
    }
}

export default withStyles(styles)(Alloy)