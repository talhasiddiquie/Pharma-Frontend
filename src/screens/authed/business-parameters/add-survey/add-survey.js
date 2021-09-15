import { Radio, Checkbox, Row, Col } from 'antd';
import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import FormGridTabs from '../../../components/Tabs/Form-Grid-Tabs'
import GridTable from '../../../components/GridTable/grid-table';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from "react-alert";
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioBtn from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import * as SurveyActions from '../../../../config/Store/Actions/survey.action';

const useStyles = makeStyles({
    root: {
        // padding: 14
    },
});

function AddSurvey() {
    const classes = useStyles();
    const history = useHistory();
    const [tab, setTab] = useState(0);
    const [resestForm, setAddForm] = useState(false);
    const [selectedData, setSelectedData] = useState(false);
    const [isEditingSelectedData, setIsEditingSelectedData] = useState(false);
    const dispatch = useDispatch();
    const alert = useAlert();
    const [name, setName] = useState('');
    const [identifier, setIdentifier] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [keys, setKeys] = useState([0]);
    const [questionsAnswerObj, setQuestionsAnswerObj] = useState({});
    const [answerOption, setAnswerOption] = useState('');
    const [questionAnsOptionsArr, setQuestionAnsOptionsArr] = useState([]);
    const [objectId, setobjectId] = useState('')
    const [showInputForAdd, setShowInputForAdd] = useState(false);
    const [index, setIndex] = useState(0)
    const allSurvey = useSelector((state) => state.survey.allSurvey);
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        if (!allSurvey) {
            dispatch(SurveyActions.get_all_surveys())
        }
    }, [allSurvey])

    function handleRowClick(data) {
        setTab(1)
        setSelectedData(true)
        setName(data.name)
        setDocumentType(data.documentType)
        setKeys(data.keys)
        setQuestionsAnswerObj(data.questionsAnswerObj)
        setQuestionAnsOptionsArr(data.questionAnsOptionsArr)
        setShowInputForAdd(true)
        setobjectId(data._id)
        setIsEditingSelectedData(true)
        setAddForm(true)
    }


    const handleAdd = () => {
        setName('')
        setDocumentType('')
        setKeys([0])
        setQuestionsAnswerObj({})
        setAnswerOption('')
        setQuestionAnsOptionsArr([])
        setShowInputForAdd(false)
        setTab(0)
        setSelectedData(false)
        setSelectedData(false)
        setIsEditingSelectedData(false)
        setAddForm(false)
        setobjectId('')
    }

    const editData = () => {
        setIsEditingSelectedData(false)
        setSelectedData(false)
        setAddForm(true)
    }


    function handleSave() {
        const body = {
            name,
            identifier,
            documentType,
            keys,
            questionsAnswerObj,
            questionAnsOptionsArr,
            objectId
        }
        if (objectId !== "") {
            body.objectId = objectId;
            body.updatedBy = user._id;
            dispatch(SurveyActions.update_survey(body))
            alert.success("Question Updated!");
            handleAdd()
        }
        else {
            body.createdBy = user._id;
            if (name !== "" && documentType !== "" && questionAnsOptionsArr.length > 0) {
                dispatch(SurveyActions.add_survey(body))
                alert.success("Question Added!")
                handleAdd()
            }
            else {
                alert.error("All fields are required!")
            }
        }

    }

    const deleteSurvey = () => {
        let body = {
            objectId
        }
        dispatch(SurveyActions.delete_survey(body))
        handleAdd()
    }




    const addForm = () => {
        const arr = [...keys];
        const val = arr.length;
        arr.push(val);
        setKeys(arr);
        setShowInputForAdd(false)
    }

    const addOption = () => {
        const obj = { ...questionsAnswerObj };
        var newArray = []

        var data = obj[`answerOption${index}`];

        if (data !== undefined) {
            for (var i = 0; i < data.length + 1; i++) {
                if (data[i] !== undefined) {
                    newArray.push(data[i])
                }
                else {
                    newArray.push(answerOption)
                }
            }
        }
        else {
            newArray.push(answerOption)
        }

        obj[`answerOption${index}`] = newArray;
        setQuestionsAnswerObj({ ...obj });

        var dataArray = [];
        for (var i = 0; i <= index; i++) {
            let answerObjs = `answerObjs${i}`;
            answerObjs = {};
            for (var keys in obj) {
                if (keys == `answerFormat${i}`) {
                    answerObjs[`answerFormat${i}`] = obj[keys];
                }
                if (keys == `answerOption${i}`) {
                    answerObjs[`answerOption${i}`] = obj[keys];
                }
                if (keys == `question${i}`) {
                    answerObjs[`question${i}`] = obj[keys];
                }
            }
            dataArray[i] = answerObjs;
        }
        setQuestionAnsOptionsArr(dataArray);
        setAnswerOption('');
    }


    const handleChange = (event, index, field) => {
        const value = event.target.value;
        var obj = {};
        obj[`${field}${index}`] = value;
        setIndex(index)
        setQuestionsAnswerObj({ ...questionsAnswerObj, ...obj });
        if (field === 'answerFormat') {
            setShowInputForAdd(true)
        }
    };

    const handleChangeDelete = async (removeData, index, field) => {
        const obj = { ...questionsAnswerObj };
        var removalData;
        for (var key in obj) {
            if (`answerOption${index}` === key) {
                removalData = obj[key]
            }
        }

        var removeDatArr = []
        for (var i = 0; i < removalData.length; i++) {
            if (removalData[i] !== removeData) {
                removeDatArr.push(removalData[i])
            }
        }
        obj[`answerOption${index}`] = removeDatArr;
        setQuestionsAnswerObj(obj)

        var dataArray = [];
        for (var i = 0; i <= index; i++) {
            let answerObjs = `answerObjs${i}`;
            answerObjs = {};
            for (var keys in obj) {
                if (keys == `answerFormat${i}`) {
                    answerObjs[`answerFormat${i}`] = obj[keys];
                }
                if (keys == `answerOption${i}`) {
                    answerObjs[`answerOption${i}`] = obj[keys];
                }
                if (keys == `question${i}`) {
                    answerObjs[`question${i}`] = obj[keys];
                }
            }
            dataArray[i] = answerObjs;
        }
        setQuestionAnsOptionsArr(dataArray);
    }

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="javascript:void(0)" onClick={() => { history.push('/dashboard') }}>
                    Home
             </Link>
                <Typography color="textPrimary">Business-Parameters</Typography>
                <Typography color="textPrimary">Add-Survey</Typography>
            </Breadcrumbs>
            <Card className={classes.root}>
                <CardContent>
                    <FormGridTabs
                        tab={tab}
                        afterRowClick={() => { setTab(0) }}
                        form={
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Document ID"
                                        placeholder="Document ID"
                                        variant="outlined"
                                        fullWidth
                                        disabled
                                        value={identifier}
                                        onChange={(e) => { setIdentifier(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Document Name"
                                        placeholder="Document Name"
                                        variant="outlined"
                                        fullWidth
                                        disabled={isEditingSelectedData}
                                        value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                        <InputLabel id="document-type">Document Type</InputLabel>
                                        <Select
                                            labelId="document-type"
                                            label="Document Type"
                                            fullWidth
                                            disabled={isEditingSelectedData}
                                            value={documentType}
                                            onChange={(e) => { setDocumentType(e.target.value) }}
                                        >
                                            <MenuItem value={'Product Survey'}>Product Survey</MenuItem>
                                            <MenuItem value={'Disease Survey'}>Disease Survey</MenuItem>
                                            <MenuItem value={'Doctor Feedback'}>Doctor Feedback</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {keys.map((elem, index) => {
                                    return (
                                        <Grid item xs={12} sm={12} md={12} lg={12} key={index} >
                                            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                                <Grid item xs={12} sm={12} md={6} lg={6} key={index} className={classes.formControl} style={{ marginRight: "10px" }}>
                                                    <TextField
                                                        label="Type Your Question"
                                                        placeholder="Type your question here"
                                                        variant="outlined"
                                                        fullWidth
                                                        disabled={isEditingSelectedData}
                                                        multiline
                                                        value={questionsAnswerObj[`question${index}`]}
                                                        onChange={(event) => { handleChange(event, index, 'question') }}
                                                        rows={10}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={6} lg={6} key={index} style={{ marginLeft: "10px" }}>
                                                    <FormControl component="fieldset" className={classes.formControl}>
                                                        <FormLabel component="legend">Perfer Answer Format</FormLabel>
                                                        <FormGroup>
                                                            <RadioGroup aria-label="answerRadio"
                                                                value={questionsAnswerObj[`answerFormat${index}`]}
                                                                onChange={(event) => { handleChange(event, index, 'answerFormat') }}>
                                                                <FormControlLabel value="radio" control={<RadioBtn disabled={isEditingSelectedData} color={'primary'} />} label="Radio Button" />
                                                                <FormControlLabel value="textBox" control={<RadioBtn disabled={isEditingSelectedData} color={'primary'} />} label="Free Text Box" />
                                                                <FormControlLabel value="checkboxes" control={<RadioBtn disabled={isEditingSelectedData} color={'primary'} />} label="Multiple Choices" />
                                                                <FormControlLabel value="dropdown" control={<RadioBtn disabled={isEditingSelectedData} color={'primary'} />} label="Drop Down Selections" />
                                                                <FormControlLabel value="link" control={<RadioBtn disabled={isEditingSelectedData} color={'primary'} />} label="Share Any Link(Wikipedia.com)" />
                                                            </RadioGroup>
                                                        </FormGroup>
                                                    </FormControl>
                                                </Grid>
                                            </div>

                                            {<FormLabel component="legend" key={index} style={{ margin: '3px', padding: '3px' }}>Answer</FormLabel>}
                                            {
                                                questionsAnswerObj[`answerFormat${index}`] === `radio` &&
                                                questionsAnswerObj[`answerOption${index}`] &&
                                                questionsAnswerObj[`answerOption${index}`].map((elem, key) => {
                                                    return (
                                                        <Grid item xs={4} sm={4} md={2} lg={2} key={index} style={{
                                                            margin: '2px',
                                                            padding: '2px',
                                                        }}
                                                        >
                                                            <RadioGroup>
                                                                <Row>
                                                                    <Col>
                                                                        <Radio disabled={isEditingSelectedData}>
                                                                            {elem}
                                                                        </Radio>
                                                                        <Button disabled={isEditingSelectedData} onClick={() => { handleChangeDelete(elem, index) }}>
                                                                            <DeleteOutlineIcon style={{ marginRight: "5px" }} />
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            </RadioGroup>
                                                        </Grid>
                                                    )
                                                })
                                            }
                                            {
                                                questionsAnswerObj[`answerFormat${index}`] === "textBox" &&
                                                <Grid item xs={12} sm={12} md={4} lg={4} key={index} style={{ margin: '3px', padding: '3px' }}>
                                                    <TextField
                                                        label="Free Text Box"
                                                        variant="outlined"
                                                        fullWidth
                                                        disabled
                                                    />
                                                </Grid>
                                            }
                                            {
                                                questionsAnswerObj[`answerFormat${index}`] === `checkboxes` &&
                                                questionsAnswerObj[`answerOption${index}`] &&
                                                questionsAnswerObj[`answerOption${index}`].map((elem, key) => {
                                                    return (
                                                        <Grid item xs={4} sm={4} md={2} lg={2} key={index} style={{ margin: '2px', padding: '2px' }}>
                                                            <FormGroup>
                                                                <Checkbox.Group style={{ width: '100%' }}

                                                                >
                                                                    <Row>
                                                                        <Col span={8}>
                                                                            <Checkbox disabled={isEditingSelectedData}>{elem}</Checkbox>
                                                                            <Button disabled={isEditingSelectedData} onClick={() => { handleChangeDelete(elem, index) }}>
                                                                                <DeleteOutlineIcon style={{ marginRight: "5px" }} />
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Checkbox.Group>
                                                            </FormGroup>
                                                        </Grid>
                                                    )
                                                })
                                            }
                                            {
                                                questionsAnswerObj[`answerFormat${index}`] === `dropdown` &&
                                                questionsAnswerObj[`answerOption${index}`] &&
                                                <Grid item xs={6} sm={6} md={6} lg={6} key={index} style={{ marginTop: '3px', paddingTop: '3px' }}>
                                                    <Select
                                                        labelId="answer"
                                                        label="Anwer"
                                                        fullWidth
                                                        disabled={isEditingSelectedData}
                                                    >
                                                        {questionsAnswerObj[`answerOption${index}`].map((elem, key) => {
                                                            return (
                                                                <MenuItem key={key} value={elem}>
                                                                    {elem}
                                                                    <Button disabled={isEditingSelectedData} onClick={() => { handleChangeDelete(elem, index) }}>
                                                                        <DeleteOutlineIcon style={{ marginRight: "5px" }} />
                                                                    </Button>
                                                                </MenuItem>
                                                            )
                                                        }
                                                        )}
                                                    </Select>
                                                </Grid>
                                            }
                                            {
                                                questionsAnswerObj[`answerFormat${index}`] === "link" &&
                                                questionsAnswerObj[`answerOption${index}`] &&
                                                questionsAnswerObj[`answerOption${index}`].map((elem, key) => {
                                                    return (
                                                        <Grid item xs={4} sm={4} md={4} lg={4} key={index} style={{ marginTop: '12px', paddingTop: '3px', marginBottom: '12px' }}>
                                                            <Row>
                                                                <TextField
                                                                    label="Website"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    disabled
                                                                    value={elem}
                                                                />
                                                                <Button disabled={isEditingSelectedData} onClick={() => { handleChangeDelete(elem, index) }}>
                                                                    <DeleteOutlineIcon style={{ marginRight: "5px" }} />
                                                                </Button>
                                                            </Row>
                                                        </Grid>
                                                    )
                                                })
                                            }
                                        </Grid>
                                    )
                                })}

                                {showInputForAdd &&
                                    <Grid item xs={12} sm={12} md={12} lg={12}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Grid item xs={12} sm={12} md={6} lg={6} style={{ marginTop: '3px', paddingTop: '3px', marginRight: '10px' }}>
                                            <TextField
                                                label="Option Value"
                                                placeholder="Option Value"
                                                variant="outlined"
                                                fullWidth
                                                value={answerOption}
                                                disabled={isEditingSelectedData}
                                                onChange={(event) => {
                                                    setAnswerOption(event.target.value)
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6} style={{ marginTop: '3px', paddingTop: '3px', marginLeft: '10px' }}>
                                            <ButtonGroup variant="contained" color="secondary" size={'small'}>
                                                <Button
                                                    disabled={isEditingSelectedData}
                                                    onClick={() => { addOption(index) }}
                                                >
                                                    <AddIcon style={{ marginRight: "2px" }} />
                                                </Button>
                                            </ButtonGroup>
                                        </Grid>
                                    </Grid>
                                }

                                <Grid item xs={3} sm={3}>
                                    <ButtonGroup variant="contained" color="secondary" size={'large'}>
                                        <Button
                                            disabled={isEditingSelectedData}
                                            onClick={() => { addForm() }}
                                        ><AddIcon style={{ marginRight: "2px" }} /> Add</Button>
                                    </ButtonGroup>
                                </Grid>

                                <Grid item xs={12}>
                                    <ButtonGroup variant="contained" color="secondary" size={'large'}>
                                        {resestForm &&
                                            <Button onClick={handleAdd}><AddIcon style={{ marginRight: "2px" }} /> Add</Button>
                                        }
                                        {!selectedData &&
                                            <Button disabled={selectedData} onClick={() => { handleSave() }}><SaveAltIcon style={{ marginRight: "5px" }} /> Save</Button>
                                        }
                                        {isEditingSelectedData &&
                                            <Button onClick={editData}><EditIcon style={{ marginRight: "5px" }} /> Edit</Button>
                                        }
                                        {isEditingSelectedData &&
                                            <Button onClick={deleteSurvey}><DeleteOutlineIcon style={{ marginRight: "5px" }} /> Delete</Button>
                                        }

                                    </ButtonGroup>
                                </Grid>
                            </Grid>
                        }

                        grid={
                            < div >
                                <GridTable
                                    onRowClick={(data) => { handleRowClick(data) }}
                                    headCells={
                                        [
                                            { id: 'name', label: 'Name' },
                                            { id: 'documentType', label: 'Document Type' },
                                        ]
                                    }
                                    rows={allSurvey}
                                />
                            </div>
                        }
                    />
                </CardContent>
            </Card>
        </>
    )
}

export default AddSurvey