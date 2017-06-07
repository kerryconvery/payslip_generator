module.exports = {
	
	EmployeeModel: class
	{
		constructor()
		{
			this.firstName="",
			this.lastName="",
			this.annualSalary=0,
			this.superRate=0,
			this.paymentStartDate="";
		}
	
	},

	PayslipModel: class
	{	
		constructor()
		{	
			this.name="",
			this.payPeriod="",
			this.grossIncome=0,
			this.incomeTax=0,
			this.netIncome=0,
			this.superContribution=0;
		}
	}
}
