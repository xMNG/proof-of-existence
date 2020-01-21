import React from 'react';

const CreateContract = (props) => {
    const [awaitingContract, setAwaitingContract] = React.useState(null);

    const createPoeContract = async () => {
        const poeContractAddr = await props.drizzle.contracts.PoeFactory.methods.createContract().send({ from: props.address });
    }

    return (
        <React.Fragment>

            <p>no contract detected</p>
            <button onClick={() => createPoeContract()}>Create Contract</button>
        </React.Fragment>
    )
}

export default CreateContract;