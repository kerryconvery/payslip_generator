const math = require("mathjs");
const taxRates = require("./taxRates");
const models = require("./models");
const check = require("check-types");

module.exports = {	
	roundToNearestWholeDollar: function(dollarAmount)
	{
		return math.round(dollarAmount);
	},

	calculateMonthlyAmount: function(annualAmount)
	{
		return module.exports.roundToNearestWholeDollar(annualAmount / 12); 
	},

	calculateIncomeTax: function(annualGrossIncome)
	{
		const taxBracket = taxRates.getTaxBracket(annualGrossIncome);
		
		if (taxBracket == null)
			throw new Error(annualGrossIncome + " does not fit into any of the defined tax brackets");
		
		const annualIncomeTax = (taxBracket.cumulative + (annualGrossIncome - (taxBracket.fromAmount)) * taxBracket.rate);
		
		return module.exports.calculateMonthlyAmount(annualIncomeTax);
	},

	calculateNetIncome: function(grossIncome, incomeTax)
	{
		return grossIncome - incomeTax;
	},

	calculateSuperContribution: function(grossAnnualIncome, superRate)
	{
		const grossMonthlyIncome = module.exports.calculateMonthlyAmount(grossAnnualIncome);
		
		return module.exports.roundToNearestWholeDollar(grossMonthlyIncome * superRate);
	},

	getEmployeePayslip: function(employee)
	{
		if (!employee)
			throw new Error("Uninitialized object");
		
		if(!check.instanceStrict(employee, models.EmployeeModel))
			throw new Error("Parameter employee is not an instance of EmployeeModel");
		
		const payslip = new models.PayslipModel();
		
		payslip.name = employee.firstName + " " + employee.lastName;
		payslip.payPeriod = employee.paymentStartDate;
		payslip.grossIncome = module.exports.calculateMonthlyAmount(employee.annualSalary);
		payslip.incomeTax = module.exports.calculateIncomeTax(employee.annualSalary);
		payslip.netIncome = module.exports.calculateNetIncome(payslip.grossIncome, payslip.incomeTax);
		payslip.superContribution = module.exports.calculateSuperContribution(employee.annualSalary, employee.superRate);
		
		return payslip;
	}
}