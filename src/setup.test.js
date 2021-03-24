// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { states } from './redux';

const initialState = { gists: [], error: null }

test('test states function by using correct values',()=>{
    
    expect(states(initialState)).toStrictEqual(initialState);
})

test('test states function by using incorrect values',()=>{
    
    expect(states(2)).toStrictEqual(initialState);
})