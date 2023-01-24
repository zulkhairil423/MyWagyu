import "../styles/Homepage.css"
import NavBar from "./NavBar"
import ItemCard from "./Item Card"
import data from "./Data Sample.json";
import Wagyu from 'C:/Users/LeonyX/Documents/Blockchain/.vscode/GroupProject/mywagyu/src/truffle/build/contracts/WagyuInfo.json';
import { ethers } from "ethers";

//declare the Wagyu.sol contract address inside the variable
const wagyuinfoaddress = '0xfB89012a6A40c8A26e18343E2D41DAD28F872642'

const Homepage = () => {

    async function buyWagyu(key) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(wagyuinfoaddress, Wagyu.abi, signer);
        try {
            const wagyuID = await contract.getwagyuID();
            for(let i=0; i<wagyuID.length; i++){
                const wagyudata = await contract.getWagyuInfo(wagyuID[i]);
                const manudata = await contract.getDetailedWagyuInfo(wagyuID[i]);
                console.log(wagyudata);
                console.log(manudata);
                const objects = [
                    {id: wagyuID[i], wagyudata, manudata}
                ];
            }

        } catch(error){
            alert(error)
        }
        

        /*Know your wagyu here*/ 
    }

    return (
        <div className="navbar-container">
            <NavBar/>
            <div className="card-container">
                {Object.keys(data).map((key)=>{
                  return <ItemCard data={data[key]} key={key} buyWagyu={buyWagyu(key)}/>
                })}
            </div>
        </div>
    )

}

export default Homepage