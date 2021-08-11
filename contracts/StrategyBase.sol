pragma solidity ^0.8.0;

import "./IStrategy.sol";

abstract contract StrategyBase is IStrategy {
    event Log(string strategyName);

    address[] public tokensToManipulate;

    constructor(address[] memory _tokens) {
        tokensToManipulate = _tokens;
    }

    function execute(address tokenToUse, uint256 amountToUse)
        external
        override
        returns (address token, uint256 amount)
    {
        return executeAction(tokenToUse, amountToUse);
    }

    function executeAction(address tokenToUse, uint256 amountToUse)
        public
        virtual
        returns (address token, uint256 amount);

    function tokens() external view override returns (address[] memory) {
        return tokensToManipulate;
    }
}
