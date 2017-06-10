
module.exports = {
	Request: function()
	{
		return {
				headers: [],
				body: null
			}
	},
		
	Response: function()
	{
		return {
			header: '',
			responseStatus: 0,
			connection: {
							message: '',
							send: function(value) {this.message = value}
						},
			status: function(value){this.responseStatus = value; return this.connection},
			setHeader: function(key, value) {
				if (key == 'Content-Type')
					this.header = value;
			}
		};
	}
}