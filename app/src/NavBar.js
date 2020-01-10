import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import React from 'react';

const NavBar = (props) => {
    return (
        <AppBar position="static" style={{ padding: '5px' }}>
            <Grid container justify='space-between'>
                <Typography variant="h4">ProofOfExistence Dapp</Typography>
                <div>
                    <Grid container direction='row' alignContent='space-between' justify='space-between'>
                        {props.children}
                    </Grid>
                </div>

            </Grid>
        </AppBar>
    )
}

export default NavBar;
