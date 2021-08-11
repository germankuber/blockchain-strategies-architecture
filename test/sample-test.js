const { expect } = require("chai");

describe("Controller", function () {
  let controller;
  let compoundStrategy;
  let uniSwapStrategy;
  let vaultWallet;
  beforeEach(async () => {

    const VaultWallet = await ethers.getContractFactory("VaultWallet");
    vaultWallet = await VaultWallet.deploy();
    await vaultWallet.deployed();

    const Controller = await ethers.getContractFactory("Controller");
    controller = await Controller.deploy(vaultWallet.address);
    await controller.deployed();

    const CompoundStrategy = await ethers.getContractFactory("CompoundStrategy");
    compoundStrategy = await CompoundStrategy.deploy();
    await compoundStrategy.deployed();

    const UniSwapStrategy = await ethers.getContractFactory("UniSwapStrategy");
    uniSwapStrategy = await UniSwapStrategy.deploy();
    await uniSwapStrategy.deployed();
  });
  it("createStrategyGroup: Should not create when you already have a strategy with the same name", async () => {
    await controller.createStrategyGroup("First Strategy", compoundStrategy.address);
    await expect(controller.createStrategyGroup("First Strategy", compoundStrategy.address)).to.be
        .reverted.revertedWith("There is one strategy with that name");
  });
  it("createStrategyGroup: Should Create Strategy", async () => {
    await controller.createStrategyGroup("First Strategy", compoundStrategy.address);
    const [exist, strategyAddress] = await controller.strategies("First Strategy", 0);
    const count = await controller.strategiesCount("First Strategy");
    expect(exist).to.be.true;
    expect(strategyAddress).to.be.equal(compoundStrategy.address);
    expect(count).to.be.equal(1);
  });
  
  it("executeStrategy: Should execute the Strategy", async () => {
    await controller.createStrategyGroup("First Strategy", compoundStrategy.address);
    
    await expect(controller.executeStrategy("First Strategy", compoundStrategy.address, 1000000))
    .to.emit(compoundStrategy, 'Log')
    .withArgs("Compound");
  });
  
  it("executeStrategy: Should not execute if the strategy does not exist", async () => {
    await expect(controller.executeStrategy("First Strategy", compoundStrategy.address, 1000000)).to.be
        .reverted.revertedWith("There is not a strategy with that name");
  });

  it("addStrategy: Should Add Strategy", async () => {
    const strategyGroupName = "First Strategy";
    await controller.createStrategyGroup(strategyGroupName, compoundStrategy.address);
    await controller.addStrategy(strategyGroupName, uniSwapStrategy.address);

    const [exist1, strategyAddress1] = await controller.strategies(strategyGroupName, 0);
    const [exist2, strategyAddress2] = await controller.strategies(strategyGroupName, 1);
    const count = await controller.strategiesCount(strategyGroupName);
    expect(exist1).to.be.true;
    expect(exist2).to.be.true;
    expect(strategyAddress1).to.be.equal(compoundStrategy.address);
    expect(strategyAddress2).to.be.equal(uniSwapStrategy.address);
    expect(count).to.be.equal(2);
  });

  it("executeStrategy: Should Emit event of second strategy", async () => {
    const strategyGroupName = "First Strategy";
    await controller.createStrategyGroup(strategyGroupName, compoundStrategy.address);
    await controller.addStrategy(strategyGroupName, uniSwapStrategy.address);

    
    await expect(controller.executeStrategy("First Strategy", compoundStrategy.address, 1000000))
      .to.emit(uniSwapStrategy, 'Log')
      .withArgs("UniSwapStrategy");
  });
});
