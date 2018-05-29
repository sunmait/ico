const Web3 = require('web3');

const contractTokenArtifacts = require("../ethereum/build/contracts/SunmaitToken.json");
const crowdsaleTokenArtifacts = require("../ethereum/build/contracts/SunmaitCrowdsale.json");

const tokenContractAddress = "0x7b3bea60bd856e8095f73d7f79e5f932f98f2b35";
const crowdsaleContractAddress = "0xfd7cda96d86c83c17edd0d55727ba3abd0de93f9";

const provider = new Web3.providers.HttpProvider("http://localhost:9545");
const web3 = new Web3(provider);

const tokenContract = web3.eth
    .contract(contractTokenArtifacts.abi)
    .at(tokenContractAddress);
    
const crowdsaleContract = web3.eth
    .contract(crowdsaleTokenArtifacts.abi)
    .at(crowdsaleContractAddress);

// const tokenPurchaseEvent = crowdsaleContract.TokenPurchase();

web3.eth.sendTransaction({ 
    from: web3.eth.accounts[0],
    to: crowdsaleContractAddress,
    value: web3.toWei(1) 
});
web3.eth.sendTransaction({ 
    from: web3.eth.accounts[1],
    to: crowdsaleContractAddress,
    value: web3.toWei(0.00000123)
});
logBananceInfo();

function logBananceInfo() {
    tokenContract.balanceOf.call(crowdsaleContractAddress, (error, result) => {
        console.log("crowdsale token balance: " + web3.fromWei(result));
    });
    tokenContract.balanceOf.call(web3.eth.accounts[0], (error, result) => {
        console.log("account 0 token balance: " + web3.fromWei(result));
    });
    tokenContract.balanceOf.call(web3.eth.accounts[1], (error, result) => {
        console.log("account 1 token balance: " + web3.fromWei(result));
    });
    web3.eth.getBalance(web3.eth.accounts[9], (error, result) => {
        console.log("account 9 balance: " + web3.fromWei(result));
    });

    crowdsaleContract.phase1weiRaised.call((error, result) => {
        console.log("PHASE 1 ETH RAISED: " + web3.fromWei(result));
    });

    crowdsaleContract.phase2weiRaised.call((error, result) => {
        console.log("PHASE 2 ETH RAISED: " + web3.fromWei(result));
    });

    crowdsaleContract.totalRaised.call((error, result) => {
        console.log("TOTAL ETH RAISED: " + web3.fromWei(result));
        console.log("___________________________________________");
    });
}