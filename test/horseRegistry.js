contract('HorseRegistry', function(accounts) {

var numHorses=0;
var firstAddr=accounts[0];


it("should add one horse", function(done) {
	var horseRegistry = HorseRegistry.at(HorseRegistry.deployed_address);

    horseRegistry.getNumHorses.call(firstAddr)
	.then (function(_numHorses){
	    numHorses=Number(_numHorses);
	    console.log("  numHorses for "+firstAddr+" => "+_numHorses);
	    return horseRegistry.newHorse("Gran Papa");
	})
	.then (function(o){
		//console.log("  newHorse created! (tx:"+o+")");
		return horseRegistry.getNumHorses.call(firstAddr);
	})
	.then (function(_numHorses){
	    console.log("  numHorses for "+firstAddr+" => "+_numHorses);
	    var expected = numHorses +1;
	    assert.equal( _numHorses , expected);
	})
	.done(function(){
	    assert.isTrue(true);
		done();
	});
});





});
