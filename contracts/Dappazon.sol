// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Dappazon {
    //string public name;
    address public owner;

    struct Product {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    struct Order{
        uint256 timestamp;
        Product product;
    }

    mapping(uint256 => Product) public products;
    mapping(address => uint256) public orderCount;
    mapping(address => mapping(uint256 => Order)) public orders;

    event ProductListed(
        string name,
        uint256 cost,
        uint256 stock
    );

    event Buy(address buyer, uint256 orderId, uint256 itemId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor(){
        //name = "Dappazon";
        owner = msg.sender;
    }

    

    //List products for sale
    function listProduct(
        uint256 _id,
        string memory _name, 
        string memory _category, 
        string memory _image, 
        uint256 _cost,
        uint256 _rating,
        uint256 _stock) 
    public onlyOwner() {
        //Create product struct
        Product memory newProduct = Product({
            id: _id,
            name: _name,
            category: _category,
            image: _image,
            cost: _cost,
            rating: _rating,
            stock: _stock
        });

        //Save product to blockchain
        products[_id] = newProduct;

        //Emit event
        emit ProductListed(_name, _cost, _stock);
    }

    //Buy products
    function buyProduct(uint256 _id) public payable {
        
        Product memory product = products[_id];

        //Require enough ether to buy product
        require(msg.value >= product.cost, "Not enough ether sent");

        //Require product in stock
        require(product.stock > 0, "Product not in stock");

        //Create an order
        Order memory newOrder = Order({
            timestamp: block.timestamp,
            product: product
        });

        //Add order for user
        orderCount[msg.sender]++;
        orders[msg.sender][orderCount[msg.sender]] = newOrder;

        //Subract stock
        products[_id].stock--;

        //Emit event
        emit Buy(msg.sender, orderCount[msg.sender], _id);

        // //Check if product exists
        // require(products[_id].id != 0, "Product does not exist");
        // //Check if product is in stock
        // require(products[_id].stock >= _quantity, "Not enough stock");
        // //Check if user has sent enough ether
        // require(msg.value >= products[_id].cost * _quantity, "Not enough ether sent");

        // //Update product stock
        // products[_id].stock -= _quantity;

        // //Transfer ether to owner
        // payable(owner).transfer(msg.value);
    }

    //Withdraw funds
    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Transfer failed.");
    }


}
