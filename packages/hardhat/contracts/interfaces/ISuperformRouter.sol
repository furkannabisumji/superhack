
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Interface for SuperformRouter
interface ISuperformRouter {
    struct SingleVaultSFData {
        uint256 superformId;
        uint256 amount;
        uint256 outputAmount;
        uint256 maxSlippage;
        // Assuming LiqRequest is defined elsewhere
        bytes permit2data;
        bool hasDstSwap;
        bool retain4626;
        address receiverAddress;
        address receiverAddressSP;
        bytes extraFormData;
    }

    struct SingleDirectSingleVaultStateReq {
        SingleVaultSFData superformData;
    }
    function provideLiquidity(address token, uint256 amount, address to) external;

    function singleDirectSingleVaultDeposit(SingleDirectSingleVaultStateReq calldata req) external;
}
