export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    department: string;
    position: string;
    photo?: string;
    birthDate: string;
}

export interface EmployeeListResponse {
    items: Employee[];
    total: number;
    page: number;
    pageSize: number;
}
