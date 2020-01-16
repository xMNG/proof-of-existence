import React from 'react';
import DisplayData from './DisplayData';
import SubmissionForm from './SubmissionForm';

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
        // TODO: test react-integration
        // const testData = this.props.drizzleStatus
        return (
            <div>
                <DisplayData storedOwner={storedOwner} dataCount={dataCount}></DisplayData>
                <SubmissionForm drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}></SubmissionForm>
            </div>
        )
    }
}

export default Core;