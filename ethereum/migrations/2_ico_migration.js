let Token = artifacts.require("./SunmaitToken");
let Crowdsale = artifacts.require("./SunmaitCrowdsale");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Token);
  await deployer.deploy(Crowdsale, Token.address, accounts[9], Math.floor(Date.now() / 1000 ), 14, 7);

  let tokenContractInstance = await Token.deployed();
  await Crowdsale.deployed();
  tokenContractInstance.setCrowdsaleContract(Crowdsale.address, { from: accounts[0] })
};