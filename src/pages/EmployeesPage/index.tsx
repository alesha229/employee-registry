import React, { useState, useEffect } from 'react';
import { Container, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { EmployeeList } from '@/entities/employee/ui/EmployeeList';
import { SearchBar } from '@/features/employeeSearch/ui/SearchBar';
import { selectEmployees, selectSearchQuery, addEmployee } from '@/entities/employee/model/employeesSlice';
import { mockEmployees } from '@/shared/mock/employees';

export const EmployeesPage: React.FC = () => {
    const dispatch = useDispatch();
    const items = useSelector(selectEmployees);
    const searchQuery = useSelector(selectSearchQuery);
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => {
        if (items.length === 0) {
            mockEmployees.forEach(employee => {
                dispatch(addEmployee(employee));
            });
        }
    }, [dispatch, items.length]);

    const filteredEmployees = items.filter(employee => {
        const fullName = `${employee.lastName} ${employee.firstName} ${employee.patronymic}`.toLowerCase();
        const department = employee.department.toLowerCase();
        const position = employee.position.toLowerCase();
        const searchLower = searchQuery.toLowerCase();

        return (
            fullName.includes(searchLower) ||
            department.includes(searchLower) ||
            position.includes(searchLower)
        );
    });

    // Сброс страницы при изменении поискового запроса
    useEffect(() => {
        setPage(1);
    }, [searchQuery]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                <SearchBar />
                <EmployeeList 
                    employees={paginatedEmployees}
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </Box>
        </Container>
    );
};
