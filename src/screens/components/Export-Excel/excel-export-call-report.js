import React from "react";
import ReactExport from "react-export-excel";
import Button from '@material-ui/core/Button';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function Download(props) {
    return (
        <ExcelFile element={<Button variant="contained" color="secondary" style={{ marginLeft: '15px' }}><UnarchiveIcon /></Button>}
        >
            <ExcelSheet data={props.data} name="Dcotor Report">
                <ExcelColumn label="Status" value={'eventStatus'} />
                <ExcelColumn label="Visit Date" value={'visitDate'} />
                <ExcelColumn label="Check-In Time" value={'checkInTime'} />
                <ExcelColumn label="Close Visit Time" value={'checkOutTime'} />
                <ExcelColumn label="Name" value={'docName'} />
                <ExcelColumn label="Employee Name" value={'employeeName'} />
                <ExcelColumn label="Speciality" value={'docSpeciality'} />
                <ExcelColumn label="City" value={'city'} />
                <ExcelColumn label="State" value={'state'} />
                <ExcelColumn label="Promotins Products" value={'products'} />
                <ExcelColumn label="Objective Name" value={'objectiveName'} />
                <ExcelColumn label="Clinic/Hospital Address" value={'hospitalAddress'} />
                <ExcelColumn label="Last Sync Time" value={'lastSyncTime'} />
            </ExcelSheet>
        </ExcelFile>
    );
}
