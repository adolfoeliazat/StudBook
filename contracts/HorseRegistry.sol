import "Horse";

contract HorseRegistry {

	event LogAddress(address h);

	//OwnerAddress => HorsesAddress[]
    mapping(address => address[]) horseOwners;


    function addOutsideHorse(){
    	Horse horse = new Horse(msg.sender);
    	
    	//Register in horseOwners
		address[] horseOwner = horseOwners[msg.sender];                      
		uint l = horseOwner.length;
		horseOwner.length++;

		horseOwner[l] = horse;
		horseOwners[msg.sender] = horseOwner;
    }

    //Solidity does not allow to return arrays (like horseOwners[_owner]) so we
    //need to provide this two methods

    function getNumHorses(address _owner) returns (uint){
      return horseOwners[_owner].length;
    }

    function getHorseByIndex(address _owner,uint index) returns (address){
      return horseOwners[_owner][index];
    }



}

