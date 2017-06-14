import {expect} from 'chai'
import {payslipReducer} from '../reducers/payslipReducer';

describe("Reducer Tests.", () => {
	
	it("Check default state", () => {
		
		const state = payslipReducer(undefined, {type:""});
	
		expect(state.items.length).equals(0);
		expect(state.fetching).equals(false);
		expect(state.fetched).equals(false);
		expect(state.error).equals(null);
	}),
	
	it("Check fetching state", () => {
		
		const state = payslipReducer({items:[], fetching:false, fetched:false,error:null}, {type:"GENERATE_PAYSLIPS_PENDING"});
	
		expect(state.items.length).equals(0);
		expect(state.fetching).equals(true);
		expect(state.fetched).equals(false);
		expect(state.error).equals(null);
	}),
	
	it("Check fetched state", () => {
		const state = payslipReducer({
				items: [], 
				fetching: true, 
				fetched: false,
				error: null}, {
				type: "GENERATE_PAYSLIPS_FULFILLED",
				payload: {data: ["",""]}});
	
		expect(state.items.length).equals(2);
		expect(state.fetching).equals(false);
		expect(state.fetched).equals(true);
		expect(state.error).equals(null);
	}),
	
	it("Check error state were error is a string", () => {
		
		const state = payslipReducer({
				items: [], 
				fetching: true, 
				fetched: false,
				error: null}, {
				type: "GENERATE_PAYSLIPS_REJECTED",
				payload: {response:{data:"error"}}});
	
		expect(state.items.length).equals(0);
		expect(state.fetching).equals(false);
		expect(state.fetched).equals(false);
		expect(Array.isArray(state.error)).equals(true);
	}),
	
	it("Check error state were error is an array", () => {
		
		const state = payslipReducer({
				items: [], 
				fetching: true, 
				fetched: false,
				error: null}, {
				type: "GENERATE_PAYSLIPS_REJECTED",
				payload: {response:{data:["error"]}}});
	
		expect(state.items.length).equals(0);
		expect(state.fetching).equals(false);
		expect(state.fetched).equals(false);
		expect(Array.isArray(state.error)).equals(true);
	})
});