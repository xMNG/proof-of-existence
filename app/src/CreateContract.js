import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const styles = {
    container: {
        width: '300px',
        height: '100px',
        marginTop: '50px',
        padding: '50px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    },
    button: {
        marginTop: '30px'
    }
}

const CreateContract = (props) => {
    const [awaitingContract, setAwaitingContract] = React.useState(null);

    const createPoeContract = async () => {
        const poeContractAddr = await props.drizzle.contracts.PoeFactory.methods.createContract().send({ from: props.address });
    }

    const consoleLogDrizzles = () => {
        console.log(props.drizzle);
        console.log(props.drizzleState)
    }

    return (
        <React.Fragment>
            <Grid container direction='row' justify='center'>
                <div style={styles.container}>
                    <Grid container direction='column' justify='space-between' alignItems='center'>
                        <Typography variant='h6'>No Contract Detected!</Typography>
                        <Button style={styles.button} variant='outlined' color='primary' onClick={() => createPoeContract()}>Create Contract</Button>
                        {/* <button onClick={() => consoleLogDrizzles()}>Log Drizzle</button> */}
                    </Grid>
                </div>

            </Grid>

        </React.Fragment>
    )
}

export default CreateContract;