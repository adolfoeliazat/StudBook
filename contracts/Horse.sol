import "HorseRegistry";

contract Horse {
    address mother;
    address father;
    address owner;

  function Horse() {
    owner = msg.sender;
  }

  function registerIn(address _hrAddr){
    HorseRegistry(_hrAddr).addMe(owner);
  }

  function transfer(address _newOwner) {
    if (owner == msg.sender){
      owner = _newOwner;
    }
  }

  function getOwner() returns (address){
    return owner;
  }
}

