// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract PolicyDetail {

    bool private checknumber;

    struct Details {
        
        string insname;
        string proname;
        uint policyno;
        uint expyear;
        string liability;
        bool empliability;
        uint amount;
    }

    // Details[] public details;
    mapping(uint256 => Details) public getbypolicyno;
    mapping(uint => bool) public checkno;


    function store(string memory _insname,string memory _proname,
    uint _policyno, uint _expyear,string memory _liability , bool _empliability , uint _amount) public {
   
        require(checkno[_policyno]==false,"The data is already used in blockchain pls verify");
        getbypolicyno[_policyno] = Details( _insname, _proname, _policyno, _expyear, _liability, _empliability, _amount);
        checkno[_policyno] = true;
    }

    function getdata(uint _policyno) public view returns(string memory,string memory,uint, uint, string memory,bool, uint){
        return (getbypolicyno[_policyno].insname,
                getbypolicyno[_policyno].proname,
                getbypolicyno[_policyno].policyno,
                getbypolicyno[_policyno].expyear,
                getbypolicyno[_policyno].liability,
                getbypolicyno[_policyno].empliability,
                getbypolicyno[_policyno].amount);
    }
 }