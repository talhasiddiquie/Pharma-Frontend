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
            <ExcelSheet data={props.data} name="KPI Report">
                <ExcelColumn label="Territory" value={'territory'} />
                <ExcelColumn label="Zone" value={'zone'} />
                <ExcelColumn label="Employee Name" value={'employeeName'} />
                <ExcelColumn label="FLM Name" value={'managerName'} />
                <ExcelColumn label="T1" value={'t1TargetDocs'} />
                <ExcelColumn label="T2" value={'t2TargetDocs'} />
                <ExcelColumn label="T3" value={'t3TargetDocs'} />
                <ExcelColumn label="Total" value={'totalTargetDocs'} />
                <ExcelColumn label="T1" value={'t1CoverDocs'} />
                <ExcelColumn label="T2" value={'t2CoverDocs'} />
                <ExcelColumn label="T3" value={'t3CoverDocs'} />
                <ExcelColumn label="Total" value={'totalCoverDocs'} />
                <ExcelColumn label="T1" value={'t1CoverDocsPer'} />
                <ExcelColumn label="T2" value={'t2CoverDocsPer'} />
                <ExcelColumn label="T3" value={'t3CoverDocsPer'} />
                <ExcelColumn label="Total" value={'totalCoverDocsPer'} />
                <ExcelColumn label="T1" value={'t1CallsDocs'} />
                <ExcelColumn label="T2" value={'t2CallsDocs'} />
                <ExcelColumn label="T3" value={'t3CallsDocs'} />
                <ExcelColumn label="Total" value={'totalCallsDocs'} />
                <ExcelColumn label="T1" value={'t1CPACallPer'} />
                <ExcelColumn label="T2" value={'t2CPACallPer'} />
                <ExcelColumn label="T3" value={'t3CPACallPer'} />
                <ExcelColumn label="Daily Call Average" value={'dailyCallAverage'} />
                <ExcelColumn label="Joined Visit Call" value={'jionVisitCall'} />
            </ExcelSheet>
        </ExcelFile>
    );
}
