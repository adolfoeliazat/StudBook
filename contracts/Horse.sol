
contract Horse {
    address mother;
    address father;

    address owner;

    uint8 gender; //-1 for unknown 0 for male, 1 for female


  function Horse(address _owner, address _father, address _mother) {
    owner = _owner;
    gender = uint8(-1);
    mother = _mother;
    father = _father;
  }

  function getOwner() returns (address){
    return owner;
  }

  function getGender() returns (uint8){
    return gender;
  }


  function setGender(uint8 g){
    if (owner != msg.sender) return; //Only owner can set gender
    if (g != 0 && g != 1) return; //Gender can only be 0 or 1
    if (gender != uint8(-1)) return; //Gender can be set only once.
    gender = g;
  }

  function transfer(address _newOwner){
    if (owner != msg.sender) return; //Only owner can transfer
    owner = _newOwner;
  }

}

