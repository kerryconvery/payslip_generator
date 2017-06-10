module.exports = {
	
	employeeList :
	{
	  "$schema": "http://json-schema.org/draft-04/schema#",
	  "definitions": {},
	  "id": "http://example.com/example.json",
	  "items": {
		"id": "/items",
		"properties": {
		  "annualSalary": {
			"id": "/items/properties/annualSalary",
			"minimum": 0,
			"title": "",
			"type": "integer"
		  },
		  "firstName": {
			"id": "/items/properties/firstName",
			"type": "string"
		  },
		  "lastName": {
			"id": "/items/properties/lastName",
			"type": "string"
		  },
		  "paymentStartDate": {
			"id": "/items/properties/periodStartDate",
			"type": "string"
		  },
		  "superRate": {
			"id": "/items/properties/superRate",
			"maximum": 1,
			"minimum": 0,
			"type": "number"
		  }
		},
		"required": [
		  "lastName",
		  "superRate",
		  "annualSalary",
		  "paymentStartDate",
		  "firstName"
		],
		"type": "object"
	  },
	  "type": "array"
	}
}