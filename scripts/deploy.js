// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")
const { items } = require("../src/items.json")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  //Setup accounts
  const [deployer] = await ethers.getSigners()

  //Deploy Dappazon
  const Dappazon = await hre.ethers.getContractFactory("Dappazon")
  const dappazon = await Dappazon.deploy()
  await dappazon.deployed()
  console.log("Dappazon deployed to:", dappazon.address)

  //List items
  for(let i = 0; i < items.length; i++) {
    const item = items[i]
    const transaction = await dappazon.connect(deployer).listProduct(
      item.id,
      item.name,
      item.category,
      item.image,
      tokens(item.price),
      item.rating,
      item.stock
    )
    await transaction.wait()
    console.log(`Listed ${item.name} for ${item.price} ETH`)
  } 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
