import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormGridTabs from '../../../components/Tabs/Form-Grid-Tabs'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import GridTable from '../../../components/GridTable/grid-table';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../../config/Store/Actions/zone.action';
import { useAlert } from "react-alert";
import * as ZoneActions from '../../../../config/Store/Actions/zone.action';
import * as RegionActions from '../../../../config/Store/Actions/region.action';
import * as ProvinceActions from '../../../../config/Store/Actions/provice.action';
import axios from 'axios';
import ApiService from '../../../../config/ApiService';

const useStyles = makeStyles({
    root: {
        // padding: 14
    },
});

const initialState = {
    identifier: '',
    name: '',
    abbreviation: '',
    regionId: ''
};


function Zonea() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [name, setName] = useState('')
    const [abbreviation, setAbbreviation] = useState('');
    const [regionId, setRegionId] = useState('')
    const [provinceId, setProvinceId] = useState('')
    const [provices, setProvices] = useState([])
    const [objectId, setObjectId] = useState('')
    const [selectedData, setSelectedData] = useState(false)
    const [isEditingSelectedData, setIsEditingSelectedData] = useState(false)
    const [addForm, setAddForm] = useState(false);
    const [tab, setTab] = useState(0);
    const user = useSelector((state) => state.user.user);
    const allZone = useSelector((state) => state.zone.allZones);
    const allRegion = useSelector((state) => state.region.allRegions);
    const allProvinces = useSelector((state) => state.province.allProvinces);

    useEffect(() => {
        if (!allRegion) {
            dispatch(RegionActions.get_regions())
        }
        if (!allProvinces) {
            dispatch(ProvinceActions.get_province())
        }
        else {
            setProvices(allProvinces)
        }
        if (!allZone) {
            dispatch(ZoneActions.get_zones())
        }
    }, [allRegion, allProvinces, allZone])


    const onChangeRegion = (value) => {
        const arr = [];
        setRegionId(value)
        let obj = {
            objectId: value
        }

        axios.post(ApiService.getBaseUrl() + '/regions/getSpecificRegionById', obj)
            .then((res) => {
                var data = res.data.content[0];
                // setProvinceId(data.provinceId)
                var provinceId = data.provinceId;
                for (var i = 0; i < provinceId.length; i++) {
                    for (var j = 0; j < allProvinces.length; j++) {
                        if (allProvinces[j]._id === provinceId[i]) {
                            arr.push(allProvinces[j])
                        }
                    }
                }
                setProvices(arr)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const addZone = () => {
        setName('')
        setAbbreviation('')
        setRegionId('')
        setProvinceId('')
        setProvices([])
        setObjectId('')
        setTab(0)
        setSelectedData(false)
        setIsEditingSelectedData(false)
        setAddForm(false)
    };

    function handleRowClick(data) {
        setTab(1)
        setSelectedData(true)
        setName(data.name)
        setAbbreviation(data.abbreviation)
        setRegionId(data.regionId)
        setProvinceId(data.provinceId)
        setObjectId(data._id)
        setIsEditingSelectedData(true)
        setAddForm(true)
        onChangeRegion(data.regionId)
    }

    const editData = () => {
        setIsEditingSelectedData(false)
        setSelectedData(false)
        setAddForm(true)
    }

    function handleSave() {
        if (objectId !== "") {
            const body = {
                name,
                abbreviation,
                regionId,
                provinceId,
                updatedBy: user._id,
                objectId
            }
            dispatch(Actions.update_zone(body))
            setSelectedData(false)
            alert.success("Zone Updated!");
            addZone()
        }
        else {
            const formdata = {
                name,
                abbreviation,
                regionId,
                provinceId,
            }
            if (name !== "" && abbreviation !== "" && regionId && provinceId !== "") {
                let obj = {
                    ...formdata,
                    createdBy: user._id
                }
                dispatch(Actions.add_zone(obj))
                alert.success("Zone Added!")
                addZone()
            }
            else {
                alert.error("All fields are required!")
            }
        }
    }

    const deleteZone = () => {
        let body = {
            objectId
        }
        dispatch(ZoneActions.delete_zone(body))
        addZone()
    }

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="javascript:void(0)" onClick={() => { history.push('/dashboard') }}>
                    Home
             </Link>
                <Typography color="textPrimary">Vertical-Settings</Typography>
                <Typography color="textPrimary">Zone</Typography>
            </Breadcrumbs>
            <Card className={classes.root}>
                <CardContent>
                    <FormGridTabs
                        tab={tab}
                        afterRowClick={() => { setTab(0) }}
                        form={

                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Zone ID"
                                        placeholder="type"
                                        variant="outlined"
                                        disabled
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>

                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="regionId">Region ID</InputLabel>
                                        <Select
                                            disabled={isEditingSelectedData}
                                            labelId="regionId"
                                            label="Region ID"
                                            fullWidth
                                            name='regionId'
                                            value={regionId}
                                            onChange={(e) => {
                                                onChangeRegion(e.target.value)
                                            }}
                                        >
                                            {allRegion && allRegion.map((region) => {
                                                return (
                                                    <MenuItem key={region._id} value={region._id}>
                                                        {region.name}
                                                    </MenuItem>
                                                )
                                            }
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="provinceId">Province ID</InputLabel>
                                        <Select
                                            labelId="provinceId"
                                            label="Province ID"
                                            fullWidth
                                            name='provinceId'
                                            value={provinceId}
                                            disabled={isEditingSelectedData}
                                            onChange={(e) => {
                                                setProvinceId(e.target.value)
                                            }}
                                        >
                                            {provices && provices.map((province) => {
                                                return (
                                                    <MenuItem key={province._id} value={province._id}>
                                                        {province.name}
                                                    </MenuItem>
                                                )
                                            }
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>


                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Zone Name"
                                        placeholder="type"
                                        variant="outlined"
                                        fullWidth
                                        name='name'
                                        value={name}
                                        disabled={isEditingSelectedData}
                                        onChange={(e) => { setName(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Zone Abbreviation"
                                        placeholder="type"
                                        variant="outlined"
                                        fullWidth
                                        name='abbreviation'
                                        value={abbreviation}
                                        disabled={isEditingSelectedData}
                                        onChange={(e) => { setAbbreviation(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ButtonGroup variant="contained" color="secondary" size={'large'}>
                                        {addForm &&
                                            <Button onClick={addZone}><AddIcon style={{ marginRight: "2px" }} /> Add</Button>
                                        }
                                        {!selectedData &&
                                            <Button disabled={selectedData} onClick={() => { handleSave() }}><SaveAltIcon style={{ marginRight: "5px" }} /> Save</Button>
                                        }
                                        {isEditingSelectedData &&
                                            <Button onClick={editData}><EditIcon style={{ marginRight: "5px" }} /> Edit</Button>
                                        }
                                        {isEditingSelectedData &&
                                            <Button onClick={deleteZone}><DeleteOutlineIcon style={{ marginRight: "5px" }} /> Delete</Button>
                                        }
                                    </ButtonGroup>
                                </Grid>

                            </Grid>
                        }
                        grid={
                            <div>
                                <GridTable
                                    onRowClick={(data) => { handleRowClick(data) }}

                                    headCells={
                                        [
                                            { id: 'name', label: 'Name' },
                                            { id: 'abbreviation', label: 'Abbreviation' },
                                        ]
                                    }
                                    rows={allZone

                                    } />
                            </div>
                        }
                    />
                </CardContent>
            </Card>
        </>
    )
}

export default Zonea