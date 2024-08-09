// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Importing OpenZeppelin's SafeMath Implementation
import 'https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol';

contract CrowdFunding {
    using SafeMath for uints256;

    //// list of existing projects 
    Project[] private projects;

    // Event that will be emitted whenever a new project is started 
    event ProjectStarted (
        address contractAddress,
        address projectStarter,
        string projectTitle,
        string projectDescription,
        uint256 deadline,
        uint256 goalAmount
    );

     /** @dev Function to start a new project.
      * @param title Title of the project to be created
      * @param description Brief description about the project
      * @param durationInDays Project deadline in days
      * @param amountToRaise Project goal in wei
      */

     function startProject (
        string calldata title,
        string calldata description,
        uint256 durationinDays,
        uint256 amountToRaise
     ) external {
        uint256 raiseUntil = now.add(durationInDays.mul(1 days));
        Project newProject = new Project(msg.sender, title, description, raiseUntil, amountToRaise);
        projects.push(newProject);

        emit projectStarted(
            address(newProject),
            msg.sender ,
            title,
            description,
            raiseUntil,
        );

     }

    /** @dev Function to get all projects' contract addresses.
      * @return A list of all projects' contract addreses
      */

      function returnAllProjects() external view returns(Project[] memory){
        return project;
      } 


}


