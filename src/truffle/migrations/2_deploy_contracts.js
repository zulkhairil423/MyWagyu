var WagyuInfo = artifacts.require("WagyuInfo");
var WagyuTransaction = artifacts.require("WagyuTransaction");

module.exports = async function(deployer) {
  // deploy a contract
  await deployer.deploy(WagyuInfo);
  await deployer.deploy(WagyuTransaction, WagyuInfo.address);
  //access information about your deployed contract instance
  const instance = await WagyuInfo.deployed();
  const instance1 = await WagyuTransaction.deployed();
}
