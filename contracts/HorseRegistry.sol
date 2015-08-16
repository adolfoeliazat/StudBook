import "Horse";

contract HorseRegistry {

	//OwnerAddress => HorsesAddress[]
    mapping(address => address[]) ownerHorses;


	//HorseAddress => HorseStruct
    struct horseData {
    	bytes32 name;
    	address registeredOwner;
    }
    mapping(address => horseData) horses;

    

    //Name => HorseAddress (for fast name check)
    mapping(bytes32 => address) names;


    function newHorse(bytes32 _name){
    	if(names[_name] != 0x0) return; //Horse name allready exists (one name only)

    	Horse horse = new Horse(msg.sender,0,0);
    	register(address(horse),msg.sender,_name);
    }
    

    function newChild(address _fatherAddress, address _motherAddress, bytes32 _name){
    	Horse father = Horse(_fatherAddress);
    	Horse mother = Horse(_motherAddress);

    	//Check gender
    	if(father.getGender() != uint8(0)) return; //Father should be male
    	if(mother.getGender() != uint8(1)) return; //Mother should be female

    	//Check ownership
		if(father.getOwner() != msg.sender) return;
		if(mother.getOwner() != msg.sender) return;

		//Check name
		if(names[_name] != 0x0) return; //Horse name allready exists (one name only)

		Horse child = new Horse(msg.sender, _fatherAddress, _motherAddress);
		register(address(child),msg.sender, _name);
    }

    function addHorse(address _horse, bytes32 _name){
    	if(names[_name] != 0x0) return; //Horse name allready exists (one name only)

    	Horse horse = Horse(_horse);
    	
    	//Check ownership
		if(horse.getOwner() != msg.sender) return;
		
		//Check if horse is not registered to other owner (uninformed transfer)
		if(horses[_horse].registeredOwner != msg.sender){
			unregister(_horse,horses[_horse].registeredOwner);
		}

		register(_horse,msg.sender,_name);
    }

    function registerTransfer(address _horse, address _newOwner){
    	Horse horse = Horse(_horse);
    	
    	//Check registered ownership
		if(horses[_horse].registeredOwner != msg.sender) return;

		bytes32 name=horses[_horse].name;

		unregister(_horse, msg.sender);
		register(_horse, _newOwner,name);

    }

    function changeName(address _horse, bytes32 _newName){
	    if(names[_newName] != 0x0) return; //Horse name allready exists (one name only)

	    //Check registered ownership
		if(horses[_horse].registeredOwner != msg.sender) return;

		//Change on names (fast search index)
		names[horses[_horse].name] = 0x0;
		names[_newName] = _horse;

		//Change on horses
		horses[_horse].name = _newName;

    }


    //Queries

    function getHorseName(address _horse) returns (bytes32){
    	return horses[_horse].name;
    }


    //Solidity does not allow to return arrays (like horseOwners[_owner]) so we
    //need to provide this two methods
    function getNumHorses(address _owner) returns (uint){
      return ownerHorses[_owner].length;
    }

    function getHorseByIndex(address _owner,uint index) returns (address){
      return ownerHorses[_owner][index];
    }


    //Internal
    function register(address _horse, address _owner, bytes32 _name) internal {
    	//Register in ownerHorses
		address[] horsesOwned = ownerHorses[_owner];                      

		uint l = horsesOwned.length;
		horsesOwned.length++;
		horsesOwned[l] = _horse;

		ownerHorses[_owner] = horsesOwned;

		//Register in horses
		horses[_horse].registeredOwner=_owner;
		horses[_horse].name=_name;


		//Register name (for fast seach)		
    	names[_name]=_horse;


    }

    function unregister(address _horse, address _owner) internal {
    	//Check if exists
    	if (horses[_horse].registeredOwner == 0x0) return;

    	//Unregister in ownerHorses
		address[] horsesOwned = ownerHorses[_owner];                      

		uint l = horsesOwned.length;
		address[] newHorsesOwned;
		for (var i = 0; i < l; i++){
			if( horsesOwned[i] != _horse ){
				uint nl = newHorsesOwned.length;
				newHorsesOwned.length++;
				newHorsesOwned[nl] = horsesOwned[i];
			}
		}
		ownerHorses[_owner] = newHorsesOwned;

		//Unregister from names
		bytes32 name=horses[_horse].name;
		names[name]==0x0;

		//Unregister from horses
		horses[_horse].registeredOwner = 0x0;
		horses[_horse].name = 0x0;

    }


}

