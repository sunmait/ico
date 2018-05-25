let Token = artifacts.require("./SunmaitToken");
let Crowdsale = artifacts.require("./SunmaitCrowdsale");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Token);
  await deployer.deploy(Crowdsale, Token.address);

  let tokenContractInstance = await Token.deployed();
  await tokenContractInstance.setCrowdsaleContract(Crowdsale.address)
};