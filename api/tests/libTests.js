var chai = require("chai");
var lib = require("../lib");
var models = require("../models");

describe("Calculate monthly gross income", () => {

	it("Calculate monthly salary exact", () => {
		chai.expect(lib.calculateMonthlyAmount(1200)).to.equal(100); 
	});
	
	it("Calculate monthly salary round down", () => {
		chai.expect(lib.calculateMonthlyAmount(1000)).to.equal(83);
	});
	
	it("Calculate monthly salary round up", () => {
		chai.expect(lib.calculateMonthlyAmount(500)).to.equal(42);
	});
	
	it("Calculate monthly salary 0", () => {
		chai.expect(lib.calculateMonthlyAmount(0)).to.equal(0);
	});
});

describe("Nearest whole dollar rounding", () => {
	
	it("No rounding required", () => {
		chai.expect(lib.roundToNearestWholeDollar(100)).to.equal(100);
	});

	it("Round up", () => {
		chai.expect(lib.roundToNearestWholeDollar(100.90)).to.equal(101);
	});
	
	it("Round down", () => {
		chai.expect(lib.roundToNearestWholeDollar(100.10)).to.equal(100);
	});
	
	it("Round on pivot", () => {
		chai.expect(lib.roundToNearestWholeDollar(100.50)).to.equal(101);
	});
});

describe("Income tax", () => {

	it("Income tax for $60,050 Annual salary", () => {
		chai.expect(lib.calculateIncomeTax(60050)).to.equal(922);
	})
	
	it("Income tax for $0 Annual salary", () => {
		chai.expect(lib.calculateIncomeTax(0)).to.equal(0);
	})
	
	it("Income tax for $200000 Annual salary", () => {
		chai.expect(lib.calculateIncomeTax(200000)).to.equal(5296);
	});
	
	it("Annual salary outside lower bound", () => {
		chai.expect(() => {lib.calculateIncomeTax(-1)}).to.throw("-1 does not fit into any of the defined tax brackets");
	})

	it("Annual salary outside upper bound", () => {
		chai.expect(lib.calculateIncomeTax(9999999999)).to.equal(374997796);
	})	
});

describe("Net tax amount", () =>
{
	it("Gross income of $5,004", () =>
	{
		chai.expect(lib.calculateNetIncome(5004, 922)).to.equal(4082);
	});
});

describe("Super amount", () =>
{
	it("Gross income of $60,050 and super rate of 9%", () =>
	{
		chai.expect(lib.calculateSuperContribution(60050, 0.09)).to.equal(450);
	});
});

describe("Payslip", () =>
{
	it("Test getting new payslip", () => {
		
		var employee = new models.EmployeeModel();
		
		employee.firstName = "David";
		employee.lastName = "Rudd";
		employee.annualSalary = 60050;
		employee.superRate = 0.09;
		employee.paymentStartDate = "01 March - 31 March";
		
		var payslip = lib.getEmployeePayslip(employee);
		
		chai.expect(payslip.name).to.equal("David Rudd");
		chai.expect(payslip.payPeriod).to.equal("01 March - 31 March");
		chai.expect(payslip.grossIncome).to.equal(5004);
		chai.expect(payslip.incomeTax).to.equal(922);
		chai.expect(payslip.netIncome).to.equal(4082);
		chai.expect(payslip.superContribution).to.equal(450);
	});

	it("Test null employee parameter", () => {
		
		chai.expect(() => {lib.getEmployeePayslip(null)}).to.throw("Uninitialized object");
	});
	
	it("Test missing employee field", () => {
	
		var fakeInstance = {};
		
		chai.expect(() => {lib.getEmployeePayslip(fakeInstance)}).to.throw("Parameter employee is not an instance of EmployeeModel");
	});
});