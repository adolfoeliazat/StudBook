import "HorseRegistry";

contract Horse {
    address mother;
    address father;
    address owner;

    //Constructor
  
  function Horse() {
    owner = msg.sender;
  }

  function register(address _hrAddr){
    HorseRegistry(_hrAddr)
      .addHorse(owner,address(this));
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

