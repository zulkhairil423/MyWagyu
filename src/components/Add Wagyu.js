import { useState } from "react";
import "../styles/Add Wagyu.css";
import NavBar from "./NavBar";
import Wagyu from 'C:/Users/LeonyX/Documents/Blockchain/.vscode/GroupProject/mywagyu/src/truffle/build/contracts/WagyuInfo.json';
import { ethers } from "ethers";

//declare the Wagyu.sol contract address inside the variable
const wagyuinfoaddress = '0xfB89012a6A40c8A26e18343E2D41DAD28F872642'

const AddWagyu = () => {
    const [wagyuId, setWagyuId] = useState("");
    const [age, setAge] = useState("");
    const [breed, setBreed] = useState("");
    const [grade, setGrade] = useState("");
    const [farmerName, setFarmerName] = useState("");
    const [farmLoc, setFarmLoc] = useState("");
    const [isHalal, setIsHalal] = useState("");

    //function that connect the front end with the smart contract and send addwagyuinfo data into the blockchain
    async function addwagyu() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(wagyuinfoaddress, Wagyu.abi, signer);
      const addwagyuinfo = await contract.addWagyu(wagyuId, age, breed, grade, farmerName, farmLoc, isHalal);
      await addwagyuinfo.wait();
      console.log(addwagyuinfo);
      alert("Wagyu livestock information successfully added")
    }

    //once pressed on addwagyu button, this const will ask for confirmation from user before proceed to addwagyu function
    const submitbutton = () => {
      const answer = window.confirm("Are you sure you want to submit the Wagyu livestock details?");
      if (answer) {
        addwagyu();
      } else {
        console.log("Livestock information was not uploaded.");
      }

    }

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.name === "wagyuId") {
            setWagyuId(e.target.value);
        } else if (e.target.name === "age") {
            setAge(e.target.value);
        } else if (e.target.name === "breed") {
            setBreed(e.target.value);
        } else if (e.target.name === "grade") {
            setGrade(e.target.value);
        } else if (e.target.name === "farmerName") {
            setFarmerName(e.target.value);
        } else if (e.target.name === "farmLoc") {
            setFarmLoc(e.target.value);
        } else if (e.target.name === "isHalal") {
            setIsHalal(e.target.value);
        }
    };

    

    return (
        <div className="navbar-container farmer">
        <NavBar />
            <div className="farmer-container">
                <div className="farmer-header">
                <h1>Add Wagyu</h1>
                </div>
                <div className="farmer-body">
                    <div>
                        <label className="input-label">WagyuID </label>
                        <input
                        placeholder="Enter Cow's ID"
                        name="wagyuId"
                        value={wagyuId}
                        className="input"
                        type="text"
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="input-label">Age </label>
                        <input
                        placeholder="Enter Cow's Age"
                        name="age"
                        value={age}
                        className="input"
                        type="text"
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="input-label">Breed </label>
                        <input
                        placeholder="Enter Cow's Breed"
                        name="breed"
                        value={breed}
                        className="input"
                        type="text"
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="input-label">Grade </label>
                        <input
                        placeholder="Enter Cow's Grade"
                        name="grade"
                        value={grade}
                        className="input"
                        type="text"
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="input-label">Farmer's Name </label>
                        <input
                        placeholder="Enter Your Name"
                        name="farmerName"
                        value={farmerName}
                        className="input"
                        type="text"
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="input-label">Farm Location </label>
                        <input
                        placeholder="Enter Farm's Location"
                        name="farmLoc"
                        value={farmLoc}
                        className="input"
                        type="text"
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="input-label">Halal Status </label>
                        <input
                        placeholder="Enter Halal Status"
                        name="isHalal"
                        value={isHalal}
                        className="input"
                        type="text"
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <span className="farmer-btn">
                            <button class="btn" onClick={submitbutton}>
                                <span class="btn-text-one">Add Wagyu</span>
                                <span class="btn-text-two">
                                    <svg
                                        width="140"
                                        height="40"
                                        viewBox="0 0 256 417"
                                        xmlns="http://www.w3.org/2000/svg"
                                        preserveAspectRatio="xMidYMid"
                                    >
                                        <path
                                        fill="#343434"
                                        d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"
                                        />
                                        <path
                                        fill="#8C8C8C"
                                        d="M127.962 0L0 212.32l127.962 75.639V154.158z"
                                        />
                                        <path
                                        fill="#3C3C3B"
                                        d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"
                                        />
                                        <path
                                        fill="#8C8C8C"
                                        d="M127.962 416.905v-104.72L0 236.585z"
                                        />
                                        <path
                                        fill="#141414"
                                        d="M127.961 287.958l127.96-75.637-127.96-58.162z"
                                        />
                                        <path fill="#393939" d="M0 212.32l127.96 75.638v-133.8z" />
                                    </svg>
                                </span>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddWagyu;
