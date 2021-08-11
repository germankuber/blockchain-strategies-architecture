require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-ganache");
require("solidity-coverage");
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.0",
  gasReporter: {
    currency: 'CHF',
    gasPrice: 21
  }
  // ,
  // defaultNetwork: "localhost",
  // networks: {
  //   ganache: {
  //     url:"https://127.0.0.1:8545",
  //     gasLimit: 6000000000,
  //     defaultBalanceEther: 10,
  //   },
  // },
};
