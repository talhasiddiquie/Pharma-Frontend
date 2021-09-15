import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CardActionArea from '@material-ui/core/CardActionArea';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Scrollbars } from 'react-custom-scrollbars';
import { Radio, Checkbox, Row, Col } from 'antd';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import FileViewer from 'react-file-viewer';
import axios from 'axios';
import Modal from '../../../components/Modal/Modal';
import ApiServices from '../../../../config/ApiService';
import * as ActionsPlan from '../../../../config/Store/Actions/workPlan.action';
import * as MeetingAction from '../../../../config/Store/Actions/meetingInitiator.action';

var todayDate = new Date();
todayDate = moment(todayDate).format('DD-MM-YYYY')

const useStyles = makeStyles({
    root: {

    },
    filenames: {
        padding: '0.5% 0%'
    },
    imageThumbnail: {
        width: "70px",
        height: "70px"
    },
    media: {
        maxWidth: "100%",
        height: "100%",
        transform: 'translate(0px, 25px)'
    },
});
const CheckboxGroup = Checkbox.Group;


function MeetingChamber() {
    const location = useLocation();
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user);
    const [timer, setTimer] = useState(0)
    const countRef = useRef(null)
    const [previewFile, setPreviewFile] = useState('')
    const [openDialog, setOpenDialog] = useState(false)
    const [totalFiles, setTotalFiles] = useState(0)
    const [meetingData, setMeetingData] = useState('')
    const [filesAndSurvey, setFilesAndSurvey] = useState('')
    const [checkInTime, setCheckInTime] = useState('');
    const [visitDate, setVisitDate] = useState('');
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        handleStart()
    })

    useEffect(async () => {
        if (!refresh) {

            var hours = new Date().getHours();
            var minutes = new Date().getMinutes();
            var format = ''
            if (hours > 12) {
                format = "PM"
                hours = Number(hours) - 12
            }
            else if (hours === 12) {
                format = "PM";
            }
            else {
                format = "AM"
            }
            var startTime = hours + ":" + minutes + " " + format;
            setCheckInTime(startTime)
            setVisitDate(todayDate)

            var meetingId = location.state;
            if (meetingId) {
                let obj = {
                    objectId: meetingId
                }
                await axios.post(ApiServices.getBaseUrl() + '/workPlans/getSpecificWorkPlanByUserId', obj)
                    .then((res) => {
                        var data = res.data.content[0];
                        const filesAndSurvey = data.filesAndSurvey;
                        const totalFiles = data.filesAndSurvey.length;
                        setMeetingData(data)
                        setFilesAndSurvey(filesAndSurvey)
                        setTotalFiles(totalFiles)
                    })
                    .catch((error) => {
                        console.log(error, 'error')
                    })
                setRefresh(true)
            }
            else {
                meetingId = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);
                let obj = {
                    objectId: meetingId
                }
                await axios.post(ApiServices.getBaseUrl() + '/workPlans/getSpecificWorkPlanByUserId', obj)
                    .then((res) => {
                        var data = res.data.content[0];
                        const filesAndSurvey = data.filesAndSurvey;
                        const totalFiles = data.filesAndSurvey.length;
                        setMeetingData(data)
                        setFilesAndSurvey(filesAndSurvey)
                        setTotalFiles(totalFiles)
                    })
                    .catch((error) => {
                        console.log(error, 'error')
                    })
                setRefresh(true)
            }
        }
    }, [])

    const handleStart = () => {
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)
    }

    const formatTime = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
        clearInterval(countRef.current);
        return `${getHours} : ${getMinutes} : ${getSeconds}`
    }

    const handleChangeAnswer = (event, index, id) => {
        var arr = [];
        var answerSurvey = [...filesAndSurvey]
        for (var key in answerSurvey) {
            var survey = { ...answerSurvey[key] };
            if (survey.objectId === id) {
                var surveyQuestionAns = survey.questionsAnswers
                surveyQuestionAns[`answer${index}`] = event;

            }
            arr.push(survey)
        }
        setFilesAndSurvey(arr)
    }

    const endMeeting = () => {
        var hours = new Date().getHours();
        var minutess = new Date().getMinutes();
        var format = ''
        if (hours > 12) {
            format = "PM"
            hours = Number(hours) - 12
        }
        else if (hours === 12) {
            format = "PM";
        }
        else {
            format = "AM"
        }

        const getSeconds = `0${(timer % 60)}`.slice(-2);
        const minutes = `${Math.floor(timer / 60)}`;
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
        var meetingDuration = `${getHours} : ${getMinutes} : ${getSeconds}`;
        meetingData.seconds = getSeconds;
        meetingData.minutes = getMinutes;
        meetingData.hours = getHours;
        meetingData.meetingDuration = meetingDuration;
        meetingData.filesAndSurvey = filesAndSurvey;
        meetingData.createdBy = user._id;
        meetingData.checkInTime = checkInTime;
        meetingData.visitDate = visitDate;

        var checkOutTime = hours + ":" + minutess + " " + format;
        meetingData.checkOutTime = checkOutTime;

        let obj = {
            statusEvent: 'close',
            objectId: meetingData._id,
        }
        dispatch(ActionsPlan.update_workPlan(obj));
        dispatch(MeetingAction.add_meeting_initiate(meetingData))
        history.push('/dashboard');
    }

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="javascript:void(0)" onClick={() => { history.push('/dashboard') }}>
                    Home
             </Link>
                <Typography color="textPrimary">Meetings-Parameters</Typography>
                <Typography color="textPrimary">Chamber-Meeting</Typography>
            </Breadcrumbs>
            <Modal
                open={openDialog}
                previewFile={previewFile}
                close={() => { setOpenDialog(false) }}
            />
            <Card className={classes.root}>
                <CardContent>
                    <p>{formatTime()}</p>
                    {filesAndSurvey && filesAndSurvey.length > 0 ? <CarouselProvider
                        naturalSlideWidth={400}
                        naturalSlideHeight={450}
                        totalSlides={totalFiles}
                    >
                        <Grid style={{ textAlign: 'center' }} container direction="row" justify="center" alignItems="center" spacing={2}>
                            <Grid item sm={2} style={{ textAlign: "initial" }}><ButtonBack ><ArrowBackIosIcon style={{ fontSize: 'xxx-large' }} /></ButtonBack></Grid>
                            <Grid item sm={8} >
                                <Slider>

                                    {meetingData && filesAndSurvey && filesAndSurvey.map((elem, key) => {
                                        return (
                                            <Slide index={key}>
                                                <div>
                                                    {elem.filedType === "product" ?
                                                        <Grid item sm={12} style={{ textAlign: '-webkit-center' }}>
                                                            <CarouselProvider
                                                                naturalSlideWidth={300}
                                                                naturalSlideHeight={350}
                                                                totalSlides={elem.files.length}
                                                            >
                                                                <Grid item sm={2}><ButtonBack>&#8592;</ButtonBack></Grid>
                                                                <Grid item sm={10}>
                                                                    <Slider>
                                                                        {elem.files.map((ele, k) => {
                                                                            var fileTypes = ele.fileName.substring(ele.fileName.lastIndexOf('.') + 1, ele.fileName.length);
                                                                            return (
                                                                                <Slide index={k}>
                                                                                    <Grid item xs={12} >
                                                                                        <DialogTitle id="alert-dialog-title">
                                                                                            <AppBar position="static">
                                                                                                <Toolbar>
                                                                                                    <Typography variant="h6">
                                                                                                        Files Preview
                                                                                                </Typography>
                                                                                                </Toolbar>
                                                                                            </AppBar>
                                                                                        </DialogTitle>
                                                                                        <div style={{ textAlign: 'left' }}>
                                                                                            {fileTypes === 'gif' || fileTypes === 'jpg' || fileTypes === 'png' || fileTypes === 'webp' ?
                                                                                                <Card className={classes.media}>
                                                                                                    <CardActionArea>
                                                                                                        <CardMedia
                                                                                                            component="img"
                                                                                                            alt="Product Image"
                                                                                                            src={ApiServices.getBaseUrl() + `/uploads/${ele.fileName}`}
                                                                                                            title="Product Image"
                                                                                                        />
                                                                                                    </CardActionArea>
                                                                                                </Card>
                                                                                                :
                                                                                                <div style={{ transform: 'translate(0px, 25px)' }}>
                                                                                                    <Scrollbars style={{ width: 705, height: 650 }}>
                                                                                                        <FileViewer
                                                                                                            fileType={fileTypes}
                                                                                                            filePath={ApiServices.getBaseUrl() + `/uploads/${ele.fileName}`}
                                                                                                        />
                                                                                                    </Scrollbars>
                                                                                                </div>
                                                                                            }
                                                                                        </div>
                                                                                    </Grid>
                                                                                </Slide>
                                                                            )
                                                                        })}
                                                                    </Slider>
                                                                </Grid>
                                                                <Grid item sm={2}><ButtonNext>&#8594;</ButtonNext></Grid>
                                                            </CarouselProvider>
                                                        </Grid>
                                                        :
                                                        elem.filedType === "survey" ?
                                                            <Grid item sm={12} style={{ textAlign: '-webkit-center', }}>
                                                                <CarouselProvider
                                                                    naturalSlideWidth={80}
                                                                    naturalSlideHeight={50}
                                                                    totalSlides={elem.questionsNo.length}
                                                                >
                                                                    <Grid item sm={2}><ButtonBack>&#8592;</ButtonBack></Grid>
                                                                    <Grid item sm={8}>
                                                                        <Slider>
                                                                            {elem.questionsNo.map((el, index) => {
                                                                                return (
                                                                                    <Slide index={index}>
                                                                                        <div style={{
                                                                                            display: 'grid',
                                                                                            margin: '5px',
                                                                                            textAlign: 'left',
                                                                                            justifyContent: 'center'
                                                                                        }}>
                                                                                            <div style={{
                                                                                                margin: '5px',
                                                                                            }}>
                                                                                                {elem.name}
                                                                                            </div>
                                                                                            <div style={{
                                                                                                margin: '5px',
                                                                                            }}> {`Question No ${el + 1}`}</div>

                                                                                            <div style={{
                                                                                                margin: '5px',
                                                                                            }}> {`${elem.questionsAnswers[`question${el}`]}`}</div>
                                                                                            <div style={{
                                                                                                margin: '5px',
                                                                                            }}>
                                                                                                {<FormLabel component="legend" key={index} >Answer</FormLabel>}
                                                                                            </div>
                                                                                            <div style={{
                                                                                                display: 'flex',
                                                                                                marginLeft: '10px',
                                                                                            }}>
                                                                                                {
                                                                                                    elem.questionsAnswers[`answerFormat${index}`] === `radio` &&
                                                                                                    elem.questionsAnswers[`answerOption${index}`] &&
                                                                                                    elem.questionsAnswers[`answerOption${index}`].map((ans, key) => {
                                                                                                        return (
                                                                                                            <Radio.Group
                                                                                                                value={elem.questionsAnswers[`answer${index}`]}
                                                                                                                onChange={(event) => { handleChangeAnswer(event.target.value, index, elem.objectId) }}
                                                                                                            >
                                                                                                                <Row>
                                                                                                                    <Col>
                                                                                                                        <Radio
                                                                                                                            value={ans}>
                                                                                                                            {ans}
                                                                                                                        </Radio>
                                                                                                                    </Col>
                                                                                                                </Row>
                                                                                                            </Radio.Group>
                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </div>
                                                                                            <div style={{
                                                                                                display: 'flex',
                                                                                                marginLeft: '10px',
                                                                                            }}>
                                                                                                {
                                                                                                    elem.questionsAnswers[`answerFormat${index}`] === "textBox" &&
                                                                                                    <TextField
                                                                                                        label="Free Text Box"
                                                                                                        variant="outlined"
                                                                                                        fullWidth
                                                                                                    />
                                                                                                }
                                                                                            </div>
                                                                                            <div style={{
                                                                                                display: 'flex',
                                                                                                marginLeft: '10px',
                                                                                            }}>
                                                                                                {
                                                                                                    elem.questionsAnswers[`answerFormat${index}`] === `checkboxes` &&
                                                                                                    elem.questionsAnswers[`answerOption${index}`] &&
                                                                                                    elem.questionsAnswers[`answerOption${index}`].map((ans, key) => {
                                                                                                        return (
                                                                                                            <FormGroup>
                                                                                                                <CheckboxGroup style={{ width: '100%' }}
                                                                                                                    value={elem.questionsAnswers[`answer${index}`]}
                                                                                                                    onChange={(e) => { handleChangeAnswer(e, index, elem.objectId) }}
                                                                                                                >
                                                                                                                    <Row>
                                                                                                                        <Checkbox
                                                                                                                            value={ans}
                                                                                                                        >{ans}</Checkbox>
                                                                                                                    </Row>
                                                                                                                </CheckboxGroup>
                                                                                                            </FormGroup>
                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </div>
                                                                                            <div style={{
                                                                                                display: 'flex',
                                                                                                marginLeft: '10px',
                                                                                            }}>
                                                                                                {
                                                                                                    elem.questionsAnswers[`answerFormat${index}`] === `dropdown` &&
                                                                                                    elem.questionsAnswers[`answerOption${index}`] &&
                                                                                                    <Select
                                                                                                        labelId="answer"
                                                                                                        label="Anwer"
                                                                                                        fullWidth
                                                                                                        value={elem.questionsAnswers[`answer${index}`]}
                                                                                                        onChange={(event) => { handleChangeAnswer(event.target.value, index, elem.objectId) }}
                                                                                                    >
                                                                                                        {elem.questionsAnswers[`answerOption${index}`].map((ans, key) => {
                                                                                                            return (
                                                                                                                <MenuItem key={key} value={ans}>
                                                                                                                    {ans}
                                                                                                                    <Button
                                                                                                                    >
                                                                                                                    </Button>
                                                                                                                </MenuItem>
                                                                                                            )
                                                                                                        }
                                                                                                        )}
                                                                                                    </Select>
                                                                                                }
                                                                                            </div>
                                                                                            <div style={{
                                                                                                display: 'flex',
                                                                                                marginLeft: '10px',
                                                                                            }}>
                                                                                                {
                                                                                                    elem.questionsAnswers[`answerFormat${index}`] === "link" &&
                                                                                                    elem.questionsAnswers[`answerOption${index}`] &&
                                                                                                    elem.questionsAnswers[`answerOption${index}`].map((ans, key) => {
                                                                                                        return (
                                                                                                            <FormGroup>
                                                                                                                <Checkbox.Group style={{ width: '100%' }}
                                                                                                                    value={elem.questionsAnswers[`answer${index}`]}
                                                                                                                    onChange={(event) => { handleChangeAnswer(event, index, elem.objectId) }}
                                                                                                                >
                                                                                                                    <Row>
                                                                                                                        <Checkbox
                                                                                                                            value={ans}
                                                                                                                        >{ans}
                                                                                                                        </Checkbox>
                                                                                                                    </Row>
                                                                                                                </Checkbox.Group>
                                                                                                            </FormGroup>
                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </div>
                                                                                        </div>
                                                                                    </Slide>
                                                                                )
                                                                            })}
                                                                        </Slider>
                                                                    </Grid>
                                                                    <Grid item sm={2}><ButtonNext>&#8594;</ButtonNext></Grid>
                                                                </CarouselProvider>
                                                            </Grid>
                                                            :
                                                            null}
                                                </div>
                                            </Slide>
                                        )
                                    })}
                                </Slider>
                            </Grid>
                            <Grid item sm={2} style={{ textAlign: "end" }}><ButtonNext ><ArrowForwardIosIcon style={{ fontSize: 'xxx-large' }} /></ButtonNext></Grid>
                        </Grid>
                    </CarouselProvider>
                        : <div>
                            <span>Meeting Start You have not select any product or survey</span>
                        </div>
                    }


                    <div
                        style={{ textAlign: 'right' }}>
                        <Button onClick={endMeeting} variant="contained" color="secondary" size={'large'}>End Meeting</Button>

                    </div>
                </CardContent>
            </Card >
        </>
    )
}

export default MeetingChamber