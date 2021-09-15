import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { CardMedia } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import LockOpenSharpIcon from '@material-ui/icons/LockOpenSharp';
import LockSharpIcon from '@material-ui/icons/LockSharp';
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';
import LinearProgress from '@material-ui/core/LinearProgress';
import ApiServices from '../../../config/ApiService';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
    filenames: {
        padding: '0.5% 0%'
    },
    imageThumbnail: {
        width: "70px",
        height: "70px"
    }
}))(LinearProgress);

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}



function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>

                {props.headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tiers: {
        minWidth: 300,
    },
    tiersCell: {
        minWidth: 300
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    media: {
        maxWidth: 80,
        height: 80,
        paddingBottom: '56.25%',
        marginTop: "1em",
        marginBottom: "1em",
        alignContent: "center"
    },
    filenames: {
        padding: '0.5% 0%'
    },
    imageThumbnail: {
        width: "70px",
        height: "70px"
    }
}));

export default function GridTable(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = useState([]);
    const [headCells, setHeadCells] = useState([]);
    const [monthsName, setMonthsName] = useState(['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'])

    useEffect(() => {
        if (props.headCells && props.rows) {
            setRows(props.rows)
            setHeadCells(props.headCells)
        }
    }, [props.headCells, props.rows])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            headCells={headCells}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.name}
                                            onClick={() => { props.onRowClick(row) }}
                                        >

                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Action") {
                                                    return <TableCell>
                                                        <Select
                                                            onChange={(e) => { props.onChange(e, row) }}
                                                            label="Action"

                                                            inputProps={{
                                                                name: 'Action',
                                                                id: 'outlined-age-native-simple',
                                                            }}
                                                        >
                                                            {row.isActive === true ?
                                                                <MenuItem value={'unlock'}>Unlock<LockOpenSharpIcon
                                                                    style={{
                                                                        fontSize: 'medium', marginLeft: '3px',
                                                                        marginTop: '2px'
                                                                    }} /></MenuItem>
                                                                :
                                                                <MenuItem value={'lock'}>Lock <LockSharpIcon
                                                                    style={{ fontSize: 'medium', marginLeft: '3px', marginTop: '2px' }} /></MenuItem>
                                                            }
                                                            <MenuItem value={'view'}>View <VisibilitySharpIcon
                                                                style={{ fontSize: 'medium', marginLeft: '3px', marginTop: '2px', paddingTop: '2px' }} /></MenuItem>
                                                        </Select>
                                                    </TableCell>
                                                }
                                            })}

                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Employee") {
                                                    return <TableCell>
                                                        {row.employeeName}
                                                    </TableCell>
                                                }
                                            })}

                                            {props.headCells.map((v, i) => {
                                                if (v.label === "CPA % (Call plan andherence)") {
                                                    return <TableCell>
                                                        <Table
                                                            className={classes.tiers}
                                                            aria-labelledby="tableTitle"
                                                            aria-label="enhanced table"
                                                        >
                                                            <TableBody>
                                                                <TableRow className={classes.tiersCell}>

                                                                    <TableCell >
                                                                        <div style={{
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            justifyContent: "space-between",
                                                                        }}>
                                                                            <span>
                                                                                T1
                                                                            </span>
                                                                            <span>
                                                                                {row.tier1Per}%
                                                                        </span>
                                                                        </div>
                                                                        <BorderLinearProgress variant="determinate" value={row.tier1Per} />
                                                                    </TableCell>
                                                                </TableRow>

                                                                <TableRow className={classes.tiersCell}>
                                                                    <TableCell>
                                                                        <div style={{
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            justifyContent: "space-between",
                                                                        }}>
                                                                            <span>
                                                                                T2
                                                                            </span>
                                                                            <span>{row.tier2Per}%</span>
                                                                        </div>
                                                                        <BorderLinearProgress variant="determinate" value={row.tier2Per} />
                                                                    </TableCell>
                                                                </TableRow>

                                                                <TableRow className={classes.tiersCell}>
                                                                    <TableCell>
                                                                        <div style={{
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            justifyContent: "space-between",
                                                                        }}>
                                                                            <span>
                                                                                T3
                                                                            </span>
                                                                            <span>
                                                                                {row.tier3Per}%
                                                                            </span>
                                                                        </div>
                                                                        <BorderLinearProgress variant="determinate" value={row.tier3Per} />
                                                                    </TableCell>
                                                                </TableRow>

                                                                <TableRow className={classes.tiersCell}>
                                                                    <TableCell>
                                                                        <div style={{
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            justifyContent: "space-between",
                                                                        }}>
                                                                            <span>

                                                                                Total
                                                                            </span>
                                                                            <span>
                                                                                {row.totalPer}%
                                                                            </span>
                                                                        </div>
                                                                        <BorderLinearProgress variant="determinate" value={row.totalPer} />
                                                                    </TableCell>
                                                                </TableRow>

                                                            </TableBody>
                                                        </Table>
                                                    </TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Designation") {
                                                    return <TableCell>{row.designation}</TableCell>
                                                }
                                            })}

                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Month") {
                                                    return <TableCell>
                                                        {monthsName[row.month]}
                                                    </TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Status") {
                                                    return <TableCell>

                                                        {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                                                        {row.isActive === true && <LockSharpIcon style={{ fontSize: 'medium', marginLeft: '2px', marginTop: '3px', paddingTop: '2px' }} />}
                                                        {row.isActive === false && <LockOpenSharpIcon style={{ fontSize: 'medium', marginLeft: '2px', marginTop: '3px', paddingTop: '2px' }} />}
                                                    </TableCell>
                                                }
                                            })}

                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Name") {
                                                    return <TableCell>{row.name}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Dr. Names") {
                                                    return <TableCell>{`DR. ${row.name}`}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Abbreviation") {
                                                    return <TableCell>{row.abbreviation}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Address") {
                                                    return <TableCell>{row.address}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Brick Type") {
                                                    return <TableCell>{row.brickType}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Tier ID") {
                                                    return <TableCell>{row.tierId}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Fee") {
                                                    return <TableCell>{row.fee}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Province") {
                                                    return <TableCell>{row.provinceId}</TableCell>
                                                    
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Region") {
                                                    return (<TableCell>{row.regionId}</TableCell>
                                                            
                                                        )
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Zone") {
                                                    return <TableCell>{row.zoneId}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Territory") {
                                                    return <TableCell>{row.territoryId}</TableCell>
                                                }
                                            })}

                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Contact Detail") {
                                                    return <TableCell>{row.contactDetail}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Contact Number") {
                                                    return <TableCell>{row.contactNumber}</TableCell>
                                                }
                                            })}

                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Company Logo") {
                                                    return (
                                                        <TableCell>
                                                            <Card className={classes.media}>
                                                                <CardActionArea >
                                                                    <CardMedia
                                                                        component="img"
                                                                        alt="Company Logo"
                                                                        height="140"
                                                                        src={ApiServices.getBaseUrl() + `/uploads/${row.logoImg}`}
                                                                        title="Company Logo"
                                                                    />
                                                                </CardActionArea>
                                                            </Card>
                                                        </TableCell>
                                                    )
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Assigned Rep") {
                                                    return <TableCell>{row.assignedRep}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Medical Unit Name") {
                                                    return <TableCell>{row.medicalUnitName}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Call Opening") {
                                                    return <TableCell>{row.callOpening}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Document Type") {
                                                    return <TableCell>{row.documentType}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Question") {
                                                    return <TableCell>{row.question}</TableCell>
                                                }
                                            })}

                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Employee ID") {
                                                    return <TableCell>{row.identifier}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Email") {
                                                    return <TableCell>{row.email}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Phone") {
                                                    return <TableCell>{row.phone}</TableCell>
                                                }
                                            })}

                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Company") {
                                                    return <TableCell>{row.company}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Molecule") {
                                                    return <TableCell>{row.molecule}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Files") {
                                                    return (<TableCell
                                                        style={{
                                                            display: "flex",
                                                        }}>
                                                        {row.files && row.files.length}
                                                    </TableCell>
                                                    )
                                                }
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}