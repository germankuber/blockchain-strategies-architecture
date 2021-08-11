//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "./IStrategy.sol";
import "hardhat/console.sol";

contract Controller {
    struct StrategyData {
        bool exists;
        address strategyAddress;
    }
    mapping(string => uint8) public strategiesCount;
    mapping(string => mapping(uint8 => StrategyData)) public strategies;

    constructor() {}

    function createStrategy(string memory _name, address _firstStrategy)
        external
    {
        require(
            strategies[_name][0].exists == false,
            "There is one strategy with that name"
        );
        StrategyData memory data;
        data.exists = true;
        data.strategyAddress = _firstStrategy;
        strategies[_name][0] = data;
        ++strategiesCount[_name];
    }

    function executeStrategy(
        string memory _name,
        address erc20Token,
        uint256 amountToUse
    ) external {
        require(
            strategiesCount[_name] > 0,
            "There is not a strategy with that name"
        );
        uint8 countOfStrategies = strategiesCount[_name];
        uint8 i;

        for (i = 0; i < countOfStrategies; ++i) {
            IStrategy(strategies[_name][i].strategyAddress).execute(
                erc20Token,
                amountToUse
            );
        }
    }
}
