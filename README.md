# What is ProofOfExistence ?

ProofOfExistence is a decentralized application that allows users deploy their own Ethereum smart contract, use IPFS to upload their files, and pin the IPFS hash on their contract's state for storage. All in a few clicks.

Uses solidity, javascript, react, truffle, drizzle, ganache, metamask and web3.

Built in ~3 weeks.

![Video Demo](https://github.com/xMNG/proof-of-existence/blob/master/screenshot.png "screenshot")(https://youtu.be/6eiez7QiTvg)

# Links

- [Deployed Addresses on Rinkeby](https://github.com/xMNG/proof-of-existence/blob/master/deployed_addresses.txt "Deployed Addresses on Rinkeby")
- [Design Pattern Decisions](https://github.com/xMNG/proof-of-existence/blob/master/design_pattern_decisions.md "Design Pattern Decisions")
- [Avoiding Common Attacks](https://github.com/xMNG/proof-of-existence/blob/master/avoiding_common_attacks.md "Avoiding Common Attacks")

# How to install and run (local blockchain)
1. Clone the repo 

    ```git clone https://github.com/xMNG/proof-of-existence.git```
2. cd to the directory

    ```cd proof-of-existence```

3. npm install

    ```npm install```
4. Run ganache (ganache-cli or gui) on port 8545

5. Compile and migrate the scripts

    ```truffle migrate```

6. In another terminal, cd to app dir and install react app

    ```cd app && npm install```

7. Run react app, will be served on localhost:3000

    ```npm run start```


# Tests
To run tests, run the command below from the top level directory (not ./app/)

```truffle test```

You should see the test output below:
![truffle test output](https://raw.githubusercontent.com/xMNG/proof-of-existence/master/githubImages/test%20specs.png)

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