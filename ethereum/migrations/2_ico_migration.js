let Token = artifacts.require("./SunmaitToken");
let Crowdsale = artifacts.require("./SunmaitCrowdsale");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Token);
  await deployer.deploy(Crowdsale, Token.address);

  let tokenContractInstance = await Token.deployed();
  tokenContractInstance.setCrowdsaleContract(Crowdsale.address, { from: accounts[0] })
};