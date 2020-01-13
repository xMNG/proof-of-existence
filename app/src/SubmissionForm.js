import { makeStyles, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import React from 'react';
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
    return ['Upload Your File', 'Enter A Description', 'Enter Hashtags']
}





const SubmissionForm = () => {
    const classes = useStyles();
    const [IPFSHash, setIPFSHash] = React.useState('?');
    const [description, setDescription] = React.useState('');
    const [hashTags, setHashTags] = React.useState([]);

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
                return <UploadFile setIPFSHash={(input) => setIPFSHash(input)}></UploadFile>
            case 1:
                return <h1>step 2</h1>
            case 2:
                return <h1>step 3</h1>
            default:
                return <h1>Default</h1>
        }
    }

    return (
        <div>
            <p>IPFSHash: {IPFSHash}</p>
            <Button onClick={() => setIPFSHash('werked')}>setIPFSHash</Button>

            {/* <input type='text' name='description' required></input>
            <input type='text' name='tags' required></input>
            <Button>Upload</Button> */}

            <Container maxWidth='md'>
                <div className={classes.root}>
                    <Stepper activeStep={activeStep} orientation='horizontal' alternativeLabel>
                        {steps.map((label, index) => {
                            return <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        })}
                    </Stepper>
                    <Container maxWidth='sm'>
                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>

                        <Button disabled={activeStep == 0} onClick={handleBack} color="primary" variant="contained" className={classes.Button}>Back</Button>
                        <Button disabled={activeStep == 2} onClick={handleNext} color="primary" variant="contained" className={classes.Button}>Next</Button>
                    </Container>
                </div>
            </Container>
        </div>
    )
}

export default SubmissionForm;