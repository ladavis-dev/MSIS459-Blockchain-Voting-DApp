
import React, { Component } from "react";
import Web3 from "web3";
import VotingAbi from "./contractsData/Voting.json";
import VotingAddress from "./contractsData/Voting-address.json";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: "",
      contract: null,
      candidates: ["Johnny", "Amber", "Alex"],
      votes: {},
      totalVotes: 0,
      status: "Connecting to blockchain...",
      votingInProgress: false
    };
  }

  async componentDidMount() {
    try {
      // Use the existing React RPC proxy.
      const web3 = new Web3(
        new Web3.providers.HttpProvider(
          `${window.location.origin}/rpc`
        )
      );

      const accounts = await web3.eth.getAccounts();

      if (!accounts.length) {
        throw new Error("No blockchain accounts available");
      }

      const contract = new web3.eth.Contract(
        VotingAbi.abi,
        VotingAddress.address
      );

      const candidates =
        await contract.methods.getCandidateList().call();

      this.setState(
        {
          account: accounts[0],
          contract,
          candidates,
          status: "Connected to blockchain"
        },
        this.loadVotes
      );

    } catch (error) {
      console.error("Blockchain connection error:", error);
      this.setState({ status: "Connection failed" });
    }
  }

  loadVotes = async () => {
    const { contract, candidates } = this.state;

    if (!contract) return;

    try {
      const votes = {};

      for (const candidate of [...candidates, "Withhold"]) {
        const count = await contract.methods
          .totalVotesFor(candidate)
          .call();

        votes[candidate] = Number(count);
      }

      const total = await contract.methods
        .getTotalVotes()
        .call();

      this.setState({
        votes,
        totalVotes: Number(total),
        status: "Vote counts updated successfully"
      });

    } catch (error) {
      console.error("Error reading votes:", error);
      this.setState({ status: "Failed to read votes" });
    }
  };

  voting = async (candidate) => {
    const { contract, account, votingInProgress } = this.state;

    if (!contract || !account || votingInProgress) return;

    this.setState({
      votingInProgress: true,
      status: `Submitting ${candidate} vote...`
    });

    try {
      await contract.methods
        .voteForCandidate(candidate)
        .send({
          from: account,
          gas: 140000
        });

      await this.loadVotes();

      this.setState({
        status: `${candidate} vote recorded successfully!`
      });

    } catch (error) {
      console.error("Voting error:", error);
      this.setState({ status: "Voting failed" });

    } finally {
      this.setState({ votingInProgress: false });
    }
  };

  render() {
    const {
      candidates,
      votes,
      totalVotes,
      status,
      contract,
      votingInProgress
    } = this.state;

    const selections = [...candidates, "Withhold"];

    const percentage = (count) =>
      totalVotes > 0
        ? ((count / totalVotes) * 100).toFixed(1)
        : "0.0";

    const leader = candidates.reduce(
      (best, candidate) =>
        (votes[candidate] || 0) > (votes[best] || 0)
          ? candidate
          : best,
      candidates[0]
    );

    const leadingVotes = votes[leader] || 0;
    const tiedLeaders = candidates.filter(
      candidate => (votes[candidate] || 0) === leadingVotes
    );

    const leaderLabel =
      leadingVotes === 0
        ? "No votes yet"
        : tiedLeaders.length > 1
          ? "Tie"
          : leader;

    return (
      <div className="App">
        <h1>MSIS 459 - Blockchain Voting DApp</h1>
        <p>Hardhat + Solidity + React + Web3.js</p>

        <h2>Cast Your Vote</h2>

        <div className="candidates">
          {selections.map(candidate => (
            <div className="candidate" key={candidate}>
              <h3>
                {candidate === "Withhold"
                  ? "Withhold Vote"
                  : candidate}
              </h3>

              <h2>{votes[candidate] ?? 0} Votes</h2>

              <button
                disabled={!contract || votingInProgress}
                onClick={() => this.voting(candidate)}
              >
                {candidate === "Withhold"
                  ? "Withhold Vote"
                  : `Vote for ${candidate}`}
              </button>
            </div>
          ))}
        </div>

        <h2>Live Election Results</h2>

        <div className="results-summary">
          <h3>Total Ballots: {totalVotes}</h3>
          <h3>Leading Candidate: {leaderLabel}</h3>
        </div>

        <div className="results-dashboard">
          {selections.map(candidate => {
            const count = votes[candidate] || 0;
            const pct = percentage(count);

            return (
              <div className="result-row" key={candidate}>
                <div className="result-label">
                  <span>{candidate}</span>
                  <span>{pct}% ({count} votes)</span>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={this.loadVotes}
          disabled={!contract || votingInProgress}
        >
          Refresh Vote Counts
        </button>

        <p>Status: {status}</p>
        <p className="network-status">
          Blockchain Connected | Hardhat Local Network
        </p>
      </div>
    );
  }
}

export default App;
