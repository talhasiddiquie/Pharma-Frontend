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
                <ExcelColumn label="Code" value={'code'} />
                <ExcelColumn label="Name" value={'name'} />
                <ExcelColumn label="Assign To" value={'manager'} />
                <ExcelColumn label="Contact" value={'contact'} />
                <ExcelColumn label="Email" value={'email'} />
                <ExcelColumn label="City" value={'city'} />
                <ExcelColumn label="Division" value={'division'} />
                <ExcelColumn label="Zone" value={'zone'} />
                <ExcelColumn label="Designation" value={'designation'} />
                <ExcelColumn label="Status" value={'status'} />
            </ExcelSheet>
        </ExcelFile>
    );
}
