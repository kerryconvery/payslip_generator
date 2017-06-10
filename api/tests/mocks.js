
module.exports = {
	Request: function()
	{
		return {
				contentType: '',
				get: function(key) {
						if(key == 'Content-Type') 
							return this.contentType;
						else
							return '';
					 },
				set: function(key, value) {
					  
						if (key == 'Content-Type')
							this.contentType = value;
						
					 },
				body: null
			}
	},
		
	Response: function()
	{
		return {
			responseStatus: 0,
			connection: {
							message: '',
							send: function(value) {this.message = value}
						},
			status: function(value){this.responseStatus = value; return this.connection}
			
		};
	}
}