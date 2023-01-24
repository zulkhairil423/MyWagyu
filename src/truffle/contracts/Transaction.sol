// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Wagyu.sol";

contract WagyuTransaction{

  // Mapping of addresses to balance
  address public owner;
  mapping(string => Manufacturer) public manufacturer;

  // Check either the Wagyu meat has been buy or not
  modifier isBought(string memory wagyuID) {
    require (!manufacturer[wagyuID].availability, "The meat has been bought");
    _;
  }

  //Function to change the availability of Wagyu meat
  function wagyuUnavailability (string memory wagyuID) public{
    manufacturer[wagyuID].availability = false;
  }

  // Function to make a transaction from one address to another
  function requestBuy(string memory wagyuID) public isBought(wagyuID){  
    wagyuUnavailability(wagyuID);
  }
}