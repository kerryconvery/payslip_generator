var chai = require("chai");
var taxRates = require("../taxRates");

describe("Tax rate tests", () => {
	
	it("Lower bound - Get the first tax rate", () => {
		var taxBracket = taxRates.getTaxBracket(0);
		
		chai.expect(taxBracket.rate).to.equal(0);
	});
	
	it("Lower bound - Get the second tax rate", () => {
		var taxBracket = taxRates.getTaxBracket(18201);
		
		chai.expect(taxBracket.rate).to.equal(0.19);
	});
	
	it("Lower bound - Get the third tax rate", () => {
		var taxBracket = taxRates.getTaxBracket(37001);
		
		chai.expect(taxBracket.rate).to.equal(0.325);
	});
	
	it("Lower bound - Get the fourth tax rate", () => {
		var taxBracket = taxRates.getTaxBracket(80001);
		
		chai.expect(taxBracket.rate).to.equal(0.37);
	});
	
	it("Lower bound - Get the fifth tax rate", () => {
		var taxBracket = taxRates.getTaxBracket(180001);
		
		chai.expect(taxBracket.rate).to.equal(0.45);
	});
	
	it("Upper bound - Get first tax rate", () => {
		var taxBracket = taxRates.getTaxBracket(18200);
		
		chai.expect(taxBracket.rate).to.equal(0);
	});
	
	it("Upper bound - Get the second tax rate", () => {
		var taxBracket = taxRates.getTaxBracket(37000);
		
		chai.expect(taxBracket.rate).to.equal(0.19);
	});
	
	it("Upper bound - Get the third tax rate", () => {
		var taxBracket = taxRates.getTaxBracket(80000);
		
		chai.expect(taxBracket.rate).to.equal(0.325);
	});
	
	it("Upper bound - Get the fourth tax rate", () => {
		var taxBracket = taxRates.getTaxBracket(180000);
		
		chai.expect(taxBracket.rate).to.equal(0.37);
	});
	
	it("Upper bound - Get the fifth tax rate", () => {
		var taxBracket = taxRates.getTaxBracket(1000000);
		
		chai.expect(taxBracket.rate).to.equal(0.45);
	});

	it("Outside lower bound", () => {
		var taxBracket = taxRates.getTaxBracket(-1);
		
		chai.expect(taxBracket).to.equal(null);
	});	
	
	it("Outside Upper bound", () => {
		var taxBracket = taxRates.getTaxBracket(9999999999);
		
		chai.expect(taxBracket.rate).to.equal(0.45);
	});		
});
