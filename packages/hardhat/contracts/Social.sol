// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title UserRegistration
 * @dev A contract for registering users with WorldID and username, and adding posts, likes, and comments.
 */
contract Social {
    // Address of the dev
    address public devAddress;

    // Struct to represent a user
    struct User {
        address userAddress;
        string worldId;
        string username;
    }

    // Struct to represent a post
    struct Post {
        string worldId;
        string content;
        string imageUrl;
        uint256 timestamp;
        uint256 postId;
    }

    // Struct to represent a like
    struct Like {
        address userAddress;
    }

    // Struct to represent a comment
    struct Comment {
        address userAddress;
        string content;
    }

    // Mapping from user address to User struct
    mapping(address => User) public users;

    // Mapping to check if a WorldID is already registered
    mapping(string => bool) private worldIdExists;

    // Mapping to check if a username is already taken
    mapping(string => bool) private usernameExists;

    // Mapping from WorldID to array of posts
    mapping(string => Post[]) public posts;

    // Mapping from post ID to array of likes
    mapping(uint256 => Like[]) public postLikes;

    // Mapping from post ID to array of comments
    mapping(uint256 => Comment[]) public postComments;

    // Counter for post IDs
    uint256 public postCounter;

    // Event emitted when a new user is registered
    event UserRegistered(address indexed userAddress, string worldId, string username);

    // Event emitted when a new post is created
    event PostCreated(string worldId, string content, string imageUrl, uint256 timestamp, uint256 postId);

    // Event emitted when a new like is added to a post
    event LikeAdded(uint256 postId, address indexed userAddress);

    // Event emitted when a new comment is added to a post
    event CommentAdded(uint256 postId, address indexed userAddress, string content);

    constructor() {
        devAddress = msg.sender;
    }

    modifier onlyDev() {
        require(devAddress == msg.sender, "Not a dev");
        _;
    }

    function registerUser(string memory _worldId, string memory _username) public onlyDev {
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
     * @dev Creates a post with optional text and image.
     * @param _content The text content of the post.
     * @param _imageUrl The URL of the image in the post.
     */
    function createPost(string memory _content, string memory _imageUrl) public {
        User memory sender = users[msg.sender];
        require(bytes(sender.worldId).length > 0, "User must be registered");

        postCounter++;

        Post memory newPost = Post({
            worldId: sender.worldId,
            content: _content,
            imageUrl: _imageUrl,
            timestamp: block.timestamp,
            postId: postCounter
        });

        posts[sender.worldId].push(newPost);

        emit PostCreated(sender.worldId, _content, _imageUrl, block.timestamp, postCounter);
    }

    /**
     * @dev Adds a like to a post.
     * @param _postId The ID of the post being liked.
     */
    function addLike(uint256 _postId) public {
        User memory sender = users[msg.sender];
        require(bytes(sender.worldId).length > 0, "User must be registered");

        postLikes[_postId].push(Like({
            userAddress: msg.sender
        }));

        emit LikeAdded(_postId, msg.sender);
    }

    /**
     * @dev Adds a comment to a post.
     * @param _postId The ID of the post being commented on.
     * @param _content The content of the comment.
     */
    function addComment(uint256 _postId, string memory _content) public {
        User memory sender = users[msg.sender];
        require(bytes(sender.worldId).length > 0, "User must be registered");
        require(bytes(_content).length > 0, "Comment content cannot be empty");

        postComments[_postId].push(Comment({
            userAddress: msg.sender,
            content: _content
        }));

        emit CommentAdded(_postId, msg.sender, _content);
    }

    /**
     * @dev Retrieves the user information for a given address.
     * @param _userAddress The address of the user.
     * @return The User struct containing user details.
     */
    function getUser(address _userAddress) public view returns (User memory) {
        return users[_userAddress];
    }

    /**
     * @dev Retrieves all posts made by a specific WorldID.
     * @param _worldId The WorldID of the user.
     * @return An array of Post structs.
     */
    function getPosts(string memory _worldId) public view returns (Post[] memory) {
        return posts[_worldId];
    }

    /**
     * @dev Retrieves all likes for a specific post.
     * @param _postId The ID of the post.
     * @return An array of Like structs.
     */
    function getLikes(uint256 _postId) public view returns (Like[] memory) {
        return postLikes[_postId];
    }

    /**
     * @dev Retrieves all comments for a specific post.
     * @param _postId The ID of the post.
     * @return An array of Comment structs.
     */
    function getComments(uint256 _postId) public view returns (Comment[] memory) {
        return postComments[_postId];
    }
}
