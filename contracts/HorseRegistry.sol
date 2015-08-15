contract HorseRegistry {
    mapping (address => address[]) horseOwners;

    function addHorse(address _owner, 
                              address _horse){
      horseOwners[_owner][horseOwners[_owner].length]=_horse;
    }

    function getHorses(address _owner) returns (address[]){
      return horseOwners[_owner];
    }
}

