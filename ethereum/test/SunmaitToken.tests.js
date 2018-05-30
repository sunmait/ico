const SunmaitToken = artifacts.require("SunmaitToken");

const increaseTime = require("./helpers/increaseTime");
const expectRevert = require("./helpers/expectRevert");

contract("SunmaitToken", (accounts) => {
    describe("constructor", () => {
        it("should set inital state correct", async () => {
            const token = await SunmaitToken.new({ from: accounts[0] });
    
            const expectedDecimalsNumber = 18;
            const expectedTotalSupply = web3.fromWei(100000 * Math.pow(10, expectedDecimalsNumber));
            const expectedIcoDurationInSeconds = 4 * 7 * 24 * 60 * 60; // 4 weeks
            const expectedCrowdsaleAddress = "0x0000000000000000000000000000000000000000";
    
            const actualTotalSupply = await token.totalSupply();
            const actualDecimalsNumber = await token.decimals.call();
            const actualIcoDurationInSeconds = await token.icoDurationSeconds.call();
            const actualCrowdsaleAddress = await token.crowdsaleAddress.call();
    
            assert.strictEqual(
                web3.fromWei(actualTotalSupply.toNumber()), 
                expectedTotalSupply, 
                "Inital total supply is incorrect");
            assert.strictEqual( 
                actualDecimalsNumber.toNumber(), 
                expectedDecimalsNumber,
                "Decimals number is incorrect");
            assert.strictEqual( 
                actualIcoDurationInSeconds.toNumber(),
                expectedIcoDurationInSeconds,
                "ICO duration is incorrect");
            assert.strictEqual(
                actualCrowdsaleAddress, 
                expectedCrowdsaleAddress,
                "Crowdsale contract address is incorrect");
        });
    });

    describe("setCrowdsaleContract", () => {
        it("should set correct 'crowdsaleAddress' and token balance of Crowdsale contract", async () => {
            const token = await SunmaitToken.new({ from: accounts[0] });
    
            const expectedCrowdsaleAddress = "0x1230000000000000000000000000000000000123";
            const expectedBalanceOfCrowdsaleContract = await token.totalSupply();
    
            await token.setCrowdsaleContract(expectedCrowdsaleAddress, { from: accounts[0] });
    
            const actualCrowdsaleAddress = await token.crowdsaleAddress.call();
            const actualBalanceOfCrowdsaleContract = await token.balanceOf(expectedCrowdsaleAddress);
    
            assert.strictEqual(
                actualCrowdsaleAddress, 
                expectedCrowdsaleAddress,
                "Crowdsale contract address is incorrect");
            assert.strictEqual(
                actualBalanceOfCrowdsaleContract.toNumber(), 
                expectedBalanceOfCrowdsaleContract.toNumber(),
                "Token balance of Crowdsale contract is incorrect");
        });
    
        it("call should be permitted for owner only", async () => {
            const token = await SunmaitToken.new({ from: accounts[0] });
    
            const promise = token.setCrowdsaleContract("0x1230000000000000000000000000000000000123", { from: accounts[1] });
            await expectRevert(promise, "Not only owner can call set crowdsale address");
        });
    });

    describe("transferFromCrowdsale", () => {
        it("call should be permitted to Crowdsale contract only", async () => {
            const token = await SunmaitToken.new({ from: accounts[0] });
    
            const crowdsaleAddress = accounts[9];
            await token.setCrowdsaleContract(crowdsaleAddress, { from: accounts[0] });
            const promise = token.transferFromCrowdsale(accounts[1], 10000, { from: accounts[2] });
    
            await expectRevert(promise, "Not only crowdsale contract can transfer tokens")
        });
    
        it("call should be permitted only when ICO is in progress", async () => {
            const token = await SunmaitToken.new({ from: accounts[0] });
    
            const crowdsaleAddress = accounts[9];
            await token.setCrowdsaleContract(crowdsaleAddress, { from: accounts[0] });
            
            const icoDurationInSeconds = await token.icoDurationSeconds.call();
            await increaseTime(icoDurationInSeconds.toNumber() + (3 * 24 * 60 * 60)); // 3 days after ICO has ended
    
            const promise = token.transferFromCrowdsale(accounts[1], 10000, { from: crowdsaleAddress });
    
            await expectRevert(promise, "Crowdsale contract can transfer tokens when the ICO isn't in progress")
        });
    
        it("should transfer tokens correctly when ICO is in progress", async () => {
            const token = await SunmaitToken.new({ from: accounts[0] });
    
            const transferAmount = 10000;
            const crowdsaleAddress = accounts[9];
            const receiverAddress = accounts[5];
    
            const receiverBalanceBeforeTransfer = await token.balanceOf(receiverAddress);
    
            await token.setCrowdsaleContract(crowdsaleAddress, { from: accounts[0] });
            const crowdsaleBalanceBeforeTransfer = await token.balanceOf(crowdsaleAddress);
    
            await token.transferFromCrowdsale(receiverAddress, transferAmount, { from: crowdsaleAddress });
    
            const receiverBalanceAfterTransfer = await token.balanceOf(receiverAddress);
            const crowdsaleBalanceAfterTransfer = await token.balanceOf(crowdsaleAddress);
    
            assert.strictEqual(
                receiverBalanceBeforeTransfer.toNumber(), 
                0, 
                "Receiver balance isn't 0 before transfer from Crowdsale contract");
            assert.strictEqual(
                receiverBalanceAfterTransfer.toNumber(),
                transferAmount,
                "Receiver balance isn't equal to transfer amount");
            assert.strictEqual(
                crowdsaleBalanceAfterTransfer.toNumber(),
                crowdsaleBalanceBeforeTransfer.toNumber() - transferAmount,
                "Crowdsale balance incorrectly changed after transfer");
        });
    });

    describe("ERC-20 interface methods", () => {
        it("'transfer' call shouldn't be permitted when ICO is in progress", async () => {
            const token = await SunmaitToken.new({ from: accounts[0] });

            const promise = token.transfer(accounts[0], 10, { from: accounts[1] });
            await expectRevert(promise, "'transfer' call is allowed when ICO is in progress");
        });

        // TODO: write the same tests for other ERC-20 token methods
        // TODO: write tests that checks that call of ERC-20 token methods is allowed when ICO has finished
    });
});