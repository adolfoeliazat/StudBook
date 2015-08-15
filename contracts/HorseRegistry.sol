contract HorseRegistry {

	event LogAddress(address h);

	//OwnerAddress => HorsesAddress[]
    mapping(address => address[]) horseOwners;

	//HorseAddress => OwnerAddress
    mapping(address => address) ownersHorse;

    function addMe(address _owner){

    	address horse = msg.sender;

        //Check for horse existence
        if( ownersHorse[ horse ] != 0) return;

		//Register in horseOwners
		address[] horseOwner = horseOwners[_owner];                      
		uint l = horseOwner.length;
		horseOwner.length++;

		horseOwner[l] = horse;
		horseOwners[_owner] = horseOwner;

		//Register in ownersHorse
		ownersHorse[horse]=_owner;
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

