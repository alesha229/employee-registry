import { Employee } from '../../entities/employee/model/types';

export const mockEmployees: Employee[] = [
    {
        id: 1,
        firstName: 'Иван',
        lastName: 'Иванов',
        patronymic: 'Иванович',
        department: 'Бухгалтерия',
        position: 'Бухгалтер',
        birthDate: '1992-11-13T08:41:04.172Z',
        photo: `https://robohash.org/${1}?set=set2`
    },
    {
        id: 2,
        firstName: 'Иван',
        lastName: 'Иванов',
        patronymic: 'Иванович',
        department: 'IT отдел',
        position: 'Frontend разработчик',
        birthDate: '1990-05-15',
        photo: `https://robohash.org/${1}?set=set2`
    },
    // Добавьте больше сотрудников по необходимости
];
