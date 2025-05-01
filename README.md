# ☕ BuyMe – Crypto Tipping Smart Contract

**BuyMe** is a minimalist smart contract that allows anyone to send ETH tips along with a name and message—just like “Buy Me a Coffee,” but built on the blockchain.  
It’s a great way for creators, developers, and independent builders to receive support from their communities transparently and directly.

---

## ✨ Features

- 💸 Send ETH along with name and message
- 📖 Store all tips publicly as memos
- 🔐 Only the contract owner can withdraw funds
- 🧪 Fully tested with Hardhat

---

## 🔧 Getting Started

### 🛠 Requirements

```txt
- Node.js (v16 or later)
- Hardhat (installed locally or globally)
```

### 📁 Clone & Install

```bash
git clone https://github.com/Stephen-Odumirin/BuyMe.git
cd BuyMe
npm install
```

### 🧱 Compile Contracts

```bash
npx hardhat compile
```

### 🧪 Run Tests

```bash
npx hardhat test
```

---

## 📦 Contract Overview

### 🔹 `buyCoffee()`

```solidity
function buyCoffee(string memory _name, string memory _message) public payable
```

```txt
- Accepts ETH along with a name and message.
- Stores the tipper’s address, message, and timestamp.
```

### 🔹 `getMemos()`

```solidity
function getMemos() public view returns (Memo[] memory)
```

```txt
- Returns an array of all tips (memos) sent so far.
- Each memo includes: sender, time, name, message.
```

### 🔹 `withdrawTips()`

```solidity
function withdrawTips() public
```

```txt
- Allows the contract owner to withdraw all ETH tips.
- Reverts if called by anyone other than the owner.
```

---

## 📜 Sample Memo

```json
{
  "from": "0x123...abc",
  "timestamp": 1714320000,
  "name": "Jane Doe",
  "message": "Keep building!"
}
```

---

## 🧪 Example Test Output

```txt
✔ should allow anyone to send ETH and store a message
✔ should allow the owner to withdraw tips
✔ should prevent others from withdrawing funds
```

> Tests are located in `test/BuyMe.js` and use Mocha + Chai.

---

## 🚀 Roadmap

```txt
[x] ETH tipping with name/message
[x] Owner-only withdrawal function
[ ] Add simple React frontend (Wagmi + RainbowKit)
[ ] Deploy to Sepolia and verify on Etherscan
[ ] IPFS support for memo backups
[ ] Optional NFT receipt for supporters
```

---

## 🛠 Project Structure

```txt
BuyMe/
├── contracts/
│   └── BuyMe.sol           # Main smart contract
├── test/
│   └── BuyMe.js            # Unit tests for contract
├── scripts/
│   └── deploy.js           # Script to deploy on local/testnet
├── hardhat.config.js       # Hardhat setup
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
```

---

## 🧠 Author

```txt
👤 Stephen Odumirin
🔗 https://github.com/Stephen-Odumirin
```

---

## 📄 License

```txt
MIT License

Copyright (c) 2025 Stephen Odumirin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions...

(see LICENSE for full text)
```

---

<div align="center">
  <sub>Built with ☕ by Stephen Odumirin — 2025</sub>
</div>
