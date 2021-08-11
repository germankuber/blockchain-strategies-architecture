pragma solidity ^0.8.0;

import "../StrategyBase.sol";

contract CompoundStrategy is StrategyBase {
    address private dai = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address private cBat = 0x6C8c6b02E7b2BE14d4fA6022Dfd6d75921D90E4E;
    address[] private addreses = [dai, cBat];

    constructor() StrategyBase(addreses) {}

    function executeAction(address tokenToUse, uint256 amountToUse)
        public
        override
        returns (address token, uint256 amount)
    {
        emit Log("Compound");

        return (cBat, 999);
    }
}
