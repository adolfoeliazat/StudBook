contract('HorseRegistry', function(accounts) {
  it("should assert true", function(done) {
    var hr = HorseRegistry.at(HorseRegistry.deployed_address);
    assert.isTrue(true);
    done();
  });
});
