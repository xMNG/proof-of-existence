import Grid from '@material-ui/core/Grid';
import React from 'react';
import { MetaMaskButton } from 'rimble-ui';

const SubmitEthTransaction = (props) => {
    console.log(props.drizzle)
    console.log(props.drizzleState)

    const Upload = async () => {
        console.log('eth tx button pressed!')
        const { description, tags, IPFSHash } = props.details;
        // TODO: cache send revist during TruffleU
        // const result = props.drizzle.contracts.ProofOfExistence.methods.addIPFSHash.cacheSend(description, IPFSHash, tags, { from: props.drizzleState.accounts[0] })
        const result = props.drizzle.contracts.ProofOfExistence.methods.addIPFSHash(description, IPFSHash, tags).send({ from: props.drizzleState.accounts[0] })

    }

    return (
        <div>
            <div>
                <p>File Name: {props.details.fileName ? props.details.fileName : ''}</p>
                <p>Description: {props.details.description ? props.details.description : ''}</p>
                <p>Tags: {props.details.tags ? props.details.tags : ''}</p>
                <p>IPFS Hash: {props.details.IPFSHash ? props.details.IPFSHash : ''}</p>
            </div>
            <Grid container justify='center'>
                <MetaMaskButton.Outline onClick={() => Upload()}>Upload to Ethereum</MetaMaskButton.Outline>
            </Grid>

        </div>
    )
}

export default SubmitEthTransaction;