
 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Voting {
    mapping(string => uint256) public votesReceived;

    string[] public candidateList;

    string public constant WITHHOLD = "Withhold";

    event VoteCast(
        address indexed voter,
        string selection
    );

    constructor() {
        candidateList.push("Johnny");
        candidateList.push("Amber");
        candidateList.push("Alex");
    }

    function totalVotesFor(
        string memory candidate
    ) public view returns (uint256) {
        require(validSelection(candidate), "Invalid selection");
        return votesReceived[candidate];
    }

    function voteForCandidate(
        string memory candidate
    ) public {
        require(validSelection(candidate), "Invalid selection");

        votesReceived[candidate] += 1;

        emit VoteCast(msg.sender, candidate);
    }

    function validCandidate(
        string memory candidate
    ) public view returns (bool) {
        for (uint256 i = 0; i < candidateList.length; i++) {
            if (
                keccak256(bytes(candidateList[i])) ==
                keccak256(bytes(candidate))
            ) {
                return true;
            }
        }

        return false;
    }

    function validSelection(
        string memory selection
    ) public view returns (bool) {
        return validCandidate(selection) ||
            keccak256(bytes(selection)) ==
            keccak256(bytes(WITHHOLD));
    }

    function getCandidateList()
        public
        view
        returns (string[] memory)
    {
        return candidateList;
    }

    function getTotalVotes()
        public
        view
        returns (uint256)
    {
        uint256 total = votesReceived[WITHHOLD];

        for (uint256 i = 0; i < candidateList.length; i++) {
            total += votesReceived[candidateList[i]];
        }

        return total;
    }
}
