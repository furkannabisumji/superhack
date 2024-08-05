// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title UserRegistration
 * @dev A contract for registering users with WorldID and username.
 */
contract UserRegistration {
    // Struct to represent a user
    struct User {
        address userAddress;
        string worldId;
        string username;
    }

    // Mapping from user address to User struct
    mapping(address => User) public users;

    // Mapping to check if a WorldID is already registered
    mapping(string => bool) private worldIdExists;

    // Mapping to check if a username is already taken
    mapping(string => bool) private usernameExists;

    // Event emitted when a new user is registered
    event UserRegistered(address indexed userAddress, string worldId, string username);

    /**
     * @dev Registers a new user with a WorldID and username.
     * @param _worldId The WorldID of the user.
     * @param _username The username of the user.
     */
    function registerUser(string memory _worldId, string memory _username) public {
        require(bytes(_worldId).length > 0, "WorldID is required");
        require(bytes(_username).length > 0, "Username is required");
        require(!worldIdExists[_worldId], "WorldID already registered");
        require(!usernameExists[_username], "Username already taken");

        User memory newUser = User({
            userAddress: msg.sender,
            worldId: _worldId,
            username: _username
        });

        users[msg.sender] = newUser;
        worldIdExists[_worldId] = true;
        usernameExists[_username] = true;

        emit UserRegistered(msg.sender, _worldId, _username);
    }

    /**
     * @dev Retrieves the user information for a given address.
     * @param _userAddress The address of the user.
     * @return The User struct containing user details.
     */
    function getUser(address _userAddress) public view returns (User memory) {
        return users[_userAddress];
    }
}
