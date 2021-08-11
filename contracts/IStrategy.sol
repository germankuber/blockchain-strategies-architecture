pragma solidity ^0.8.0;

interface IStrategy {
    function execute(address tokenToUse, uint256 amountToUse)
        external
        returns (address token, uint256 amount);

    function tokens() external view returns (address[] memory);
}
