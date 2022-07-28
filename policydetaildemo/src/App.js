import "../src/demo.css";
import { useState, useEffect } from "react";
const { ethers } = require("ethers");

function App() {
  const [insname, setinsname] = useState();
  const [proname, setproname] = useState();
  const [policyno, setpolicyno] = useState();
  const [expyear, setexpyear] = useState();
  const [liability, setliability] = useState("GL");
  const [radio, setradio] = useState();
  const [amount, setamount] = useState();
  const [checkupdates, setcheckupdates] = useState();


  const [fetchpolicyno, setfetchpolicyno] = useState();
  const [fetchinsname, setfetchinsname] = useState();
  const [fetchproname, setfetchproname] = useState();
  const [fetchexpyear, setfetchexpyear] = useState();
  const [fetchliability, setfetchliability] = useState("");
  const [fetchradio, setfetchradio] = useState();
  const [fetchamount, setfetchamount] = useState();
  const [totalchanges, settotalchanges] = useState();
  const [checkhash, setcheckhash] = useState();
  const [logfile, setlogfile] = useState([]);
  const [blockinfo, setblockinfo] = useState();


  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractadress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "Logdata",
      "type": "event"
    },
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
        },
        {
          "internalType": "int256",
          "name": "totalupdates",
          "type": "int256"
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
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "logofpolicyno",
      "outputs": [
        {
          "internalType": "address",
          "name": "updateperson",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "blockno",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "updatetype",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "prevvalue",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "updatevalue",
          "type": "string"
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
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "updateForm",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  const contract = new ethers.Contract(contractadress, abi, signer);

  useEffect(() => {
    const requestAccounts = async () => {
      await provider.send("eth_requestAccounts", []);
    }

    requestAccounts()
      .catch(console.error)

  }, []);

  const handleinsname = (e) => {
    setinsname(e.target.value);
  };
  const handlecheckhash = (e) => {
    setcheckhash(e.target.value);
  };
  const handlefetchinsname = (e) => {
    setfetchinsname(e.target.value);
  };
  const handleproname = (e) => {
    setproname(e.target.value);
  };
  const handlefetchproname = (e) => {
    setfetchproname(e.target.value);
  };
  const handlepolicyno = (e) => {
    setpolicyno(e.target.value);
  };
  const handleexpyear = (e) => {
    setexpyear(e.target.value);
  };
  const handlefetchexpyear = (e) => {
    setfetchexpyear(e.target.value);
  };
  const handleliability = (e) => {
    setliability(e.target.value);
  };
  const handlefetchliability = (e) => {
    setfetchliability(e.target.value);
  };
  const handleamount = (e) => {
    setamount(e.target.value);
  };
  const handlefetchamount = (e) => {
    setfetchamount(e.target.value);
  };
  const radioChange = (e) => {
    setradio(e.target.value);
  };
  const radiofetchChange = (e) => {
    setfetchradio(e.target.value);
  };
  const handlefetchpolicyno = (e) => {
    setfetchpolicyno(e.target.value);
  };
  const handlecheckupdate = (e) => {
    setcheckupdates(e.target.value);
  };

  const checkvalue = async (e) => {
    e.preventDefault();
    try {
      const store = await contract.store(insname, proname, parseInt(policyno), parseInt(expyear), liability, radio, parseInt(amount));
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
  const overwrite = async (e) => {
    e.preventDefault();
    try {
      const store = await contract.updateForm(fetchinsname, fetchproname, parseInt(fetchpolicyno), parseInt(fetchexpyear), fetchliability, parseInt(fetchamount));
    } catch (error) {
      alert(error);
    }
    console.log("The overwrite values are : ");
    console.log(fetchinsname);
    console.log(fetchproname);
    console.log(parseInt(fetchpolicyno));
    console.log(parseInt(fetchexpyear));
    console.log((fetchliability));
    console.log(fetchradio);
    console.log(parseInt(fetchamount));
  };

  const updateData = async (e) => {
    try {
      const checkfirst = await contract.checkno(fetchpolicyno);
      if (checkfirst) {
        console.log(contract.checkno(fetchpolicyno));
        const store = await contract.getbypolicyno(fetchpolicyno);
        setfetchinsname(store.insname);
        setfetchproname(store.proname);
        setfetchexpyear(store.expyear.toNumber());
        setfetchliability(store.liability);
        setfetchradio(store.empliability);
        setfetchamount(store.amount.toNumber());
        settotalchanges(store.totalupdates.toNumber());
      } else {
        alert("No data for this policy number found !,Pls check it")
        setfetchinsname("");
        setfetchproname("");
        setfetchexpyear("");
        setfetchliability("");
        setfetchradio("");
        setfetchamount("");
      }
    }
    catch (error) {
      alert(error);
    }
    console.log(fetchinsname);
    console.log(fetchproname);
    console.log(fetchpolicyno);
    console.log(fetchexpyear);
    console.log(fetchliability);
    console.log(fetchradio);
    console.log(fetchamount);
  };

    const getlogfile = async(e) =>{
      const policydata = await contract.getbypolicyno(checkupdates);
      const totalvalue = policydata.totalupdates.toNumber();
      const policycheck = await contract.checkno(checkupdates);
      console.log(totalvalue);
      if(policycheck == false){
      alert("No Policy Data Found");
      setlogfile([]);
     } 
     else{
       let getfile = [];
      for (let i = 0; i < totalvalue; i++) {
        getfile[i] = await contract.logofpolicyno(checkupdates,i);
      }
      setlogfile(getfile);
    }
    console.log(logfile);
    
  }
  const gethash =async () =>{
    console.log(checkhash);
    try {
      
      provider.getBlock(parseInt(checkhash)).then(function(block) {
        console.log(block);
        if(block == null){
          setblockinfo('');
        }
        else{setblockinfo(block.hash);}
      });
    } catch (error) {
      console.log(error);
    }
      
    
  };
  return (
    <>
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
      <br></br>
      <br></br>
      <br></br>
      <h1 className="middleheading">You cannot change the data in blockchain</h1>
      <br></br>
      <br></br>
      <div className="main-block">
        <div className="left-part">
          <img src="https://www.injala.com/images/logo.svg" alt="injala image" srcset="" />
          <h2>You can update the data from here</h2>
          <br></br><h2>Total changes to this Policy No: {totalchanges}</h2>
          <br></br>
          <br></br>
          <input type="number" value={fetchpolicyno} onChange={handlefetchpolicyno} name="policynumber" placeholder="Policy Number" />
          <button type="button" className="btnstyle" onClick={updateData} >Get Data</button>
        </div>
        <form onSubmit={overwrite}>
          <div className="title">
            <i className="fas fa-pencil-alt"></i>
            <h2>Policy Details</h2>
          </div>
          <div className="info">
            <input className="fname" type="text" value={fetchinsname} onChange={handlefetchinsname} name="Inname" placeholder="Insurance Company Name" />
            <input className="fname" type="text" name="Prname" value={fetchproname} onChange={handlefetchproname} placeholder="Producer Name" />
            <input type="number" value={fetchpolicyno} onChange={handlepolicyno} name="policynumber" placeholder="Policy Number" />
            <input type="number" value={fetchexpyear} onChange={handlefetchexpyear} name="year" placeholder="Policy Exp year" />
            <select value={fetchliability} onChange={handlefetchliability}>
              <option value="GL">General Liability</option>
              <option value="AL">Automobile Liability</option>
              <option value="UL">Umbrella Liability</option>
              <option value="EL">Excess Liability</option>
            </select>
            <div className="radiobutton">
              Employee Liability<br /><br />
              <input type="radio" name="employeelia" onChange={radiofetchChange} id="employeetrue" value={true} /><label
                for="employeetrue">Yes  </label>
              <input type="radio" name="employeelia" onChange={radiofetchChange} id="employeefalse" value={false} />
              <label for="employeefalse">No</label>
            </div>
            <input type="number" name="amount" value={fetchamount} onChange={handlefetchamount} placeholder="Amount" />
          </div>
          <button type="submit" onSubmit={overwrite}>Update</button>
        </form>
      </div>
      <div className="Lasttable">
        <div className="totalcheckno">
          <input type="number" className="checkupdate" value={checkupdates} onChange={handlecheckupdate} name="policynumber" placeholder="Policy Number" />
          <button type="button" className="btnstyle" onClick={getlogfile} >Get Data</button>
        </div>
        {/* <h2  className="blockhash">Insurance Company Name : {fetchinsname}</h2>
        <h2 className="blockhash" >Producer Name : {fetchproname}</h2> */}
        <table className="infotable">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Update No</th>
              <th scope="col">Account</th>
              <th scope="col">Block No</th>
              <th scope="col">Updatetype</th>
              <th scope="col">Previous Value</th>
              <th scope="col">Changed Value</th>
            </tr>
          </thead>
          <tbody>
            {
              logfile.map((record,i) => {
                return (<>
                  <tr>
                    {/* <th scope="row">1</th> */}
                    <td>{i}</td>
                    <td>{record.updateperson}</td>
                    <td>{record.blockno.toNumber()}</td>
                    <td>{record.updatetype}</td>
                    <td>{record.prevvalue}</td>
                    <td>{record.updatevalue}</td>
                  </tr>
                  </>
                );
              }) 
            }
          </tbody>
        </table>
      </div>
        <div className="hashcheckvalue">
          <h2 className="blockhash">Get the hash of block using block number</h2><br></br>
          <div>
          <input type="number" className="checkupdate" value={checkhash} onChange={handlecheckhash} name="policynumber" placeholder="Block Number" />
          <button type="button" className="btnstyle" onClick={gethash} >Get Data</button>
          </div>
          <h3 className="blockhash">Hash Value of Blockno {checkhash}: {blockinfo}</h3>
        </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
}

export default App;