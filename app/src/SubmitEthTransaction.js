import Grid from '@material-ui/core/Grid';
import React from 'react';
import { MetaMaskButton } from 'rimble-ui';

const SubmitEthTransaction = (props) => {
    console.log(props.drizzle)
    console.log(props.drizzleState)

    const Upload = async () => {
        const { description, tags, IPFSHash } = props.details;
        const result = props.drizzle.contracts.ProofOfExistence.methods.addIPFSHash.cacheSend(description, IPFSHash, tags, { from: props.drizzleState.accounts[0] })
    }

    // const getData = async () => {
    //     const result = await props.drizzle.contracts.ProofOfExistence.methods.getData(1).call()
    //     console.log(">>>>>: getData -> result", result)

    // }

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
                {/* <Button onClick={() => getData()}>Fetch Data</Button> */}
            </Grid>

        </div>
    )
}

export default SubmitEthTransaction;