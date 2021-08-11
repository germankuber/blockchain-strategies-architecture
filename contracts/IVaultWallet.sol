pragma solidity ^0.8.0;
import "hardhat/console.sol";

interface IVaultWallet {
    function approve(
        address erc20,
        address spender,
        uint256 amount
    ) external;
}
