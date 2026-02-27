import { DropdownVm } from "../Common/DropdownVm";
import { GridSearchEmployeeVm } from "./GridSearchEmployeeVm";

export class SearchEmployeeVm
{
    Name: string | undefined;
    LastName: string | undefined;
    DocumentNumber: string | undefined;
    Areas:DropdownVm[] | undefined;

    private AllPositions:DropdownVm[] |undefined;
    Positions:DropdownVm[] | undefined;
    Roles:DropdownVm[] | undefined;

    SelectedArea:DropdownVm|undefined;
    SelectedRol:DropdownVm|undefined;

    LoadLists()
    {
        this.LoadAreas();
        this.LoadRoles();
        this.LoadAllPositions();
    }

    ClickSearch():GridSearchEmployeeVm[] 
    {
        let results:GridSearchEmployeeVm[] = 
        [
            { IdEmployee: 1, Name: 'Gustavo', LastName: 'Alzate', Area: 'Development', Position: 'Software Manager', Rol: 'Software Manager', IsSelected:false },
            { IdEmployee: 2, Name: 'Emilita', LastName: 'Hernandez', Area: 'Development', Position: 'Senior Java Engineer', Rol: 'Engineer', IsSelected:false },
            { IdEmployee: 3, Name: 'Romeo', LastName: 'Quintero', Area: 'Accounting', Position: 'Accounting Manager', Rol: 'Financial', IsSelected:false },
            { IdEmployee: 4, Name: 'Cecilia', LastName: 'Jaramillo', Area: 'Development', Position: 'Business Analyst', Rol: 'Engineer', IsSelected:false }
        ];

        return results;
    }

    ChangeArea()
    {
        this.Positions = this.AllPositions?.filter(x=>x.Parent == this.SelectedArea?.Value);    
    }

    private LoadAreas()
    {
        this.Areas = 
        [
            { Label: 'Financial', Value: 1 },
            { Label: 'Commercial', Value: 2 },
            { Label: 'Human Resources', Value: 3 },
            { Label: 'Software Development', Value: 4 }
        ];
    }

    private LoadRoles()
    {
        this.Roles = 
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
    }

    private LoadAllPositions()
    {
        this.AllPositions = 
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
            { Label: 'Payroll', Value: 10, Parent:1 }
        ];
    }
}