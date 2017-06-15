import {expect} from 'chai'
import {payslipReducer} from '../reducers/payslipReducer';

describe("Payslip reducer", () => {
	
	it("Check default state", () => {
		
		const state = payslipReducer(undefined, {type:""});
	
		expect(state.items.length).equals(0);
		expect(state.fetching).equals(false);
		expect(state.fetched).equals(false);
		expect(state.error).equals(null);
	}),
	
	it("should return fetching state", () => {
		
		const state = payslipReducer({items:[], fetching:false, fetched:false,error:null}, {type:"GENERATE_PAYSLIPS_PENDING"});
	
		expect(state.items.length).equals(0);
		expect(state.fetching).equals(true);
		expect(state.fetched).equals(false);
		expect(state.error).equals(null);
	}),
	
	it("should return fetched state", () => {
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
	
	it("should return error state as an array when error is a string", () => {
		
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
	
	it("should return error state when error is an array", () => {
		
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
	}),
	
	it("should return error state when there is no response", () => {
		
		const state = payslipReducer({
				items: [], 
				fetching: true, 
				fetched: false,
				error: null}, {
				type: "GENERATE_PAYSLIPS_REJECTED",
				payload: {}});
	
		expect(state.items.length).equals(0);
		expect(state.fetching).equals(false);
		expect(state.fetched).equals(false);
		expect(Array.isArray(state.error)).equals(true);
	})
});