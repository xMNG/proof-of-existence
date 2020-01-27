import makeBlockie from "ethereum-blockies-base64";
import React from "react";
import { EthAddress } from "rimble-ui";
import Web3 from 'web3';
import Admin from "./Admin";
import ProofOfExistence from './contracts/ProofOfExistence.json';
import Core from "./Core";
import CreateContract from "./CreateContract";
import NavBar from "./NavBar";

// TODO: Can remove this component entirely and fetch the account info one component up
// TODO: make these hooks and a FP component

export default class AccountInfo extends React.Component {
    state = {
        currAccount: '',
        factoryContractOwner: '',
        poeContractAddr: '',
        poeContractReady: false,
    }

    async componentDidMount() {
        const { drizzle } = this.props;
        const currAccount = (await drizzle.web3.eth.getAccounts())[0];
        const factoryContractOwner = await drizzle.contracts.PoeFactory.methods.owner().call();
        if (!this.state.currAccount || !this.state.factoryContractOwner) {
            this.setState({ currAccount, factoryContractOwner });
        }

        await this.checkForPoeContractAddr();
    }

    checkForPoeContractAddr = async () => {
        // if address, check for contract
        const poeContractAddr = await this.props.drizzle.contracts.PoeFactory.methods.userContracts(this.state.currAccount).call()

        if (poeContractAddr != '0x0000000000000000000000000000000000000000') {
            this.setPoeContractAddr(poeContractAddr);

            // TODO: watch the contract
            let web3 = new Web3(Web3.givenProvider);
            let contractName = 'ProofOfExistence';
            let web3Contract = new web3.eth.Contract(ProofOfExistence['abi'], poeContractAddr)
            let contractConfig = { contractName, web3Contract }
            let events = ['LogAddIPFSHash']
            this.props.drizzle.store.dispatch({ type: 'ADD_CONTRACT', contractConfig, events })
            // console.log('dispatched!')
            this.setState({ poeContractReady: true })
        }
    }

    setPoeContractAddr = (addr) => {
        this.setState({ poeContractAddr: addr })
    }

    render() {
        let blockie;
        if (this.state.currAccount) {
            blockie = <img src={makeBlockie(this.state.currAccount)} style={{ width: '50px', marginRight: '10px', borderRadius: '5px' }
            } />
        }

        let adminComponent;
        if (this.state.currAccount == this.state.factoryContractOwner) {
            adminComponent = <Admin drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} address={this.state.currAccount}></Admin>
        }

        // TODO: refactor this to just be the CreateContract or Core, and pull NavBar out
        if (!this.state.poeContractAddr && !this.props.drizzle.contracts.ProofOfExistence) {
            return (
                <React.Fragment>
                    <NavBar>
                        {adminComponent}
                        {blockie}
                        <EthAddress address={this.state.currAccount} maxWidth={256} />
                    </NavBar>
                    <CreateContract drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} address={this.state.currAccount}></CreateContract>
                </React.Fragment>
            )
        }
        console.log('drizzle >>>', this.props.drizzle)
        console.log('drizzleState >>>', this.props.drizzleState)
        if (this.props.drizzle.contracts.ProofOfExistence.address) {
            return (
                <React.Fragment>
                    <NavBar>
                        {adminComponent}
                        {blockie}
                        <EthAddress address={this.state.currAccount} maxWidth={256} />
                    </NavBar>
                    <Core drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} address={this.state.currAccount}></Core>
                </React.Fragment>
            )
        }
        return <p>Loading...</p>
    }
}

