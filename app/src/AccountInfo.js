import React from "react";
import { Blockie, EthAddress } from "rimble-ui";

export default class AccountInfo extends React.Component {
    state = {
        datakey: null,
        currAccount: ''
    }

    async componentDidMount() {
        const { drizzle } = this.props;
        const currAccount = (await drizzle.web3.eth.getAccounts())[0];
        this.setState({ currAccount });

        // console.log(">>>>>: AccountInfo -> componentDidMount -> drizzle", drizzle)
        // const contract = drizzle.contracts.ProofOfExistence;
        // console.log(contract)
        // const dataKey = contract.methods["users"].cacheCall();
        // console.log(">>>>>: AccountInfo -> componentDidMount -> dataKey", dataKey)
        // this.setState(dataKey);
    }


    render() {
        // const { SimpleStorage } = this.props.drizzleState.contracts;
        console.log(this.state.currAccount)
        return (
            <React.Fragment>
                {this.state.currAccount ?
                    <Blockie
                        opts={{
                            seed: this.state.currAccount
                        }}
                    /> : ''

                }
                <EthAddress address={this.state.currAccount} maxWidth={256} />
            </React.Fragment>
        )
    }
}