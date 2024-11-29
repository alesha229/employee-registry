import React, { useMemo } from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { Employee } from '@/entities/employee/model/employee';
import { format } from 'date-fns';

interface EmployeeCardProps {
    employee: Employee;
    onClose?: () => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onClose }) => {
    const getPhotoSrc = useMemo(() => (photo?: string) => {
        if (!photo) {
            return 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
        }
        if (photo.startsWith('http') || photo.startsWith('https')) {
            return photo;
        }
        else{
            return `data:image/jpeg;base64,${photo}`
        }
    }, []); // Пустой массив зависимостей, так как функция не зависит от пропсов или состояния
    
    return (
        <Card sx={{ maxWidth: 345, m: 2 }}>
            <CardContent>
                <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                    <Avatar
                        src={getPhotoSrc(employee.photo)}
                        sx={{
                            width: 100,
                            height: 100,
                            border: '2px solid #1976d2',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            mb: 2
                        }}
                    />
                    <Typography variant="h6" component="div" gutterBottom>
                        {`${employee.lastName} ${employee.firstName} ${employee.patronymic}`}
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Отдел:</strong> {employee.department}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Должность:</strong> {employee.position}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Дата рождения:</strong> {format(new Date(employee.birthDate), 'dd.MM.yyyy')}
                </Typography>
            </CardContent>
        </Card>
    );
};
