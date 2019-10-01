import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Converter from './modules/converter/components/Converter';


const Graph = () => {
    return (
        <Container maxWidth = 'md'>
            <Grid container spacing = {0} justify = 'center'>
                <Grid item xs = {12} >
                    <Typography align = 'center' variant = 'h5' component = 'h5'>
                        Currency converter
                    </Typography>
                </Grid>
                <Grid item xs = {12}>
                    <Converter />
                </Grid>
                <Grid item sm = {12}>
                
                </Grid>
            </Grid>
        </Container>
    )
}

export default Graph;