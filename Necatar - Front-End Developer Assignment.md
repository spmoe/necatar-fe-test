# Front-End Developer Assignment: Next.js Application for Token Minter Contract with NAV Management

**Objective:**
Create a Next.js application that interacts with a deployed Token Minter smart contract, allowing users to mint tokens, update the NAV, and check token balances using the WAGMI library for Ethereum interaction.

## Requirements

1. **Project Setup:**
   - Initialize a new Next.js project.
   - Set up a basic folder structure with the following directories: `pages`, `components`, `contracts`, `utils`.

2. **Smart Contract Interaction:**
   - Assume a Token Minter smart contract is deployed on a local Ethereum test network.
   - The smart contract has the following functions:
     - `mint(address to, uint256 amount)`
     - `updateNAV(uint256 newNav)`
     - `nav()` - returns the current NAV.
     - `balanceOf(address account)` - returns the token balance of the given address.
   - You will be provided with the ABI and contract address.

3. **WAGMI Integration:**
   - Use the WAGMI library to interact with the smart contract.
   - Create a `utils/wagmi.js` file to handle WAGMI setup and provider configuration.

4. **Components:**
   - **TokenMinter.js**: A component to mint new tokens.
     - Inputs for the number of tokens to mint and the recipient address.
     - Button to trigger the minting process.
   - **NAVManager.js**: A component to display and update the NAV.
     - Display the current NAV.
     - Input for the new NAV value and a button to update it.
   - **TokenBalance.js**: A component to display the token balance of a given address.
     - Input for the address and a button to fetch the balance.

5. **Pages:**
   - **index.js**: The main page that imports and uses the above components.
   - **_app.js**: Ensure global CSS is included and WAGMI provider is initialized.

Solidity contract for the Token Minter with NAV management functionality. This contract uses OpenZeppelin libraries for the ERC20 token standard and Ownable functionality.

## TokenMinter.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenMinter is ERC20, Ownable {
    uint256 public nav;

    constructor() ERC20("MyToken", "MTK") {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function updateNAV(uint256 newNav) external onlyOwner {
        nav = newNav;
    }
}
```

## Explanation

- The `TokenMinter` contract inherits from OpenZeppelin's `ERC20` and `Ownable` contracts.
- The `mint` function allows the owner of the contract to mint new tokens to a specified address.
- The `updateNAV` function allows the owner to update the NAV (Net Asset Value).
- The `nav` public variable stores the current NAV.

## Deployment Instructions

1. **Set Up Truffle or Hardhat:**

   - For Hardhat:
     ```bash
     npx hardhat
     ```

2. **Install OpenZeppelin Contracts:**
   ```bash
   npm install @openzeppelin/contracts
   ```

3. **Compile and Deploy:**

   - For Hardhat:
     **scripts/deploy.js:**
     ```javascript
     async function main() {
       const TokenMinter = await ethers.getContractFactory("TokenMinter");
       const tokenMinter = await TokenMinter.deploy();
       await tokenMinter.deployed();
     
       console.log("TokenMinter deployed to:", tokenMinter.address);
     }
     
     main()
       .then(() => process.exit(0))
       .catch((error) => {
         console.error(error);
         process.exit(1);
       });
     ```
   
     ```bash
     npx hardhat run scripts/deploy.js --network localhost
     ```

## Sample ABI and Address

After deploying the contract, you will get the ABI and contract address. Use these in your Next.js application to interact with the smart contract.

**Example ABI (simplified for illustration):**
```json
{
  "abi": [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "newNav",
          "type": "uint256"
        }
      ],
      "name": "updateNAV",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "nav",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "address": "0xYourContractAddress"
}
```

Use the contract ABI and address to interact with your smart contract in the Next.js application.