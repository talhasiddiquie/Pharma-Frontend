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
                <ExcelColumn label="Client ID" value={'clientId'} />
                <ExcelColumn label="Client Name" value={'clientName'} />
                <ExcelColumn label="Employee Name" value={'employeeName'} />
                <ExcelColumn label="Contact" value={'contact'} />
                <ExcelColumn label="Email" value={'email'} />
                <ExcelColumn label="Speciality" value={'speciality'} />
                <ExcelColumn label="Qualification" value={'qualification'} />
                <ExcelColumn label="City" value={'city'} />
                <ExcelColumn label="Division" value={'division'} />
                <ExcelColumn label="Category" value={'category'} />
                <ExcelColumn label="Zone" value={'zone'} />
                <ExcelColumn label="DOB" value={'dob'} />
                <ExcelColumn label="Designation" value={'designation'} />
                <ExcelColumn label="Hospital" value={'hospital'} />
                <ExcelColumn label="PMDC No" value={'pmdcNo'} />
                <ExcelColumn label="Country" value={'country'} />
                <ExcelColumn label="Status" value={'status'} />
            </ExcelSheet>
        </ExcelFile>
    );
}
