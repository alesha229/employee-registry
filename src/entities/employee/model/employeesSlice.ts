import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from './employee';
import { RootState } from '@/app/store';

interface EmployeesState {
  items: Employee[];
  searchQuery: string;
  selectedEmployee: Employee | null;
}

const initialState: EmployeesState = {
  items: [],
  searchQuery: '',
  selectedEmployee: null,
};

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.items.push(action.payload);
    },
    removeEmployee: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((employee) => employee.id !== action.payload);
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.items.findIndex((employee) => employee.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedEmployee: (state, action: PayloadAction<Employee | null>) => {
      state.selectedEmployee = action.payload;
    },
  },
});

export const { addEmployee, removeEmployee, updateEmployee, setSearchQuery, setSelectedEmployee } =
  employeesSlice.actions;

export const selectEmployees = (state: RootState) => state.employees.items;
export const selectSearchQuery = (state: RootState) => state.employees.searchQuery;
export const selectSelectedEmployee = (state: RootState) => state.employees.selectedEmployee;

export default employeesSlice.reducer;
