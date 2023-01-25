import { useState } from "react";
import Popup from "reactjs-popup";
import "../styles/Item Card.css";
import "../styles/variables.css";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";
import Transaction from '../truffle/build/contracts/WagyuTransaction.json';
import { ethers } from "ethers";
<script src="https://cdn.lordicon.com/fudrjiwc.js"></script>;

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);


//declare the Wagyu.sol contract address inside the variable
const wagyutransaddress = '0xbb22db35249F5E205df64d8493cF798d7fFc093B'

//default owner of store address, can declare as your own wallet address
const wagyustoreaddress = '0x330e92dD4F5b5Ab62026FC880D132e1241E9DC10'

//USD to ether conversion value
const ethervalue = '0.006'

function ItemCard(props) {
  const {age, breed, grade,
    farmerName, farmLoc, halalCareMethod,
    butcherName, butcherLoc, halalslaughterMethod,
    imgRef, dateDistribute, availability} = props.data;
  const { buyWagyu } = props;
  const [openPopup, setOpenPopup] = useState(false);

  async function handleBuy() {
    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const wagyutrans = new ethers.Contract(wagyutransaddress, Transaction.abi, signer) 
      /*Buy your wagyu hear*/ 
      try {
          await wagyutrans.requestBuy("A101")
          const valuetopay = ethers.utils.parseEther(ethervalue)
          const tx = {
            to: wagyustoreaddress,
            value: valuetopay,
            gasLimit: 50000,
          };
          await signer.sendTransaction(tx);
          alert("Successfully bought")
        } catch (error) {
          console.log(error);
        }
   } else {
      alert("Please install Metamask");
   }
  }

  return (
    <div>
      <Popup
        open={openPopup}
        closeOnDocumentClick
        onClose={() => setOpenPopup(false)}
      >
        <div className="modal-header">{grade}</div>
        <div className="modal-container">
          <div className="modal-img">
            <img
              src= {require("../assets/CowA101.webp")}
              alt={grade}
            />
          </div>
          <div className="modal-info">
            <div>
              <p>Breed: {breed}</p>
              <p>Age: {age}</p>
              {halalCareMethod.toLowerCase() === "halal" &&
              halalslaughterMethod.toLowerCase() === "halal" ? (
                <p className=" halal">Halal</p>
              ) : (
                <p className=" haram">Haram</p>
              )}
              <p>Date Distributed: {dateDistribute}</p>
            </div>
            <div>
              <p>Farmer Name: {farmerName}</p>
              <p>Farmer Location: {farmLoc}</p>
              <p>Butcher Name: {butcherName}</p>
              <p>Butcher Location: {butcherLoc}</p>
            </div>
          </div>
        </div>
      </Popup>
      <div className="card">
        <div className="card-img">
          <img
            src= {require("../assets/CowA101.webp")}
            alt={grade}
          />
        </div>
        <div className="card-info">
          <p className="text-title">{grade}</p>
          <p className="text-body">Breed: {breed}</p>
          <p className="text-body">Age: {age}</p>
          {halalCareMethod.toLowerCase() === "halal" &&
          halalslaughterMethod.toLowerCase() === "halal" ? (
            <p className="text-body halal">Halal</p>
          ) : (
            <p className="text-body haram">Haram</p>
          )}
          <p className="text-body">
            Date Distributed: {dateDistribute}
          </p>
        </div>
        <div className="card-footer">
          <span className="text-title">$499.49</span>
          <span onClick={() => setOpenPopup(true)}>
            <lord-icon
              src="https://cdn.lordicon.com/dnmvmpfk.json"
              trigger="hover"
              colors="primary:#d3d3d3"
              className="info-btn"
              scale="60"
            ></lord-icon>
          </span>
          <div className="card-button" onClick={handleBuy}>
            <lord-icon
              src="https://cdn.lordicon.com/slkvcfos.json"
              trigger="hover"
              stroke="100"
              colors="primary:#f5f5f5,secondary:#d3d3d3"
            ></lord-icon>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
