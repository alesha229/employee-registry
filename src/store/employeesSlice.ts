import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee, EmployeeListResponse } from '../types/employee';
import { mockEmployees } from '../mock/employees';

interface EmployeesState {
    items: Employee[];
    total: number;
    currentPage: number;
    pageSize: number;
    searchQuery: string;
    selectedEmployee: Employee | null;
    loading: boolean;
}

const initialState: EmployeesState = {
    items: mockEmployees,
    total: mockEmployees.length,
    currentPage: 1,
    pageSize: 10,
    searchQuery: '',
    selectedEmployee: null,
    loading: false,
};

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        setEmployees: (state, action: PayloadAction<EmployeeListResponse>) => {
            state.items = action.payload.items;
            state.total = action.payload.total;
            state.currentPage = action.payload.page;
            state.pageSize = action.payload.pageSize;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
            state.currentPage = 1;
        },
        setSelectedEmployee: (state, action: PayloadAction<Employee | null>) => {
            state.selectedEmployee = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
    },
});

export const {
    setEmployees,
    setSearchQuery,
    setSelectedEmployee,
    setLoading,
    setCurrentPage,
} = employeesSlice.actions;

export default employeesSlice.reducer;
