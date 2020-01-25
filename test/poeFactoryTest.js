const PoeFactory = artifacts.require("PoeFactory");
let catchRevert = require("./exceptionsHelpers.js").catchRevert;

contract("PoeFactory", (accounts) => {
    const OWNER = accounts[0];
    const NONOWNER = accounts[1];
    const oneEther = web3.utils.toBN(web3.utils.toWei('1', 'ether'))

    let poe;
    beforeEach(async () => {
        poe = await PoeFactory.new(); // new deployment
    })

    describe("Setup", () => {
        it("should set an owner in constructor", async () => {
            const result = await poe.owner();
            assert.equal(result, OWNER);
        })

        it("should have a default price of 0", async () => {
            const result = await poe.price();
            assert.equal(result, 0);
        })
    })

    describe("Can create new child contract", () => {
        it("allows creation of a child contract", async () => {
            const result = await poe.createContract()
            const address = await poe.userContracts(OWNER)

            assert.equal(result.logs[0].args.createdAddr, address)
        })

        it("logs the createContract event", async () => {
            const result = await poe.createContract()
            assert.equal(result.logs[0].event, 'LogCreateContract')
        })

        it("does not allow creation of contract if user already has one", async () => {
            await poe.createContract();
            catchRevert(poe.createContract())
        })
    })

    describe("Price related transactions", () => {
        it("allows changing of the price", async () => {
            await poe.setPrice(1);
            const result = await poe.price();
            assert.equal(result, 1)
        })

        it("emits the LogPriceChanged event", async () => {
            const output = await poe.setPrice(1);
            assert.equal(output.logs[0].event, "LogPriceChanged")
        })

        it("allows correct withdrawals by owner", async () => {
            const oneEther = web3.utils.toBN(web3.utils.toWei('1', 'ether'))
            await poe.createContract({ value: oneEther }
            );
            const balanceBefore = await web3.eth.getBalance(poe.address)
            assert.equal(balanceBefore, oneEther)

            const ownerBalBefore = await web3.eth.getBalance(OWNER)
            await poe.withdrawEth();
            const ownerBalAfter = await web3.eth.getBalance(OWNER)
            // TODO: calculate exact using tx gas price and gas
            assert.isTrue(ownerBalAfter > ownerBalBefore);

            const balanceAfter = await web3.eth.getBalance(poe.address)
            assert.equal(balanceAfter, 0)
        })

        it("emits the LogWithdrawal event", async () => {
            await poe.createContract({ value: oneEther }
            );
            const output = await poe.withdrawEth();
            assert.equal(output.logs[0].event, 'LogWithdrawal')
        })

        it("does not allow withdrawals from non owners", async () => {
            const oneEther = web3.utils.toBN(web3.utils.toWei('1', 'ether'))
            await poe.createContract({ value: oneEther }
            );
            await catchRevert(poe.withdrawEth({ from: NONOWNER }));
        })
    })



})