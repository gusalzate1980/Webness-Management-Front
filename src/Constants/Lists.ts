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
        { Label: 'Software Manager', Value: 11, Parent:1 },
        { Label: 'Cfo', Value: 12, Parent:1 }
    ];

    static readonly Seniorities: DropdownVm[]= 
    [
        { Label: 'Junior 1', Value: 1},
        { Label: 'Junior 2', Value: 2},
        { Label: 'Junior 3', Value: 3},
        { Label: 'Intermediate 1', Value: 4},
        { Label: 'Intermediate 2', Value: 5},
        { Label: 'Intermediate 3', Value: 6},
        { Label: 'Senior 1', Value: 6},
        { Label: 'Senior 2', Value: 8},
        { Label: 'Senior 3', Value: 9}
    ];

    static readonly Roles: DropdownVm[]=
    [
            { Label: 'App Admin', Value: 1 },
            { Label: 'Client Admin', Value: 2 },
            { Label: 'Client Human Resources', Value: 3 },
            { Label: 'Client Tech Manager', Value: 4 },
            { Label: 'Engineer', Value: 5 },
            { Label: 'Financial', Value: 6 },
            { Label: 'Human Resources', Value: 6 },
            { Label: 'Key Account Manager', Value: 8 },
            { Label: 'Software Manager', Value: 9 }
    ];

    static readonly DocumentTypes: DropdownVm[]=
    [
        { Label: 'Cédula de Ciudadania', Value: 1 },
        { Label: 'Cédula de Extranjeria', Value: 2 },
        { Label: 'Pasaporte', Value: 3 }
    ];
}