import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from './types';
import { mockEmployees } from '../../../mock/employees';

interface EmployeesState {
    items: Employee[];
    searchQuery: string;
    selectedEmployee: Employee | null;
}

const initialState: EmployeesState = {
    items: mockEmployees,
    searchQuery: '',
    selectedEmployee: null
};

export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setSelectedEmployee: (state, action: PayloadAction<Employee | null>) => {
            state.selectedEmployee = action.payload;
        }
    }
});

export const { setSearchQuery, setSelectedEmployee } = employeesSlice.actions;

export default employeesSlice.reducer;
