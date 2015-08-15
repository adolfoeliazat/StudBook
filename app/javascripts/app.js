var accs= web3.eth.accounts;
console.log("account:"+accs);

var addr = Horse.deployed_address;
console.log("Horse deployed to:"+addr);

var horse=Horse.at(addr);

horse.getOwner.call()
.then (function(_ownerAddr){
      console.log("ownerAddr:"+_ownerAddr);
}).done();


