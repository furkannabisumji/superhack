// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

contract MyContract {
    IPyth pyth;

    event PriceFeedsUpdated(bytes32 txHash);

    /**
     * @param pythContract The address of the Pyth contract
     */
    constructor(address pythContract) {
        // Instantiate the IPyth interface with the Pyth contract address
        pyth = IPyth(pythContract);
    }

    /**
     * This method is an example of how to interact with the Pyth contract.
     * Fetch the priceUpdate from Hermes and pass it to the Pyth contract to update the prices.
     * Add the priceUpdate argument to any method on your contract that needs to read the Pyth price.
     * @param priceUpdate The encoded data to update the contract with the latest price
     */
    function exampleMethod(bytes[] calldata priceUpdate) public payable {
        // Submit a priceUpdate to the Pyth contract to update the on-chain price.
        uint fee = pyth.getUpdateFee(priceUpdate);
        pyth.updatePriceFeeds{ value: fee }(priceUpdate);

        // Read the current price from a price feed.
        bytes32 priceFeedId = 0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace; // ETH/USD
        uint age = 3;
        pyth.getPriceNoOlderThan(priceFeedId,age);
    }

    function getPrice(bytes32 priceId) public view returns (int64 price, uint64 conf, int32 expo, uint publishTime) {
        uint age = 3;
        try pyth.getPriceNoOlderThan(priceId,age) returns (PythStructs.Price memory currentBasePrice) {
            return (
                currentBasePrice.price,
                currentBasePrice.conf,
                currentBasePrice.expo,
                currentBasePrice.publishTime
            );
        } catch Error(string memory reason) {
            if (keccak256(abi.encodePacked(reason)) == keccak256(abi.encodePacked("StalePrice"))) {
                revert("0x19abf40e StalePrice: The requested price feed has not been updated recently enough.");
            } else if (keccak256(abi.encodePacked(reason)) == keccak256(abi.encodePacked("PriceFeedNotFound"))) {
                revert("0x14aebe68 PriceFeedNotFound: The requested price feed has never received a price update or does not exist.");
            } else if (keccak256(abi.encodePacked(reason)) == keccak256(abi.encodePacked("InvalidArgument"))) {
                revert("0xa9cb9e0d InvalidArgument: Function arguments are invalid.");
            } else {
                revert(reason);
            }
        } catch (bytes memory /*lowLevelData*/) {
            revert("An unknown error occurred.");
        }
    }

    function getPriceNoOlderThan(bytes32 priceId, uint256 age) public view returns (int64 price, uint64 conf, int32 expo, uint publishTime) {
        try pyth.getPriceNoOlderThan(priceId, age) returns (PythStructs.Price memory currentBasePrice) {
            return (
                currentBasePrice.price,
                currentBasePrice.conf,
                currentBasePrice.expo,
                currentBasePrice.publishTime
            );
        } catch Error(string memory reason) {
            if (keccak256(abi.encodePacked(reason)) == keccak256(abi.encodePacked("StalePrice"))) {
                revert("0x19abf40e StalePrice: The on-chain price has not been updated within the last valid time period.");
            } else if (keccak256(abi.encodePacked(reason)) == keccak256(abi.encodePacked("PriceFeedNotFound"))) {
                revert("0x14aebe68 PriceFeedNotFound: The requested price feed has never received a price update or does not exist.");
            } else if (keccak256(abi.encodePacked(reason)) == keccak256(abi.encodePacked("InvalidArgument"))) {
                revert("0xa9cb9e0d InvalidArgument: Function arguments are invalid.");
            } else {
                revert(reason);
            }
        } catch (bytes memory /*lowLevelData*/) {
            revert("An unknown error occurred.");
        }
    }

    function exampleGetPriceNoOlderThan() public view returns (int64, uint64, int32, uint) {
        bytes32 priceId = 0x63f341689d98a12ef60a5cff1d7f85c70a9e17bf1575f0e7c0b2512d48b1c8b3; // Example price feed ID
        uint256 age = 300; // 5 minutes

        return getPriceNoOlderThan(priceId, age);
    }

    function updatePriceFeeds(bytes[] memory updateData) public payable {
        uint256 fee = pyth.getUpdateFee(updateData);

        require(msg.value >= fee, "0x025dbdd4 InsufficientFee: The fee provided is less than the required fee.");

        try pyth.updatePriceFeeds{value: fee}(updateData) {
        } catch Error(string memory reason) {
            if (keccak256(abi.encodePacked(reason)) == keccak256(abi.encodePacked("InvalidUpdateDataSource"))) {
                revert("0xe60dce71 InvalidUpdateDataSource: Invalid data source of the provided updateData.");
            } else if (keccak256(abi.encodePacked(reason)) == keccak256(abi.encodePacked("InvalidUpdateData"))) {
                revert("0xe69ffece InvalidUpdateData: UpdateData is invalid.");
            } else if (keccak256(abi.encodePacked(reason)) == keccak256(abi.encodePacked("NoFreshUpdate"))) {
                revert("0xde2c57fa NoFreshUpdate: No new fresh updates available.");
            } else if (keccak256(abi.encodePacked(reason)) == keccak256(abi.encodePacked("PriceFeedNotFoundWithinRange"))) {
                revert("0x45805f5d PriceFeedNotFoundWithinRange: No price feed found within the given range or it doesn't exist.");
            } else if (keccak256(abi.encodePacked(reason)) == keccak256(abi.encodePacked("InvalidWormholeVaa"))) {
                revert("0x2acbe915 InvalidWormholeVaa: Given message is not a valid Wormhole VAA.");
            } else if (keccak256(abi.encodePacked(reason)) == keccak256(abi.encodePacked("InvalidGovernanceMessage"))) {
                revert("0x97363b35 InvalidGovernanceMessage: Governance message is invalid.");
            } else if (keccak256(abi.encodePacked(reason)) == keccak256(abi.encodePacked("InvalidGovernanceTarget"))) {
                revert("0x63daeb77 InvalidGovernanceTarget: Governance message is not for this contract.");
            } else if (keccak256(abi.encodePacked(reason)) == keccak256(abi.encodePacked("InvalidGovernanceDataSource"))) {
                revert("0x360f2d87 InvalidGovernanceDataSource: Invalid data source for the governance message.");
            } else if (keccak256(abi.encodePacked(reason)) == keccak256(abi.encodePacked("OldGovernanceMessage"))) {
                revert("0x88d1b847 OldGovernanceMessage: Governance message is old.");
            } else if (keccak256(abi.encodePacked(reason)) == keccak256(abi.encodePacked("InvalidWormholeAddressToSet"))) {
                revert("0x13d3ed82 InvalidWormholeAddressToSet: The wormhole address to set is invalid.");
            } else {
                revert(reason);
            }
        } catch (bytes memory /*lowLevelData*/) {
            revert("An unknown error occurred.");
        }
    }

    function exampleUpdatePriceFeeds(bytes[] memory updateData) public payable {
        // Call the function and pass the update data
        bytes32 txHash = updatePriceFeeds(updateData);

        // Handle the transaction hash (for example, log it)
        emit PriceFeedsUpdated(txHash);
    }
}
