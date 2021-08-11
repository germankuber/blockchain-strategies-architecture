pragma solidity ^0.8.0;
import "./IVaultWallet.sol";
import "./IStrategy.sol";

abstract contract StrategyBase is IStrategy {
    event Log(string strategyName);

    address[] public tokensToManipulate;
    mapping(string => address) nextStepInStrategy;
    IVaultWallet vaultWallet;

    constructor(address[] memory _tokens) {
        tokensToManipulate = _tokens;
    }

    function setNextStepInStrategy(
        string calldata nameOfStrategy,
        address nextStrategy,
        IVaultWallet _vaultWallet
    ) external override {
        nextStepInStrategy[nameOfStrategy] = nextStrategy;
        vaultWallet = _vaultWallet;
    }

    function execute(
        string calldata strategyName,
        address tokenToUse,
        uint256 amountToUse
    ) external override returns (address token, uint256 amount) {
        (address t, uint256 a) = executeAction(
            strategyName,
            tokenToUse,
            amountToUse
        );
        address next = nextStepInStrategy[strategyName];
        delete nextStepInStrategy[strategyName];
        return
            (next == address(0))
                ? (t, a)
                : IStrategy(next).execute(strategyName, t, a);
    }

    function executeAction(
        string calldata strategyName,
        address tokenToUse,
        uint256 amountToUse
    ) public virtual returns (address token, uint256 amount);

    function tokens() external view override returns (address[] memory) {
        return tokensToManipulate;
    }
}
