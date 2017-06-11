export const formReducer = (
	state = {
		csvData: ''
	}, action) => {
	
	switch (action.type)
	{
		case "CSV_DATA_CHANGED" : return {...state, csvData: action.payload} 
	};
	
	return state;
};