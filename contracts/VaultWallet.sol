pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "./IVaultWallet.sol";
contract VaultWallet is IVaultWallet {
    event Approve(address erc20, address spender, uint256 amount);

    function approve(
        address erc20,
        address spender,
        uint256 amount
    ) external override {
        emit Approve(erc20, spender, amount);
    }
}
