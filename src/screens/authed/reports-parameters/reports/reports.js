import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
    },
});

function MeetingInitiate() {
    const classes = useStyles();
    const history = useHistory();

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="javascript:void(0)" onClick={() => { history.push('/dashboard') }}>
                    Home
             </Link>
                <Typography color="textPrimary">Reports-Parameters</Typography>
                <Typography color="textPrimary">Reports</Typography>
            </Breadcrumbs>

            <Card className={classes.root}>
                <CardContent>

                    <Button onClick={() => { history.push('/reports-parameters/doctorReport') }}>
                        Doctor Reports
                    </Button>
                    <Button onClick = {()=>{history.push('reports-parameters/employeesReport')}}>
                        Employee Reports
                    </Button>
                    <Button>
                        KPI(Key Performance Indicator) Reports
                    </Button>
                    <Button>
                        Call Reports
                    </Button>
                    <Button>
                        Attendace Reports
                    </Button>
                </CardContent>
            </Card>
        </>
    )
}

export default MeetingInitiate