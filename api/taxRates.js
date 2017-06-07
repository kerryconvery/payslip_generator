module.exports = {
	taxTable: [
		{fromAmount:0,toAmount:18200,cumulative:0,rate:0},
		{fromAmount:18200,toAmount:37000,cumulative:0,rate:0.19},
		{fromAmount:37000,toAmount:80000,cumulative:3572,rate:0.325},
		{fromAmount:80000,toAmount:180000,cumulative:17547,rate:0.37},
		{fromAmount:180000,toAmount:999999999,cumulative:54547,rate:0.45}],
		
	getTaxBracket: function(grossAnnualIncome)
	{
		if (grossAnnualIncome < 0)
			return null;
		
		for(var taxRateIndex = 0; taxRateIndex < this.taxTable.length; taxRateIndex++)
		{
			var taxRate = this.taxTable[taxRateIndex];

			
			if (grossAnnualIncome >= taxRate.fromAmount && grossAnnualIncome <= taxRate.toAmount)
				return taxRate;
		}
		
		return this.taxTable[this.taxTable.length -1];
	}
}