var accs= web3.eth.accounts;
console.log("accs:"+accs);

var addr = Horse.deployed_address;
console.log("Horse deployed to:"+addr);
var horse=Horse.at(addr);
//console.log(horse);
var hrAddr = HorseRegistry.deployed_address;
//console.log(typeof hrAddr);
console.log("HorseRegistry deployed to:"+hrAddr);
var horseRegistry=HorseRegistry.at(hrAddr);

var ownerAddr;

horse.getOwner.call()
.then (function(_ownerAddr){
	  console.log("ownerAddr:"+_ownerAddr);
      ownerAddr = _ownerAddr;
      return horse.registerIn(hrAddr);
})
.then(function(o){
    console.log("registered! (tx:"+o+")");
    return horseRegistry.getNumHorses.call(ownerAddr);
})
.then (function(_numHorses){
    console.log("numHorses for "+ownerAddr+":"+_numHorses);
    return horseRegistry.getHorseByIndex.call(ownerAddr,0);
})
.then (function(_horseAddr){
    console.log("_horseAddr for "+ownerAddr+":"+_horseAddr);
})
.catch(function(e) {
   console.log(e);
})
.done();



