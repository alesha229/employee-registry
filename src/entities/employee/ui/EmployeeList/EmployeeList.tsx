import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, Box, Pagination, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Employee } from '../../model/types';
import { format } from 'date-fns';
import { EmployeeCard } from '../EmployeeCard/EmployeeCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../app/store/store';
import { setSelectedEmployee } from '../../model/slice';

interface EmployeeListProps {
    employees: Employee[];
    page: number;
    totalPages: number;
    onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const StyledTableContainer = styled(TableContainer)<{component?: React.ElementType}>(({ theme }) => ({
    marginTop: theme.spacing(2),
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.spacing(1),
    overflow: 'hidden',
    transition: ' 0.2s ease-in-out'
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
    '&:hover': {
        backgroundColor: `${theme.palette.primary.light}15 !important`
    },
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 500,
    padding: theme.spacing(2),
}));

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 600,
    padding: theme.spacing(2),
}));

export const EmployeeList: React.FC<EmployeeListProps> = ({ 
    employees, 
    page, 
    totalPages, 
    onPageChange 
}) => {
    const dispatch = useDispatch();
    const selectedEmployee = useSelector((state: RootState) => state.employees.selectedEmployee);

    const handleRowClick = (employee: Employee) => {
        dispatch(setSelectedEmployee(employee));
    };

    const handleClose = () => {
        dispatch(setSelectedEmployee(null));
    };

    return (
        <Box sx={{ width: '100%', p: 2 }}>
            <Fade in timeout={800}>
                <StyledTableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableHeadCell>ФИО</StyledTableHeadCell>
                                <StyledTableHeadCell>Должность</StyledTableHeadCell>
                                <StyledTableHeadCell>Отдел</StyledTableHeadCell>
                                <StyledTableHeadCell>Дата рождения</StyledTableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees.map((employee, index) => (
                                <Fade
                                    in
                                    timeout={300 + index * 100}
                                    key={employee.id}
                                >
                                    <StyledTableRow 
                                        onClick={() => handleRowClick(employee)}
                                    >
                                        <StyledTableCell>
                                            {`${employee.lastName} ${employee.firstName} ${employee.patronymic}`}
                                        </StyledTableCell>
                                        <StyledTableCell>{employee.position}</StyledTableCell>
                                        <StyledTableCell>{employee.department}</StyledTableCell>
                                        <StyledTableCell>
                                            {format(new Date(employee.birthDate), 'dd.MM.yyyy')}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                </Fade>
                            ))}
                        </TableBody>
                    </Table>
                </StyledTableContainer>
            </Fade>

            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
                    <Pagination 
                        count={totalPages} 
                        page={page} 
                        onChange={onPageChange}
                        color="primary"
                        size="large"
                        sx={{
                            '& .MuiPaginationItem-root': {
                                transition: 'transform 0.2s ease-in-out'
                            }
                        }}
                    />
                </Box>
            )}

            <Dialog 
                open={!!selectedEmployee} 
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                TransitionComponent={Fade}
                transitionDuration={400}
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    }
                }}
            >
                {selectedEmployee && (
                    <EmployeeCard employee={selectedEmployee} onClose={handleClose} />
                )}
            </Dialog>
        </Box>
    );
};
