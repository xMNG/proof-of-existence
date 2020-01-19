import Grid from '@material-ui/core/Grid';
import React from 'react';
import SubmissionForm from './SubmissionForm';
import ViewHashes from './ViewHashes';

const styles = {
    card: {
        minWidth: 275,
        padding: '25px',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    divContainer: {
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        margin: 'auto',
        marginTop: '30px',
        marginBottom: '30px',
        width: '50%',
        padding: '30px'
    },
    hr: {
        display: 'block',
        marginTop: '1.5rem',
        marginBottom: '1.5rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderStyle: 'inset',
        borderWidth: '1px',
        width: '90%'
    }
}

class Core extends React.Component {
    constructor() {
        super()
        this.state = {
            dataCount: 0,
            dataArr: [],
            ownerDataKey: null,
        };
    }



    componentDidMount() {
        const { drizzle } = this.props;
        const contract = drizzle.contracts.ProofOfExistence;
        const ownerDataKey = contract.methods.owner.cacheCall();
        const dataCountDataKey = contract.methods.dataCount.cacheCall();
        this.setState({ ownerDataKey, dataCountDataKey });
    }

    render() {
        const { ProofOfExistence } = this.props.drizzleState.contracts;
        const storedOwner = ProofOfExistence.owner[this.state.ownerDataKey];
        const dataCount = ProofOfExistence.dataCount[this.state.dataCountDataKey];

        //TODO: try a container react ui to center all 

        return (
            <div style={styles.divContainer}>
                <Grid container direction='column' justify='space-evenly' alignItems='space-evenly'>
                    <SubmissionForm drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}></SubmissionForm>

                    <hr style={styles.hr}></hr>

                    <ViewHashes storedOwner={storedOwner} dataCount={dataCount} drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}></ViewHashes>
                </Grid>
            </ div>
        )
    }
}

export default Core;