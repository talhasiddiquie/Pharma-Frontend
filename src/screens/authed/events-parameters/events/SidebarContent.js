import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { useDispatch, useSelector } from 'react-redux';
import * as DocsActions from '../../../../config/Store/Actions/doctor.action';
import * as WorkPlanActions from '../../../../config/Store/Actions/workPlan.action';
import * as CityActions from '../../../../config/Store/Actions/city.action';

const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);
export default function SidebarContent({ AddToCalender }) {
    const [expanded, setExpanded] = React.useState('panel1');
    const dispatch = useDispatch();
    const [t1Doctors, setT1Doctors] = React.useState([])
    const [t2Doctors, setT2Doctors] = React.useState([])
    const [t3Doctors, setT3Doctors] = React.useState([])
    const [cityName, setCityName] = React.useState('')
    const user = useSelector((state) => state.user.user);
    const allCities = useSelector((state) => state.city.allCities);
    const cityDoctors = useSelector((state) => state.doctor.cityDoctors);
    const doctorEVentCount = useSelector((state) => state.workPlan.countDocs);
    const [refresh, setRefresh] = useState(false);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        if (!refresh) {
            if (cityDoctors) {
                dispatch(DocsActions.get_city_doctor());
            }
        }
        else {
            doctorTier()
        }

        if (!allCities) {
            dispatch(CityActions.get_cities());
        }
        if (!doctorEVentCount) {
            dispatch(WorkPlanActions.count_doctor_workPlan())
            doctorTier()
        }

    }, [cityDoctors, doctorEVentCount])
    
    const handleCityInputChange = (value) => {
        setT1Doctors(t1Doctors => [])
        setT2Doctors(t2Doctors => [])
        setT3Doctors(t3Doctors => [])
        if (value !== null) {
            setCityName(value.name)
            let obj = {
                objectId: value._id
            }

            dispatch(DocsActions.get_city_doctor(obj))
            dispatch(WorkPlanActions.count_doctor_workPlan())
            setRefresh(true)
        }
        else {
            setT1Doctors(t1Doctors => [])
            setT2Doctors(t2Doctors => [])
            setT3Doctors(t3Doctors => [])
        }
    }



    const doctorTier = () => {
        const t1Docs = [];
        const t2Docs = [];
        const t3Docs = [];

        var month = moment().format("M")
        cityDoctors && cityDoctors.map((item, index) => {
            doctorEVentCount && doctorEVentCount.map((countEvent, key) => {
                if (user._id === countEvent._id) {
                    const doctors = countEvent.data;
                    var count = 0;
                    for (var key in doctors) {
                        if (doctors[key].doctor_id === item._id) {
                            if (moment(doctors[key].start).format('M') === month) {
                                count = count + 1
                            }
                        }
                    }
                    item.count = count
                }
            })
        })

        cityDoctors && cityDoctors.map((item, index) => {
            if (item.representativeId === user._id) {
                if (item.tierId === "T1") {
                    t1Docs.push(item);
                }
                else if (item.tierId === "T2") {
                    t2Docs.push(item);

                }
                else if (item.tierId === "T3") {
                    t3Docs.push(item);

                }
            }
        })
        setT1Doctors(t1Docs)
        setT2Doctors(t2Docs)
        setT3Doctors(t3Docs)
    }

    return (
        <div>
            {
                allCities &&
                <Autocomplete
                    id="filled-textarea"
                    label="Select City"
                    onChange={(e, value) => handleCityInputChange(value)}
                    options={allCities}
                    getOptionLabel={(option) =>
                        option.name
                    }
                    style={{ margin: "14px auto" }}
                    renderInput={(params) =>
                        <TextField {...params} label="City" variant="outlined" />}
                />
            }
            <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
                    <Typography>Tier 1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {t1Doctors.length > 0 &&
                        <List>

                            {t1Doctors.map((item, index) => [
                                <ListItem
                                    button
                                    onClick={() => {
                                        AddToCalender(item, cityName)
                                    }}
                                >
                                    <ListItemText
                                        primary={item.name}
                                    />
                                    <ListItemSecondaryAction>
                                        <ListItemIcon edge="end01" aria-label="delete01">
                                            {item.count}
                                        </ListItemIcon>
                                    </ListItemSecondaryAction>

                                </ListItem>
                            ])}
                        </List>

                    }
                </AccordionDetails>
            </Accordion>
            <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" expandIcon={<ExpandMoreIcon />}>
                    <Typography>Tier 2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {t2Doctors.length > 0 &&
                        <List>
                            {t2Doctors.map((item, index) => [
                                <ListItem
                                    button
                                    onClick={() => {
                                        AddToCalender(item, cityName)
                                    }}
                                >
                                    <ListItemText
                                        primary={item.name}
                                    />
                                    <ListItemSecondaryAction>
                                        <ListItemIcon edge="end02" aria-label="delete02">
                                            {item.count}
                                        </ListItemIcon>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ])}
                        </List>
                    }
                </AccordionDetails>
            </Accordion>
            <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" expandIcon={<ExpandMoreIcon />}>
                    <Typography>Tier 3</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {t3Doctors.length > 0 &&
                        <List>
                            {t3Doctors.map((item, index) => [
                                <ListItem
                                    button
                                    onClick={() => {
                                        AddToCalender(item, cityName)
                                    }}
                                >
                                    <ListItemText
                                        primary={item.name}
                                    />
                                    <ListItemSecondaryAction>
                                        <ListItemIcon edge="end03" aria-label="delete03">
                                            {item.count}
                                        </ListItemIcon>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ])}
                        </List>
                    }
                </AccordionDetails>
            </Accordion>
        </div>
    );
}