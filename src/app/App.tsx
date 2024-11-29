import React from 'react';
import { CssBaseline } from '@mui/material';
import { StoreProvider } from '@/app/providers';
import { EmployeesPage } from '@/pages/EmployeesPage';

function App() {
    return (
        <StoreProvider>
            <CssBaseline />
            <EmployeesPage />
        </StoreProvider>
    );
}

export default App;
