
const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const Voting = await hre.ethers.getContractFactory("Voting");

  const voting = await Voting.deploy();
  await voting.waitForDeployment();

  const contractAddress = await voting.getAddress();

  console.log("Voting deployed to:", contractAddress);

  const contractsDir = path.join(
    __dirname,
    "../src/contractsData"
  );

  fs.mkdirSync(contractsDir, { recursive: true });

  fs.writeFileSync(
    path.join(contractsDir, "Voting-address.json"),
    JSON.stringify(
      { address: contractAddress },
      null,
      2
    )
  );

  const artifact = await hre.artifacts.readArtifact("Voting");

  fs.writeFileSync(
    path.join(contractsDir, "Voting.json"),
    JSON.stringify(artifact, null, 2)
  );

  console.log("Frontend contract files updated successfully");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
