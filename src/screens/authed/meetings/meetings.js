import React from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    root: {
        minWidth: 200,
        width: "100%",
        marginTop: 20,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    table: {
        minWidth: 700,
    },
});

function Meetings() {
    const classes = useStyles();
    const history = useHistory();
    const user = useSelector((state) => state.user.user)

    return (
        user && user.email !== undefined ?
            <>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="javascript:void(0)" onClick={() => { history.push('/dashboard') }}>
                        Home
        </Link>
                    <Typography color="textPrimary">Meetings</Typography>
                </Breadcrumbs>

                <Card className={classes.root}>
                    <CardContent>
                        <TableContainer component={Paper} style={{ margin: "0px", width: "100%", overflow: "auto" }}>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>#</StyledTableCell>
                                        <StyledTableCell>Meeting Name</StyledTableCell>
                                        <StyledTableCell>With Doctor</StyledTableCell>
                                        <StyledTableCell>Actions</StyledTableCell>
                                        <StyledTableCell>Logs</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {['1', '2', '3'].map((v, i) => {
                                        return <StyledTableRow key={"1"}>
                                            <StyledTableCell component="th" scope="row">
                                                {i + 1}
                                            </StyledTableCell>
                                            <StyledTableCell>Meeting 1</StyledTableCell>
                                            <StyledTableCell>Dr. ABC</StyledTableCell>
                                            <StyledTableCell><Link href={'javascript:void(0)'}>Start Meeting</Link></StyledTableCell>
                                            <StyledTableCell><Link href={'javascript:void(0)'}>View Logs</Link></StyledTableCell>
                                        </StyledTableRow>
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                    
                </Card>
            </>
            : null
    )
}

export default Meetings