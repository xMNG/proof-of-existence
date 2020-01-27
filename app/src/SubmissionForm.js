import { makeStyles, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import React from 'react';
import AddDescriptionAndTags from './AddDescriptionAndTags';
import SubmitEthTransaction from './SubmitEthTransaction';
import UploadFile from './UploadFile';



const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    Button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Upload Your File', 'Enter A Description / Tags', 'Submit']
}

const SubmissionForm = (props) => {
    const classes = useStyles();
    const [IPFSHash, setIPFSHash] = React.useState('');
    const [fileName, setFileName] = React.useState('')
    const [description, setDescription] = React.useState('');
    const [tags, setTags] = React.useState('');

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep(activeStep => activeStep + 1);
    }

    const handleBack = () => {
        setActiveStep(activeStep => activeStep - 1);
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <UploadFile setIPFSHash={(input) => setIPFSHash(input)} setFileName={(input) => setFileName(input)} fileName={fileName} IPFSHash={IPFSHash}></UploadFile>
            case 1:
                return <AddDescriptionAndTags setDescription={(input) => setDescription(input)} setTags={(input) => setTags(input)} description={description} tags={tags}></AddDescriptionAndTags>
            case 2:
                return <SubmitEthTransaction details={{ IPFSHash, fileName, description, tags }} drizzle={props.drizzle} drizzleState={props.drizzleState}></SubmitEthTransaction>
            default:
                return <h1>Default</h1>
        }
    }

    return (
        <Container maxWidth='md'>
            <Grid container alignItems='center' direction='column'>

                <Typography variant={'h5'} component={'span'}>Upload A File</Typography>

                <div className={classes.root}>
                    <Stepper activeStep={activeStep} orientation='horizontal' alternativeLabel>
                        {steps.map((label, index) => {
                            return <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        })}
                    </Stepper>

                    <Grid container direction='column' alignItems='center'>
                        <Typography component={'span'} className={classes.instructions}>{getStepContent(activeStep)}</Typography>

                        <div>
                            <Button disabled={activeStep === 0} onClick={handleBack} color="primary" variant="contained" className={classes.Button}>Back</Button>

                            <Button disabled={activeStep === 2 || (activeStep === 0 && !IPFSHash) || (activeStep === 1 && !description)} onClick={handleNext} color="primary" variant="contained" className={classes.Button}>Next</Button>

                        </div>
                    </Grid>

                </div>

            </Grid>
        </Container>
    )
}

export default SubmissionForm;