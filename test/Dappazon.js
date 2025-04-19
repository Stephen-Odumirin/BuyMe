const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

const ID = 1
const NAME = "iPhone 13"
const CATEGORY = "Gadgets"
const IMAGE = "IMAGE"
const PRICE = tokens(1)
const RATING = 4
const STOCK = 5   

describe("Dappazon", () => {

  let dappazon;
  let deployer, buyer;

  beforeEach(async () => {
    // Setup accounts
    [deployer, buyer] = await ethers.getSigners();

    // Deploy contract
    const Dappazon = await ethers.getContractFactory("Dappazon");
    dappazon = await Dappazon.deploy();
  }
  )

  describe("Deployment", () => {
    it("Sets the owner", async () => {
      const owner = await dappazon.owner();
      expect(owner).to.equal(deployer.address);
    })
  })

  describe("Listing items", () => {
    let transaction
    

    beforeEach(async () => {
      transaction = await dappazon.connect(deployer)
      .listProduct(
        ID,
        NAME,
        CATEGORY,
        IMAGE,
        PRICE,
        RATING,
        STOCK
      )
      await transaction.wait()
    })

    it("Returns product details", async () => {
      const product = await dappazon.products(ID)
      expect(product.id).to.equal(ID)
      expect(product.name).to.equal(NAME)
      expect(product.category).to.equal(CATEGORY)
      expect(product.image).to.equal(IMAGE)
      expect(product.cost).to.equal(PRICE)
      expect(product.rating).to.equal(RATING)
      expect(product.stock).to.equal(STOCK)

    })

    it("Emits a ProductListed event", async () => {
      expect(transaction).to.emit(dappazon,"ProductListed")
       

    })



  })

  describe("Buying products", () => {
    let transaction

    beforeEach(async () => {
      transaction = await dappazon.connect(deployer)
      .listProduct(
        ID,
        NAME,
        CATEGORY,
        IMAGE,
        PRICE,
        RATING,
        STOCK
      )
      await transaction.wait()
    })

    beforeEach(async () => {
      transaction = await dappazon.connect(buyer)
      .buyProduct(ID, { value: PRICE })
    })

    it("Updates the contract balance", async () => {
      const result = await ethers.provider.getBalance(dappazon.address)
      expect(result).to.equal(PRICE)
    })

    it("Updates buyer's order count", async () => {
      const result = await dappazon.orderCount(buyer.address)
      expect(result).to.equal(1)
    })

    it("Adds order to buyer's orders", async () => {
      const order = await dappazon.orders(buyer.address, 1)

      expect(order.timestamp).to.be.greaterThan(0)
      expect(order.product.name).to.equal(NAME)
    })

    it("Emits a ProductBought event", async () => {
      expect(transaction).to.emit(dappazon,"Buy")
    })

  })

  describe("Withdrawing funds", () => {
    let balanceBefore

    beforeEach(async () => {
      // List a product
      let transaction = await dappazon.connect(deployer)
      .listProduct(
        ID,
        NAME,
        CATEGORY,
        IMAGE,
        PRICE,
        RATING,
        STOCK
      )
      await transaction.wait()

      // Buy the product
      transaction = await dappazon.connect(buyer)
      .buyProduct(ID, { value: PRICE })
      await transaction.wait()

      // Check the contract balance
      balanceBefore = await ethers.provider.getBalance(dappazon.address)

      // Withdraw funds
      transaction = await dappazon.connect(deployer).withdraw()
      await transaction.wait()

    })

    it("Updates the owner balance", async () => {
      const balanceAfter = await ethers.provider.getBalance(deployer.address)
      expect(balanceAfter).to.be.greaterThan(balanceBefore)
    })

    it("Updates the contract balance", async () => {
      const result = await ethers.provider.getBalance(dappazon.address)
      expect(result).to.equal(0)
    })



  })
                                                                                                                   
})
