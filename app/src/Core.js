import React from 'react';

class Core extends React.Component {
    constructor() {
        super()
        this.state = {
            dataCount: 0,
            dataArr: [],
            dataKey: null
        };
    }
    componentDidMount() {
        const { drizzle } = this.props;
        const contract = drizzle.contracts.ProofOfExistence;
        const dataKey = contract.methods['owner'].cacheCall();
        // const dataKey = contract.methods.owner.cacheCall();
        this.setState({ dataKey });
    }

    fetchAllData = () => {

    }

    fetchCurrentDataCount = () => {

    }

    render() {
        const { ProofOfExistence } = this.props.drizzleState.contracts;
        console.log(">>>>>: Core -> render -> ProofOfExistence", ProofOfExistence)
        console.log(">>>>>: Core -> render -> this.state.dataKey", this.state.dataKey)
        const storedOwner = ProofOfExistence.owner[this.state.dataKey];
        return (
            <div>
                <p>what what in </p>
                <p>{storedOwner ? storedOwner.value : 'error!'}</p>
            </div>
        )
    }
}

export default Core;