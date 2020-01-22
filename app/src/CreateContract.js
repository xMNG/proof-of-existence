import React from 'react';

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

            <p>no contract detected</p>
            <button onClick={() => createPoeContract()}>Create Contract</button>
            <button onClick={() => consoleLogDrizzles()}>Log Drizzle</button>
        </React.Fragment>
    )
}

export default CreateContract;