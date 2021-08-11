pragma solidity ^0.8.0;
import "./IVaultWallet.sol";

interface IStrategy {
    function execute(
        string calldata strategyName,
        address tokenToUse,
        uint256 amountToUse
    ) external returns (address token, uint256 amount);

    function tokens() external view returns (address[] memory);

    function setNextStepInStrategy(
        string calldata nameOfStrategy,
        address nextStrategy,
        IVaultWallet vaultWallet
    ) external;
}
