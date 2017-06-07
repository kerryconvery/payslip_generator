var math = require("mathjs");
var taxRates = require("./taxRates");
var models = require("./models");
var check = require("check-types");

module.exports = {	
	roundToNearestWholeDollar: function(dollarAmount)
	{
		return math.round(dollarAmount);
	},

	calculateMonthlyAmount: function(annualAmount)
	{
		return this.roundToNearestWholeDollar(annualAmount / 12); 
	},

	calculateIncomeTax: function(annualGrossIncome)
	{
		var taxBracket = taxRates.getTaxBracket(annualGrossIncome);
		
		if (taxBracket == null)
			throw new Error(annualGrossIncome + " does not fit into any of the defined tax brackets");
		
		var annualIncomeTax = (taxBracket.cumulative + (annualGrossIncome - (taxBracket.fromAmount)) * taxBracket.rate);
		
		return this.calculateMonthlyAmount(annualIncomeTax);
	},

	calculateNetIncome: function(grossIncome, incomeTax)
	{
		return grossIncome - incomeTax;
	},

	calculateSuperContribution: function(grossAnnualIncome, superRate)
	{
		var grossMonthlyIncome = this.calculateMonthlyAmount(grossAnnualIncome);
		
		return this.roundToNearestWholeDollar(grossMonthlyIncome * superRate);
	},

	getEmployeePayslip: function(employee)
	{
		if (!employee)
			throw new Error("Uninitialized object");
		
		if(!check.instanceStrict(employee, models.EmployeeModel))
			throw new Error("Parameter employee is not an instance of EmployeeModel");
		
		var payslip = new models.PayslipModel();
		
		payslip.name = employee.firstName + " " + employee.lastName;
		payslip.payPeriod = employee.paymentStartDate;
		payslip.grossIncome = this.calculateMonthlyAmount(employee.annualSalary);
		payslip.incomeTax = this.calculateIncomeTax(employee.annualSalary);
		payslip.netIncome = this.calculateNetIncome(payslip.grossIncome, payslip.incomeTax);
		payslip.superContribution = this.calculateSuperContribution(employee.annualSalary, employee.superRate);
		
		return payslip;
	}
}