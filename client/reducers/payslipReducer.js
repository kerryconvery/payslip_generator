export const payslipReducer = (
	state = {
		items: [],
		fetching: false,
		fetched: false,
		error: null
	}, action) => {
	
	switch (action.type) {
		case "GENERATE_PAYSLIPS_PENDING": 
			return {...state, fetching: true}
		case "GENERATE_PAYSLIPS_REJECTED":
		{
			if (!action.payload.response)
				return {...state, fetching: false, items: [], error: ['There was no response from the server']};	
			if (Array.isArray(action.payload.response.data))
				return {...state, fetching: false, items: [], error: action.payload.response.data};
			else
				return {...state, fetching: false, items: [], error: [action.payload.response.data]};
		}
		case "GENERATE_PAYSLIPS_FULFILLED":
			return {...state, fetching: false, fetched: true, error: null, items: action.payload.data}
	};
	
	return state;
};