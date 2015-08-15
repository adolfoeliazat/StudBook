var accs= web3.eth.accounts;
console.log("accs:"+accs);

var hrAddr = HorseRegistry.deployed_address;
console.log("HorseRegistry deployed to:"+hrAddr);
var horseRegistry=HorseRegistry.at(hrAddr);

var firstAddr=accs[0];

var horse0;
var horse1;

horseRegistry.getNumHorses.call(firstAddr)
.then (function(_numHorses){
    console.log("numHorses for "+firstAddr+":"+_numHorses);
    return horseRegistry.newHorse("Gran Papa");
})
.then (function(o){
	console.log("newHorse! (tx:"+o+")");
	return horseRegistry.newHorse("Tia Tote");
})
.then (function(o){
	console.log("newHorse! (tx:"+o+")");
	return horseRegistry.getNumHorses.call(firstAddr);
})
.then (function(_numHorses){
    console.log("numHorses for "+firstAddr+":"+_numHorses);
    return horseRegistry.getHorseByIndex.call(firstAddr,0);
})
.then (function(_horseAddr0){
	horse0=Horse.at(_horseAddr0);
    console.log("_horseAddr0 for:"+_horseAddr0);
    return horseRegistry.getHorseByIndex.call(firstAddr,1);
})
.then (function(_horseAddr1){
	horse1=Horse.at(_horseAddr1);
    console.log("_horseAddr1 for:"+_horseAddr1);
    return horse0.getGender.call();
})
.then (function(_gender0){
	console.log("gender for horse0:"+_gender0);
    return horse0.setGender(0);
})
.then (function(o){
	console.log("gender for horse0 seted. tx:"+0);
   return horse0.getGender.call();
})
.then (function(_gender0){
	console.log("gender for horse0:"+_gender0);
    return horse1.getGender.call();
})
.then (function(_gender1){
	console.log("gender for horse1:"+_gender1);
    return horse1.setGender(1);
})
.then (function(o){
	console.log("gender for horse1 seted. tx:"+0);
   return horse1.getGender.call();
})
.then (function(_gender1){
	console.log("gender for horse1:"+_gender1);
    return horseRegistry.newChild(horse0.address,horse1.address,"Jalapeno");
})
.then (function(o){
	console.log("newChild! (tx:"+o+")");
	return horseRegistry.getNumHorses.call(firstAddr);
})
.then (function(_numHorses){
    console.log("numHorses for "+firstAddr+":"+_numHorses);
})
.catch(function(e) {
   console.log(e);
})
.done();



