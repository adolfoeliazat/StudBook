var accs= web3.eth.accounts;
console.log("accs:"+accs);
var firstAcc=accs[0];
console.log("firstAcc:"+firstAcc);

var addr = Horse.deployed_address;
console.log("Horse deployed to:"+addr);
var horse=Horse.at(addr);
console.log(horse);
/*
horse.getOwner.call()
.then (function(_ownerAddr){
      console.log("ownerAddr:"+_ownerAddr);
}).done();
*/
var hrAddr = HorseRegistry.deployed_address;
console.log(typeof hrAddr);
console.log("HorseRegistry deployed to:"+hrAddr);
var horseRegistry=HorseRegistry.at(hrAddr);

console.log(hrAddr);
horse.register(hrAddr)
  .then(function(o){
    console.log("registered:"+o);
    return horseRegistry.getHorses.call(firstAcc);
  })
  .then (function(_horses){
    console.log("horses for "+firstAcc+":"+_horses);
  })
  .catch(function(e) {
    console.log(e);
  })
  .done();



