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
import Input from '@material-ui/core/Input';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from "react-alert";
import axios from 'axios';
import * as Actions from '../../../../config/Store/Actions/territory.action';
import * as TerritoryActions from '../../../../config/Store/Actions/territory.action';
import * as RegionActions from '../../../../config/Store/Actions/region.action';
import * as ZoneActions from '../../../../config/Store/Actions/zone.action';
import * as ProvinceActions from '../../../../config/Store/Actions/provice.action';
import * as CityActions from '../../../../config/Store/Actions/city.action';
import ApiService from '../../../../config/ApiService';

const useStyles = makeStyles({
    root: {
    },
});

function Territory() {
    const classes = useStyles();
    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [abbreviation, setAbbreviation] = useState('');
    const [regionId, setRegionId] = useState('');
    const [provices, setProvinces] = useState([]);
    const [provinceId, setProvinceId] = useState('')
    const [zone, setZones] = useState([]);
    const [zoneId, setZoneId] = useState('')
    const [objectId, setObjectId] = useState('')
    const [selectedData, setSelectedData] = useState(false)
    const [isEditingSelectedData, setIsEditingSelectedData] = useState(false)
    const [addForm, setAddForm] = useState(false);
    const [open, setOpen] = useState(false)
    const [cities, setCities] = useState([]);
    const [cityId, setCityId] = useState([])
    const [tab, setTab] = useState(0);
    const user = useSelector((state) => state.user.user);
    const allRegions = useSelector((state) => state.region.allRegions);
    const allZones = useSelector((state) => state.zone.allZones);
    const allProvinces = useSelector((state) => state.province.allProvinces);
    const allCities = useSelector((state) => state.city.allCities);
    const allTerritory = useSelector((state) => state.territory.allTerritorys);

    useEffect(() => {
        if (!allRegions) {
            dispatch(RegionActions.get_regions())
        }
        if (!allProvinces) {
            dispatch(ProvinceActions.get_province())
        }
        else {
            setProvinces(allProvinces)
        }
        if (!allZones) {
            dispatch(ZoneActions.get_zones())
        }
        else {
            setZones(allZones)
        }
        if (!allCities) {
            dispatch(CityActions.get_cities())
        }
        else {
            setCities(allCities)
        }
        if (!allTerritory) {
            dispatch(TerritoryActions.get_territorys())
        }
    }, [allRegions, allProvinces, allZones, allCities, allTerritory])

    const onChangeRegion = (value) => {

        const arrProvices = [];
        setRegionId(value)

        let obj = {
            objectId: value
        }
        axios.post(ApiService.getBaseUrl() + '/regions/getSpecificRegionById', obj)
            .then((res) => {
                var data = res.data.content[0];
                var provinceId = data.provinceId;
                for (var i = 0; i < provinceId.length; i++) {
                    for (var j = 0; j < allProvinces.length; j++) {
                        if (allProvinces[j]._id === provinceId[i]) {
                            arrProvices.push(allProvinces[j])
                        }
                    }
                }
                setProvinces(arrProvices)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const onChangeProvice = (value) => {
        const arr = [];
        const cityArr = [];
        setProvinceId(value)
        for (var i = 0; i < allZones.length; i++) {
            if (allZones[i].provinceId === value) {
                arr.push(allZones[i])
            }
        }
        for (var i = 0; i < allCities.length; i++) {
            if (allCities[i].provinceId === value) {
                cityArr.push(allCities[i])
            }
        }
        setZones(arr)
        setCities(cityArr)
    }

    const addTerritory = () => {
        setName('')
        setAbbreviation('')
        setRegionId('')
        setZoneId('')
        setObjectId('')
        setProvinces([])
        setProvinceId('')
        setCityId([])
        setZones([])
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
        setZoneId(data.zoneId)
        setObjectId(data._id)
        onChangeRegion(data.regionId)
        setProvinceId(data.provinceId)
        onChangeProvice(data.provinceId)
        setCityId(data.cityId)
        setIsEditingSelectedData(true)
        setAddForm(true)
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
                zoneId,
                provinceId,
                cityId,
                updatedBy: user._id,
                objectId
            }

            dispatch(Actions.update_territory(body))
            alert.success("Territory Updated!");
            addTerritory()
        }
        else {
            if (name !== "" && abbreviation !== "" && regionId !== "" && zoneId !== "" && provinceId !== "" && cityId.length > 0) {
                let obj = {
                    name,
                    abbreviation,
                    regionId,
                    zoneId,
                    provinceId,
                    cityId,
                    createdBy: user._id
                }
                dispatch(Actions.add_territory(obj))
                alert.success("Territory Added!");
                addTerritory()
            }
            else {
                alert.error("All fields are required!");

            }
        }
    }

    const deleteTerritory = () => {
        let body = {
            objectId
        }
        dispatch(TerritoryActions.delete_territory(body))
        addTerritory()
    }

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="javascript:void(0)" onClick={() => { history.push('/dashboard') }}>
                    Home
             </Link>
                <Typography color="textPrimary">Vertical-Settings</Typography>
                <Typography color="textPrimary">Territory</Typography>
            </Breadcrumbs>
            <Card className={classes.root}>
                <CardContent>
                    <FormGridTabs
                        tab={tab}
                        afterRowClick={() => { setTab(0) }}
                        form={
                            <Grid container spacing={3}>
                                <Grid item xs={12} >
                                    <TextField
                                        label="Territory ID"
                                        placeholder="type"
                                        variant="outlined"
                                        disabled
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="regionId">Region ID</InputLabel>
                                        <Select
                                            labelId="regionId"
                                            label="Region ID"
                                            fullWidth
                                            name='regionId'
                                            value={regionId}
                                            disabled={isEditingSelectedData}
                                            onChange={(e) => {
                                                onChangeRegion(e.target.value)
                                            }}
                                        >
                                            {allRegions && allRegions.map((region) => {
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
                                <Grid item xs={12} sm={6}>
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
                                                onChangeProvice(e.target.value)
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
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="zoneId">Zone ID</InputLabel>
                                        <Select
                                            labelId="zoneId"
                                            label="Zone ID"
                                            fullWidth
                                            name='zoneId'
                                            value={zoneId}
                                            disabled={isEditingSelectedData}

                                            onChange={(e) => { setZoneId(e.target.value) }}
                                        >
                                            {zone && zone.map((zone) => {
                                                return (
                                                    <MenuItem key={zone._id} value={zone._id}>
                                                        {zone.name}
                                                    </MenuItem>
                                                )
                                            }
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="cityId">City</InputLabel>
                                        <Select
                                            labelId="cityId"
                                            label="City"
                                            fullWidth
                                            name='cityId'
                                            value={cityId}
                                            multiple
                                            disabled={isEditingSelectedData}
                                            input={<Input
                                                onClick={() => setOpen(!open)} />}
                                            onChange={(e) => {
                                                setCityId(e.target.value)
                                                setOpen(!open)
                                            }}
                                            open={open}
                                        >
                                            {cities && cities.map((city) => {
                                                return (
                                                    <MenuItem key={city._id} value={city._id}>
                                                        {city.name}
                                                    </MenuItem>
                                                )
                                            }
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Territory Name"
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
                                        label="Territory Abbreviation"
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
                                            <Button onClick={addTerritory}><AddIcon style={{ marginRight: "2px" }} /> Add</Button>
                                        }
                                        {!selectedData &&
                                            <Button disabled={selectedData} onClick={() => { handleSave() }}><SaveAltIcon style={{ marginRight: "5px" }} /> Save</Button>
                                        }
                                        {isEditingSelectedData &&
                                            <Button onClick={editData}><EditIcon style={{ marginRight: "5px" }} /> Edit</Button>
                                        }
                                        {isEditingSelectedData &&
                                            <Button onClick={deleteTerritory}><DeleteOutlineIcon style={{ marginRight: "5px" }} /> Delete</Button>
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
                                    rows={allTerritory

                                    } />
                            </div>
                        }
                    />
                </CardContent>
            </Card>
        </>
    )
}

export default Territory