
![Screenshot](https://raw.githubusercontent.com/xMNG/proof-of-existence/master/githubImages/screenshot.png "screenshot")

# What is ProofOfExistence ?

ProofOfExistence is a decentralized application that allows users deploy their own Ethereum smart contract, use IPFS to upload their files, and pin the IPFS hash on their contract's state for storage. All in a few clicks.

Uses solidity, javascript, react, truffle, drizzle, ganache, metamask and web3.

Built in ~3 weeks. 

#built_with_Truffle

[Video Demo](https://youtu.be/6eiez7QiTvg)

# Links

- [Deployed Addresses on Rinkeby](https://github.com/xMNG/proof-of-existence/blob/master/deployed_addresses.txt "Deployed and Verified Contract Addresses on Rinkeby")
- [Design Pattern Decisions](https://github.com/xMNG/proof-of-existence/blob/master/design_pattern_decisions.md "Design Pattern Decisions")
- [Avoiding Common Attacks](https://github.com/xMNG/proof-of-existence/blob/master/avoiding_common_attacks.md "Avoiding Common Attacks")

# How to install and run (local blockchain)
1. Clone the repo 

    ```git clone https://github.com/xMNG/proof-of-existence.git```
2. cd to the directory

    ```cd proof-of-existence```

3. Run ganache (ganache-cli or gui) on port 8545

4. Compile and migrate the scripts

    ```truffle migrate```

5. cd to app dir and install react app

    ```cd app && npm install```

6. Add ganache seed phrase to metamask

7. Change metamask to localhost port 8545

8. Run react app, will be served on localhost:3000

    ```npm run start```


# Tests
To run tests, run the command below from the top level directory (not ./app/)

```truffle test```

You should see the test output below:
![truffle test output](https://raw.githubusercontent.com/xMNG/proof-of-existence/master/githubImages/test%20specs.png)

# Checklist for ConsenSys Academy Final Project

## General Project Requirements 

:white_check_mark: Project includes a `README.md`

:white_check_mark: Project is a truffle project

:white_check_mark: Contract code is commented

:white_check_mark: Contract inherits a library

## User Interface Requirements

:white_check_mark: Project can run locally

:white_check_mark: App displays current ethereum account

:white_check_mark: Can sign transactions with metamask account

:white_check_mark: App reflects updates to the contract state

## Testing Requirements

:white_check_mark: Tests in js and/or solidity

:white_check_mark: Tests are properly structured

:white_check_mark: All tests pass

## Design Pattern Requirements

:white_check_mark: At leasst one circuit breaker / emergency stop

:white_check_mark: Project includes design_pattern_decisions.md which adequately describe design patterns

:white_check_mark: Project includes avoiding_commmon_attacks.md which adequately describes how contract mitigates two common attacks

## Testnet Deployment

:white_check_mark: Project includes deployed_addresses.txt which describes which testnet and which addresses the contract lives

## Stretch Goals

:white_check_mark: Project uses IPFS

:black_square_button: Upgradeable design pattern

:black_square_button: Contracts written in LLL or Vyper

:black_square_button: App uses Uport  

:black_square_button: App uses oracle




# To Do
I hope to continue to refine this project during TruffleU in a few key areas:
1. Emphasis on blockchain specific UI/UX (more toasts, status updates)
2. Better performance (tighten logic and prevent extra rerenders)
3. Move the last few calls to cacheCall/cacheSend (ran out of time!)
4. Upgradeable design pattern
5. Incorporate ENS
6. Click to login using Uport / MetaMask / WalletConnect
7. Deploy app itself to IPFS
8. Optimistic pinning of IPFS hash to local storage
9. Some Vyper contracts? Like a troll box.

