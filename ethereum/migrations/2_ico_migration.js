let Token = artifacts.require("./SunmaitToken");
let Crowdsale = artifacts.require("./SunmaitCrowdsale");

module.exports = async function (deployer, network, accounts) {
  const walletAddress = accounts[9];
  const phase1DurationInDays = 14;
  const phase2DurationInDays = 7;
  const crowdSaleStartTime = Math.floor(Date.now() / 1000 ); //crowdsale start time (in seconds)
  
  await deployer.deploy(Token);
  await deployer.deploy(Crowdsale, Token.address, walletAddress, crowdSaleStartTime, phase1DurationInDays, phase2DurationInDays);

  let tokenContractInstance = await Token.deployed();
  await Crowdsale.deployed();
  tokenContractInstance.setCrowdsaleContract(Crowdsale.address, { from: accounts[0] })
};