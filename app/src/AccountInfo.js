import makeBlockie from "ethereum-blockies-base64";
import React from "react";
import { EthAddress } from "rimble-ui";
import CreateContract from "./CreateContract";
import NavBar from "./NavBar";

// TODO: Can remove this component entirely and fetch the account info one component up
// TODO: make these hooks and a FP component

export default class AccountInfo extends React.Component {
    state = {
        datakey: null,
        currAccount: '',
        poeContractAddr: '',
    }

    async componentDidMount() {
        const { drizzle } = this.props;
        const currAccount = (await drizzle.web3.eth.getAccounts())[0];
        this.setState({ currAccount });

        // if address, check for contract
        // console.log('>>>>>', this.props.drizzle.contracts.PoeFactory)
        // if no contract, click to deploy
        this.checkForPoeContractAddr();

        // once deployed, dynamically add to drizzle

        // if contract, show the Core component
    }

    checkForPoeContractAddr = async () => {
        const poeContractAddr = await this.props.drizzle.contracts.PoeFactory.methods.userContracts(this.state.currAccount).call()
        // console.log(">>>>>: AccountInfo -> checkForPoeContractAddr -> poeContractAddr", poeContractAddr)
        if (poeContractAddr != '0x0000000000000000000000000000000000000000') {
            this.setPoeContractAddr(poeContractAddr);
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

        // TODO: refactor this to just be the CreateContract or Core
        if (!this.state.poeContractAddr) {
            return (
                <React.Fragment>
                    <NavBar>
                        {blockie}
                        <EthAddress address={this.state.currAccount} maxWidth={256} />
                    </NavBar>
                    <CreateContract drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} address={this.state.currAccount}></CreateContract>
                </React.Fragment>
            )
        }
        console.log('drizzle >>>', this.props.drizzle)
        console.log('drizzleState >>>', this.props.drizzleState)
        console.log('contractAddr', this.state.poeContractAddr)
        return <p>worked</p>
        // return (
        //     <React.Fragment>
        //         <NavBar>
        //             {blockie}
        //             <EthAddress address={this.state.currAccount} maxWidth={256} />
        //         </NavBar>
        //         <Core drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} address={this.state.currAccount}></Core>
        //     </React.Fragment>
        // )
    }
}

