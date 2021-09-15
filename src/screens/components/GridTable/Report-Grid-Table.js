import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';

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
            <TableRow style={{ backgroundColor: '#00aeef' }}
            >

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

}));

export default function GridTable(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = useState([]);
    const [headCells, setHeadCells] = useState([]);

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
                                                if (v.label === "S. No") {
                                                    return <TableCell>{index + 1}</TableCell>
                                                }
                                            })}


                                            {props.headCells.map((v, i) => {
                                                if (v.id === "callEventStatus") {
                                                    return <TableCell>{row.eventStatus}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "callVisitDate") {
                                                    return <TableCell>{row.visitDate}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "checkInTime") {
                                                    return <TableCell>{row.checkInTime}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "checkOutTime") {
                                                    return <TableCell>{row.checkOutTime}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "docName") {
                                                    return <TableCell>{row.docName}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "callEmployeeName") {
                                                    return <TableCell>{row.employeeName}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "callCity") {
                                                    return <TableCell>{row.city}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "docSpeciality") {
                                                    return <TableCell>{row.docSpeciality}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "state") {
                                                    return <TableCell>{row.state}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "products") {
                                                    return <TableCell>{row.products}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "objectiveName") {
                                                    return <TableCell>{row.objectiveName}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "clinic/HospitalAddress") {
                                                    return <TableCell>{row.hospitalAddress}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "lastSyncTime") {
                                                    return <TableCell>{row.lastSyncTime}</TableCell>
                                                }
                                            })}


                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Code") {
                                                    return <TableCell>{row.code}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Name") {
                                                    return <TableCell>{row.name}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Assign To") {
                                                    return <TableCell>{row.manager}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Client ID") {
                                                    return <TableCell>{row.clientId.substring(row.clientId.length - 4, row.clientId.length)}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Client Name") {
                                                    return <TableCell>{row.clientName}</TableCell>
                                                }
                                            })}

                                            {props.headCells.map((v, i) => {
                                                if (v.id === "docEmployeeName") {
                                                    return <TableCell>{row.employeeName}</TableCell>
                                                }
                                            })}

                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Contact") {
                                                    return <TableCell>{row.contact}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Email") {
                                                    return <TableCell>{row.email}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "speciality") {
                                                    return <TableCell>{row.speciality}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Qualification") {
                                                    return <TableCell>{row.qualification}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "docsCity") {
                                                    return <TableCell>{row.city}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Division") {
                                                    return <TableCell>{row.division}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Division/Department") {
                                                    return <TableCell>{row.division}</TableCell>
                                                }
                                            })}

                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Category") {
                                                    return <TableCell>{row.category}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Zone") {
                                                    return <TableCell>{row.zone}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "DOB") {
                                                    return <TableCell>{row.dob}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Designation") {
                                                    return <TableCell>{row.designation}</TableCell>
                                                }
                                            })}{props.headCells.map((v, i) => {
                                                if (v.label === "Hospital") {
                                                    return <TableCell>{row.hospital}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "PMDC No") {
                                                    return <TableCell>{row.pmdcNo}</TableCell>
                                                }
                                            })}{props.headCells.map((v, i) => {
                                                if (v.label === "Country") {
                                                    return <TableCell>{row.country}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "employeestatus") {
                                                    return <TableCell>{row.status}</TableCell>
                                                }
                                            })}




                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Territory") {
                                                    return <TableCell>{row.territory}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "zoneKPI") {
                                                    return <TableCell>{row.zone}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "employeeNameKPI") {
                                                    return <TableCell>{row.employeeName}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "FLM Name") {
                                                    return <TableCell>{row.managerName}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Days in Field") {
                                                    return <TableCell>{row.daysInFieldNo}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "t1TargetDocs") {
                                                    return <TableCell>{row.t1TargetDocs}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "t2TargetDocs") {
                                                    return <TableCell>{row.t2TargetDocs}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "t3TargetDocs") {
                                                    return <TableCell>{row.t3TargetDocs}</TableCell>
                                                }
                                            })}

                                            {props.headCells.map((v, i) => {
                                                if (v.id === "totalTargetDocs") {
                                                    return <TableCell>{row.totalTargetDocs}</TableCell>
                                                }
                                            })}

                                            {props.headCells.map((v, i) => {
                                                if (v.id === "t1CoverDocs") {
                                                    return <TableCell>{row.t1CoverDocs}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "t2CoverDocs") {
                                                    return <TableCell>{row.t2CoverDocs}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "t3CoverDocs") {
                                                    return <TableCell>{row.t3CoverDocs}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "totalCoverDocs") {
                                                    return <TableCell>{row.totalCoverDocs}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "t1CoverDocsPer") {
                                                    return <TableCell>{row.t1CoverDocsPer}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "t2CoverDocsPer") {
                                                    return <TableCell>{row.t2CoverDocsPer}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "t3CoverDocsPer") {
                                                    return <TableCell>{row.t3CoverDocsPer}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "totalCoverDocsPer") {
                                                    return <TableCell>{row.totalCoverDocsPer}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "t1CallsDocs") {
                                                    return <TableCell>{row.t1CallsDocs}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "t2CallsDocs") {
                                                    return <TableCell>{row.t2CallsDocs}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "t3CallsDocs") {
                                                    return <TableCell>{row.t3CallsDocs}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "totalCallsDocs") {
                                                    return <TableCell>{row.totalCallsDocs}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "t1CPACallPer") {
                                                    return <TableCell>{row.t1CPACallPer}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "t2CPACallPer") {
                                                    return <TableCell>{row.t2CPACallPer}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.id === "t3CPACallPer") {
                                                    return <TableCell>{row.t3CPACallPer}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Daily Calls Average") {
                                                    return <TableCell>{row.dailyCallAverage}</TableCell>
                                                }
                                            })}
                                            {props.headCells.map((v, i) => {
                                                if (v.label === "Joined Visit Calls") {
                                                    return <TableCell>{row.jionVisitCall}</TableCell>
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