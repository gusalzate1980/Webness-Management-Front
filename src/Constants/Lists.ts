import { UserRolDto } from "../Dto/UserRolDto";
import { DropdownVm } from "../ViewModels/Common/DropdownVm";

export class Lists 
{
    static readonly Areas: DropdownVm[]= 
    [
        { Label: 'Financial', Value: 1 },
        { Label: 'Commercial', Value: 2 },
        { Label: 'Human Resources', Value: 3 },
        { Label: 'Software Development', Value: 4 }
    ];

    static readonly AllPositions: DropdownVm[]= 
    [
        { Label: 'Recruiter', Value: 1, Parent:3 },
        { Label: 'Well Being', Value: 2, Parent:3 },
        { Label: '.Net Developer', Value: 3, Parent:4 },
        { Label: 'Java Developer', Value: 4, Parent:4 },
        { Label: '.Net Fullstack developer', Value: 5, Parent:4 },
        { Label: 'Java Fullstack developer', Value: 6, Parent:4 },
        { Label: 'Business Analyst', Value: 6, Parent:4 },
        { Label: 'Accounting', Value: 8, Parent:1 },
        { Label: 'Billing', Value: 9, Parent:1 },
        { Label: 'Payroll', Value: 10, Parent:1 },
        { Label: 'Software Manager', Value: 11, Parent:4 },
        { Label: 'Cfo', Value: 12, Parent:1 }
    ];

    static readonly Seniorities: DropdownVm[]= 
    [
        { Label: 'Junior Basic', Value: 1},
        { Label: 'Junior Intermediate', Value: 2},
        { Label: 'Junior Advance', Value: 3},
        { Label: 'Semi Senior Basic', Value: 4},
        { Label: 'Semi Senior Intermediate', Value: 5},
        { Label: 'Semi Senior Advance', Value: 6},
        { Label: 'Senior Basic', Value: 6},
        { Label: 'Sesnior Intermediate', Value: 8},
        { Label: 'Senior Advance', Value: 9}
    ];

    static readonly Roles: UserRolDto[]=
    [
            { Name: 'App Admin', Id: 1, IsEmployeeRol: true },
            { Name: 'Client Admin', Id: 2, IsEmployeeRol: false },
            { Name: 'Client Human Resources', Id: 3, IsEmployeeRol: false },
            { Name: 'Client Tech Manager', Id: 4, IsEmployeeRol: false },
            { Name: 'Engineer', Id: 5, IsEmployeeRol: true },
            { Name: 'Financial', Id: 6 , IsEmployeeRol: true},
            { Name: 'Human Resources', Id: 6, IsEmployeeRol: true },
            { Name: 'Key Account Manager', Id: 8, IsEmployeeRol: true },
            { Name: 'Software Manager', Id: 9, IsEmployeeRol: true }
    ];

    static readonly DocumentTypes: DropdownVm[]=
    [
        { Label: 'Cédula de Ciudadania', Value: 1 },
        { Label: 'Cédula de Extranjeria', Value: 2 },
        { Label: 'Pasaporte', Value: 3 }
    ];
}