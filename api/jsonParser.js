var Validator = require('jsonschema').Validator;
var parser = require('json-parser');
var schema = require('./schema');
var models = require('./models');

module.exports = {

	parse: function(json, validate, map, done) {
		
		try
		{
			var object = parser.parse(json, null, true);
				
			var errors = validate(object);
			
			if (errors.length == 0)
			{
				var data = map(object);
				
				done(null, data);
			}
			else
				done(errors, null);
			}
		catch(e)
		{
			done([e], null);
		}
	},

	mapToEmployeeList: function(objectList)
	{		
		var employees = new Array();
		
		objectList.employees.forEach((item) => {
			employees.push(module.exports.mapToEmployee(item));
		});
		
		return employees;
	},
	
	mapToEmployee: function(object)
	{
		var employee = new models.EmployeeModel();
		
		employee.firstName = object.firstName;
		employee.lastName = object.lastName;
		employee.annualSalary = object.annualSalary;
		employee.superRate = object.superRate;
		employee.paymentStartDate = object.paymentStartDate;
		
		return employee;
	},
	
	validateEmployeeList: function(json)
	{
		var validator = new Validator();

		var results = validator.validate(json, schema.employeeList)

		if (results.errors && results.errors.length > 0)
			return results.errors;
		else
			return [];

	}
};