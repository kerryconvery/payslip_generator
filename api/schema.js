module.exports = {
	
	employeeList :
	{
	   "properties":{
		  "employees":{
			 "items":{
				"properties":{
				   "firstName":{
					  "type":"string"
				   },
				   "lastName":{
					  "type":"string"
				   },
				   "annualSalary":{
					  "type":"integer",
					  "minimum": 0
				   },
				   "superRate":{
					  "type":"number",
					  "maximum": 1,
					  "minimum": 0
				   },
				   "paymentStartDate":{
					  "type":"string"
				   }
				},
				"required":[
				   "firstName",
				   "lastName",
				   "annualSalary",
				   "superRate",
				   "paymentStartDate",
				   
				],
				"type":"object"
			 },
			 "type":"array"
		  }
	   },
	   "required":[
		  "employees"
	   ]
	}
}