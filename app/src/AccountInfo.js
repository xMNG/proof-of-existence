import makeBlockie from "ethereum-blockies-base64";
import React from "react";
import { EthAddress } from "rimble-ui";
import Core from "./Core";
import NavBar from "./NavBar";
// TODO: Can remove this component entirely and fetch the account info one component up

export default class AccountInfo extends React.Component {
    state = {
        datakey: null,
        currAccount: ''
    }

    async componentDidMount() {
        const { drizzle } = this.props;
        const currAccount = (await drizzle.web3.eth.getAccounts())[0];
        this.setState({ currAccount });
    }

    render() {
        let blockie;
        if (this.state.currAccount) blockie = <img src={makeBlockie(this.state.currAccount)} style={{ width: '50px', marginRight: '10px', borderRadius: '5px' }
        } />
        console.log(this.state.currAccount)
        return (
            <React.Fragment>
                <NavBar>
                    {blockie}
                    <EthAddress address={this.state.currAccount} maxWidth={256} />
                </NavBar>
                <Core drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} address={this.state.currAccount}></Core>
            </React.Fragment>
        )
    }
}

