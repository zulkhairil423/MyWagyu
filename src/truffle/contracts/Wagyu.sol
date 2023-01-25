// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

//data structure for Wagyu Cow Care Information
struct Wagyu {
  string age;
  string breed;
  string grade;
  string farmerName;
  string farmLoc;
  string halalCareMethod;
  }

//data structure for Wagyu Meat Processing Information
struct Manufacturer {
  string butcherName;
  string butcherLoc;
  string halalslaughterMethod;
  string imgRef;
  string dateDistribute;
  bool availability;
}

//Contract to create, update and store the information of wagyu into struct datastructure
contract WagyuInfo {

  //array of ID of all wagyu
  string[] wID;

  //mapping the struct datastructure to one string reference
  mapping(string => Wagyu) public wagyu;
  mapping(string => Manufacturer) public manufacturer;

  //Check either the meat has reach the manufacturing process or not
  modifier isDistribute(string memory wagyuID) {
    require (!manufacturer[wagyuID].availability, "The meat is not manufactured yet");
    _;
  }

  //this function is to add information Wagyu Cow Care into struct Wagyu
  function addWagyu (string memory wagyuID, string memory _age, string memory breed, string memory grade, string memory farmerName,  string memory farmLoc, 
  string memory halalCareMethod) public {
    wID.push(wagyuID);
    Wagyu memory newWagyu;
    newWagyu.age = _age;
    newWagyu.breed = breed;
    newWagyu.grade = grade;
    newWagyu.farmerName = farmerName;
    newWagyu.farmLoc = farmLoc;
    newWagyu.halalCareMethod = halalCareMethod;
    wagyu[wagyuID] = newWagyu;
  }

  //Declare a function to change the availability of wagyu
  function wagyuAvailability (string memory wagyuID) public isDistribute(wagyuID){
    manufacturer[wagyuID].availability = true;
  }

  //Declare a function to add information of Wagyu Meat Processing into struct Manufacturer
  function addManufacturer (string memory wagyuID, string memory butcherName, string memory butcherLoc, string memory halalslaughterMethod, string memory imgRef, string memory dateDistribute) public {
    Manufacturer memory newManufacturer;
    wagyuAvailability(wagyuID);
    newManufacturer.butcherName = butcherName;
    newManufacturer.butcherLoc = butcherLoc;
    newManufacturer.halalslaughterMethod = halalslaughterMethod;
    newManufacturer.imgRef = imgRef;
    newManufacturer.dateDistribute = dateDistribute;
    manufacturer[wagyuID] = newManufacturer;
  } 

  //Function to retrieve information of Wagyu Cow Care phases
  function getWagyuInfo(string memory wagyuID) public view returns(Wagyu memory){
    return wagyu[wagyuID];
  }

  //Function to retrieve information of Wagyu Meat Processing phases
  function getDetailedWagyuInfo(string memory wagyuID) public view returns(Manufacturer memory){
    return manufacturer[wagyuID];
  }

  function getwagyuID() public view returns (string[] memory){
    return wID;
  }
  
  //Declare initial value of WagyuInfo block
  constructor(){
    addWagyu("CowA101", "12", "Japanese Black", "A1", "Ahmad","Japan","halal");
    addManufacturer("CowA101", "Rahim", "Japan", "Haram", "CowA101.webp", "12 Dec 2020");
    addWagyu("CowA201", "13", "Wagyu", "A2", "John","Australia","halal");
    addManufacturer("CowA201", "David", "Australia", "Halal", "CowA201.webp", "15 Dec 2020");
    addWagyu("CowA301", "15", "Angus", "A3", "Jenna","USA","non-halal");
    addManufacturer("CowA301", "Liam", "USA", "non-halal", "CowA301.webp", "18 Dec 2020");
    addWagyu("CowA401", "18", "Hereford", "A4", "Hannah","New Zealand","halal");
    addManufacturer("CowA401", "Emily", "New Zealand", "Halal", "CowA401.webp", "20 Dec 2020");
    addWagyu("CowA102", "14", "Australian Black", "A1", "John","Australia","halal");
    addManufacturer("CowA102", "Michael", "Australia", "halal", "CowA102.webp", "12 Dec 2020");
    addWagyu("CowA103", "16", "American Black", "A1", "Steve","USA","halal");
    addManufacturer("CowA103", "Bill", "USA", "Halal", "CowA103.webp", "16 Dec 2020");
  }
}