const { expect } = require("chai");

describe("Controller", function () {
  let controller;
  let compoundStrategy;
  beforeEach(async () => {
    const Controller = await ethers.getContractFactory("Controller");
    controller = await Controller.deploy();
    await controller.deployed();

    const CompoundStrategy = await ethers.getContractFactory("CompoundStrategy");
    compoundStrategy = await CompoundStrategy.deploy();
    await compoundStrategy.deployed();
  });
  it("createStrategy: Should not create when you already have a strategy with the same name", async () => {
    await controller.createStrategy("First Strategy", compoundStrategy.address);
    await expect(controller.createStrategy("First Strategy", compoundStrategy.address)).to.be
        .reverted.revertedWith("There is one strategy with that name");
  });
  it("createStrategy: Should Create Strategy", async () => {
    await controller.createStrategy("First Strategy", compoundStrategy.address)
    const [exist, strategyAddress] = await controller.strategies("First Strategy", 0);
    const count = await controller.strategiesCount("First Strategy");
    expect(exist).to.be.true;
    expect(strategyAddress).to.be.equal(compoundStrategy.address);
    expect(count).to.be.equal(1);
  });
});
