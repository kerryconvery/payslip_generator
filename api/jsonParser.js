const Validator = require('jsonschema').Validator;
const schema = require('./schema');
const models = require('./models');

module.exports = {

	mapToEmployeeList: function(objectList)
	{		
		const employees = new Array();
		
		objectList.forEach((item) => {
			employees.push(module.exports.mapToEmployee(item));
		});
		
		return employees;
	},
	
	mapToEmployee: function(object)
	{
		const employee = new models.EmployeeModel();
		
		employee.firstName = object.firstName;
		employee.lastName = object.lastName;
		employee.annualSalary = object.annualSalary;
		employee.superRate = object.superRate;
		employee.paymentStartDate = object.paymentStartDate;
		
		return employee;
	},
	
	validateEmployeeList: function(json)
	{
		const validator = new Validator();

		const results = validator.validate(json, schema.employeeList)

		if (results.errors && results.errors.length > 0)
			return results.errors;
		else
			return [];

	}
};