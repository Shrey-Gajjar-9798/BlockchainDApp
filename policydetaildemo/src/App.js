import "../src/demo.css";
import { useState , useEffect} from "react";
const { ethers } = require("ethers");

function App() {
    const [insname, setinsname] = useState();
    const [proname, setproname] = useState();
    const [policyno, setpolicyno] = useState();
    const [expyear, setexpyear] = useState();
    const [liability, setliability] = useState("GL");
    const [radio, setradio] = useState();
    const [amount, setamount] = useState();
    
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractadress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const abi = [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "checkno",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "getbypolicyno",
        "outputs": [
          {
            "internalType": "string",
            "name": "insname",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "proname",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "policyno",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "expyear",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "liability",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "empliability",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_policyno",
            "type": "uint256"
          }
        ],
        "name": "getdata",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          },
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
            "internalType": "string",
            "name": "_insname",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_proname",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_policyno",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_expyear",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_liability",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "_empliability",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];

    const contract = new ethers.Contract(contractadress,abi,signer);

    useEffect(() => {
      const requestAccounts = async () => {
        await provider.send("eth_requestAccounts", []);
      }

      requestAccounts()
        .catch(console.error)

    }, []);

    const handleinsname = (e) =>{
      setinsname(e.target.value);
    };
    const handleproname = (e) =>{
      setproname(e.target.value);
    };
    const handlepolicyno = (e) =>{
      setpolicyno(e.target.value);
    };
    const handleexpyear = (e) =>{
      setexpyear(e.target.value);
    };
    const handleliability = (e) =>{
      setliability(e.target.value);
    };
    const handleamount = (e) =>{
      setamount(e.target.value);
    };
    const radioChange = (e) => {
        setradio(e.target.value);
    };

    const checkvalue = async (e) =>{
      e.preventDefault();
      try {
        const store = await contract.store(insname, proname,parseInt(policyno),parseInt(expyear),liability,radio,parseInt(amount));
      } catch (error) {
        alert(error);
      }
      console.log("Values are stored");
      
      console.log(insname);
      console.log(proname);
      console.log(parseInt(policyno));
      console.log(parseInt(expyear));
      console.log((liability));
      console.log(radio);
      console.log(parseInt(amount));
    };

  return (
    <div className="main-block">
        <div className="left-part">
            <img src="https://www.injala.com/images/logo.svg" alt="injala image" srcset="" />
            <h2>Evolution in risk management.</h2>
        </div>
        <form onSubmit={checkvalue}>
            <div className="title">
                <i className="fas fa-pencil-alt"></i>
                <h2>Policy Details</h2>
            </div>
            <div className="info">
                <input className="fname" type="text" value={insname} onChange={handleinsname} name="Inname" placeholder="Insurance Company Name" />
                <input className="fname" type="text" name="Prname" value={proname} onChange={handleproname} placeholder="Producer Name" />
                <input type="number" value={policyno} onChange={handlepolicyno} name="policynumber" placeholder="Policy Number" />
                <input type="number" value={expyear} onChange={handleexpyear} name="year" placeholder="Policy Exp year" />
                <select value={liability} onChange={handleliability}>
                    <option value="GL">General Liability</option>
                    <option value="AL">Automobile Liability</option>
                    <option value="UL">Umbrella Liability</option>
                    <option value="EL">Excess Liability</option>
                </select>
                <div className="radiobutton">
                    Employee Liability<br /><br />
                    <input type="radio" name="employeelia" onChange={radioChange} id="employeetrue" value="true" /><label
                        for="employeetrue">Yes  </label>
                    <input type="radio" name="employeelia" onChange={radioChange} id="employeefalse" value="false" />
                    <label for="employeefalse">No</label>
                </div>
                <input type="number" name="amount" value={amount} onChange={handleamount} placeholder="Amount" />
            </div>
            <button type="submit" onSubmit={checkvalue} href="/">Submit</button>
        </form>
    </div>
  );
}

export default App;