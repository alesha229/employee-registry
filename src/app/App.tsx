import React from 'react';
import { CssBaseline } from '@mui/material';
import { StoreProvider } from './providers/StoreProvider';
import { EmployeesPage } from '../pages/EmployeesPage/ui/EmployeesPage';

function App() {
    return (
        <StoreProvider>
            <CssBaseline />
            <EmployeesPage />
        </StoreProvider>
    );
}

export default App;
