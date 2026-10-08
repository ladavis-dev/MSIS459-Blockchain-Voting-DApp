# MSIS 459 – Blockchain Voting DApp

A decentralized voting application developed for MSIS 459 using Solidity, Hardhat, React.js, and Web3.js.

The project demonstrates how smart contracts can manage voting records on an Ethereum-compatible blockchain while a React frontend provides an interactive interface for submitting votes and reviewing election results.

## Project Overview

The application expands upon the original two-candidate voting example presented in Module 2 by supporting three candidates and incorporating additional voting functionality.

The application was developed and deployed using an AWS EC2 Ubuntu environment and a local Hardhat Ethereum development network.

### Project Objectives

- Implement a Solidity smart contract that manages voting operations.
- Expand the original application from two candidates to three.
- Display individual vote totals for Johnny, Amber, and Alex.
- Integrate the smart contract with a React frontend using Web3.js.
- Provide an option to withhold a vote.
- Display election results and voting statistics.
- Demonstrate blockchain transactions and real-time retrieval of stored voting data.

## Technology Stack

| Technology | Purpose |
|---|---|
| Solidity 0.8.18 | Smart contract development |
| Hardhat 2.x | Ethereum development and testing |
| React.js | Frontend application |
| Web3.js 1.10.4 | Blockchain interaction |
| Node.js | JavaScript runtime |
| AWS EC2 | Application hosting and development environment |
| GitHub | Source code management |

## Application Features

### Three-Candidate Voting

The application supports three candidates:

1. Johnny
2. Amber
3. Alex

Users can submit votes through the application interface. Each voting transaction updates the corresponding candidate's vote count in the Solidity smart contract.

### Vote Withholding

An additional voting option allows users to withhold their vote rather than select a candidate.

This provides a way to represent voter abstention within the application.

### Election Results

The application includes functionality for retrieving and displaying voting results, including individual candidate totals and additional voting statistics.

### Blockchain Data Retrieval

The React frontend communicates with the deployed Solidity smart contract using Web3.js.

Voting records are retrieved through smart contract read functions, while voting operations are submitted as blockchain transactions.

### Refresh Vote Counts

The Refresh Vote Counts button retrieves the latest voting totals from the blockchain.

This operation does not reset the election results. It retrieves the current values stored by the smart contract.

## Application Architecture

The application consists of three primary components:

**1. Solidity Smart Contract**

The Voting smart contract maintains candidate information and voting totals.

It provides functions for recording votes and retrieving election results.

**2. Hardhat Blockchain**

Hardhat provides a local Ethereum-compatible blockchain for development, testing, and transaction execution.

The development network uses chain ID 31337.

**3. React Frontend**

The React application provides the user interface and communicates with the smart contract through Web3.js and a development proxy.

### Transaction Workflow

1. The user selects a voting option.
2. React invokes the corresponding smart contract function through Web3.js.
3. A transaction is submitted to the Hardhat blockchain.
4. The smart contract updates the voting records.
5. The application retrieves updated election results.
6. The frontend displays the latest totals.

## Project Structure

```text
voting/
├── contracts/
│   └── Voting.sol
├── scripts/
│   └── deploy.js
├── src/
│   ├── App.js
│   ├── App.css
│   ├── setupProxy.js
│   └── contractsData/
│       ├── Voting.json
│       └── Voting-address.json
├── hardhat.config.js
├── package.json
├── package-lock.json
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ladavis-dev/MSIS459-Blockchain-Voting-DApp.git
cd MSIS459-Blockchain-Voting-DApp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Compile the Smart Contract

```bash
npx hardhat compile
```

### 4. Start the Hardhat Blockchain

Open a terminal and execute:

```bash
npx hardhat node
```

The local blockchain will run at:

```text
http://127.0.0.1:8545
```

### 5. Deploy the Voting Contract

Open another terminal:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

The deployment script creates the smart contract and updates the frontend contract address and ABI files.

**Note:** The deployed contract address is specific to the blockchain instance. Restarting the Hardhat node may require redeployment.

### 6. Start the React Application

```bash
npm start
```

Open:

```text
http://localhost:3000
```

When running the application on AWS EC2, the frontend can also be accessed through the instance's configured network address.

The React development proxy forwards blockchain RPC requests to the Hardhat node.

## Testing and Demonstration

The application can be demonstrated by:

1. Starting the Hardhat blockchain.
2. Deploying the Voting smart contract.
3. Launching the React frontend.
4. Submitting votes for Johnny, Amber, and Alex.
5. Demonstrating the vote-withholding functionality.
6. Refreshing and reviewing election results.
7. Observing blockchain transactions in the Hardhat terminal.

The Hardhat terminal provides visibility into contract calls, submitted transactions, and blockchain activity.

## Implementation Challenges

### Dependency Compatibility

The initial Hardhat installation encountered dependency conflicts between Hardhat and its associated toolbox packages.

The issue was resolved by selecting compatible package versions.

### Solidity Compiler Compatibility

The default Hardhat project included a sample Lock contract that required a different Solidity compiler version.

Removing the unused sample contract allowed the Voting contract to compile successfully using Solidity 0.8.18.

### Blockchain Connectivity

Connecting the React application to the Hardhat blockchain required troubleshooting network accessibility, RPC endpoints, and browser cross-origin restrictions.

A React development proxy was used to route RPC requests to the blockchain.

### AWS EC2 Configuration

The application was hosted in an Ubuntu environment on AWS EC2.

The setup involved managing multiple terminal sessions, configuring the blockchain and frontend services, and establishing SSH access.

### GitHub Authentication

Uploading the project required configuring GitHub repository access and authenticating Git operations using a fine-grained personal access token.

## Lessons Learned

This assignment provided practical experience integrating smart contracts with a web application.

It reinforced the distinction between blockchain read operations and transactions that modify blockchain state.

The project also demonstrated the importance of dependency management, deployment configuration, network troubleshooting, and maintaining consistency between deployed contracts and frontend applications.

Expanding the voting system beyond the original example helped demonstrate how blockchain applications can be modified to support additional business requirements.

## Limitations and Future Improvements

This project is an educational prototype rather than a production election system.

Potential future enhancements include:

- Wallet-based voter authentication.
- Restricting each authorized voter to one vote.
- Implementing election start and end times.
- Adding administrative election management.
- Supporting additional candidates.
- Improving voter privacy and ballot confidentiality.
- Deploying to an Ethereum test network.

## Academic Information

**Course:** MSIS 459 – Blockchain

**Project:** Module 2 – Enhanced Blockchain Voting Application

**Repository:** https://github.com/ladavis-dev/MSIS459-Blockchain-Voting-DApp

**Purpose:** Academic demonstration of Solidity smart contracts, blockchain transactions, and decentralized application development.
