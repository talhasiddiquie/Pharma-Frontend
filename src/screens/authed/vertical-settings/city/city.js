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
import { useAlert } from "react-alert";
import axios from 'axios';
import * as CityActions from '../../../../config/Store/Actions/city.action';
import * as RegionActions from '../../../../config/Store/Actions/region.action';
import * as ProvinceActions from '../../../../config/Store/Actions/provice.action';
import ApiService from '../../../../config/ApiService';

const useStyles = makeStyles({
    root: {
    },
});

function City() {
    const classes = useStyles();
    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [abbreviation, setAbbreviation] = useState('');
    const [regionId, setRegionId] = useState('')
    const [objectId, setObjectId] = useState('')
    const [provices, setProvinces] = useState([]);
    const [provinceId, setProvinceId] = useState('')
    const [selectedData, setSelectedData] = useState(false)
    const [isEditingSelectedData, setIsEditingSelectedData] = useState(false)
    const [addForm, setAddForm] = useState(false);
    const [tab, setTab] = useState(0);
    const user = useSelector((state) => state.user.user);
    const allRegions = useSelector((state) => state.region.allRegions);
    const allcities = useSelector((state) => state.city.allCities);
    const allProvinces = useSelector((state) => state.province.allProvinces);

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
        if (!allcities) {
            dispatch(CityActions.get_cities())
        }
    }, [allRegions, allProvinces, allcities])


    const onChangeRegion = (value) => {
        const arrProvices = [];
        setRegionId(value);

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

    const addCity = () => {
        setName('')
        setAbbreviation('')
        setRegionId('')
        setObjectId('')
        setProvinces([])
        setProvinceId('')
        setTab(0)
        setSelectedData(false)
        setIsEditingSelectedData(false)
        setAddForm(false)
    };

    const editData = () => {
        setIsEditingSelectedData(false)
        setSelectedData(false)
        setAddForm(true)
    }

    function handleRowClick(data) {
        setTab(1)
        setSelectedData(true)
        setName(data.name)
        setAbbreviation(data.abbreviation)
        setRegionId(data.regionId)
        setObjectId(data._id)
        onChangeRegion(data.regionId)
        setProvinceId(data.provinceId)
        setIsEditingSelectedData(true)
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
            dispatch(CityActions.update_city(body))
            alert.success("City Updated!");
            addCity()
        }
        else {
            if (name !== "" && abbreviation !== "" && regionId !== "" && provinceId !== "") {
                let obj = {
                    name,
                    abbreviation,
                    regionId,
                    provinceId,
                    createdBy: user._id
                }

                dispatch(CityActions.add_city(obj))
                alert.success("City Added!");
                addCity()
            }
            else {
                alert.error("All fields are required!");

            }
        }

    }

    const deleteCity = () => {
        let body = {
            objectId
        }

        dispatch(CityActions.delete_city(body))
        addCity()
    }



    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="javascript:void(0)" onClick={() => { history.push('/dashboard') }}>
                    Home
             </Link>
                <Typography color="textPrimary">Vertical-Settings</Typography>
                <Typography color="textPrimary">City</Typography>
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
                                        label="City ID"
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
                                            disabled={isEditingSelectedData}
                                            fullWidth
                                            name='regionId'
                                            value={regionId}
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
                                        label="City Name"
                                        placeholder="type"
                                        variant="outlined"
                                        fullWidth
                                        name='name'
                                        disabled={isEditingSelectedData}
                                        value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="City Abbreviation"
                                        placeholder="type"
                                        variant="outlined"
                                        fullWidth
                                        name='abbreviation'
                                        disabled={isEditingSelectedData}
                                        value={abbreviation}
                                        onChange={(e) => { setAbbreviation(e.target.value) }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <ButtonGroup variant="contained" color="secondary" size={'large'}>

                                        {addForm &&
                                            <Button onClick={addCity}><AddIcon style={{ marginRight: "2px" }} /> Add</Button>
                                        }
                                        {!selectedData &&
                                            <Button disabled={selectedData} onClick={() => { handleSave() }}><SaveAltIcon style={{ marginRight: "5px" }} /> Save</Button>
                                        }
                                        {isEditingSelectedData &&
                                            <Button onClick={editData}><EditIcon style={{ marginRight: "5px" }} /> Edit</Button>
                                        }
                                        {isEditingSelectedData &&
                                            <Button onClick={deleteCity}><DeleteOutlineIcon style={{ marginRight: "5px" }} /> Delete</Button>
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
                                    rows={allcities} />
                            </div>
                        }
                    />
                </CardContent>
            </Card>
        </>
    )
}

export default City