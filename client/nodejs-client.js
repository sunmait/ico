const Web3 = require('web3');

const contractTokenArtifacts = require("../ethereum/build/contracts/SunmaitToken.json");
const crowdsaleTokenArtifacts = require("../ethereum/build/contracts/SunmaitCrowdsale.json");

const tokenContractAddress = "0x13274fe19c0178208bcbee397af8167a7be27f6f";
const crowdsaleContractAddress = "0xb529f14aa8096f943177c09ca294ad66d2e08b1f";

const provider = new Web3.providers.HttpProvider("http://localhost:9545");
const web3 = new Web3(provider);

const tokenContract = web3.eth
    .contract(contractTokenArtifacts.abi)
    .at(tokenContractAddress);
    
const crowdsaleContract = web3.eth
    .contract(crowdsaleTokenArtifacts.abi)
    .at(crowdsaleContractAddress);

logBananceInfo();
web3.eth.sendTransaction({ 
    from: web3.eth.accounts[0],
    to: crowdsaleContractAddress,
    value: 100000 
});
web3.eth.sendTransaction({ 
    from: web3.eth.accounts[1],
    to: crowdsaleContractAddress,
    value: 100000 
});
logBananceInfo();



function logBananceInfo() {
    tokenContract.balanceOf.call(crowdsaleContractAddress, (error, result) => {
        console.log("crowdsale balance: " + result);
    });
    tokenContract.balanceOf.call(web3.eth.accounts[0], (error, result) => {
        console.log("account 0 balance: " + result);
    });
    tokenContract.balanceOf.call(web3.eth.accounts[1], (error, result) => {
        console.log("account 1 balance: " + result);
    });
}