import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';  
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MenubarModule } from 'primeng/menubar';
import { EmployeeManagementVm } from '../../../../ViewModels/Employee/EmployeeManagementVm';
import { GridSearchEmployeeVm } from '../../../../ViewModels/Employee/GridSearchEmployeeVm';
import { RouterOutlet } from '@angular/router';
import { EmployeeService } from '../../../../services/employee.service';
import { ListEmployeeRequestDto } from '../../../../Dto/ListEmployeeRequestDto';
import { ApiRequestDto } from '../../../../Dto/ApiRequestDto';
import { PaginatorResponseDto } from '../../../../Dto/PaginatorResponseDto';
import { ListEmployeeResponseDto } from '../../../../Dto/ListEmployeeresponseDto';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { finalize } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [BreadcrumbModule, InputTextModule, SelectModule, FormsModule, CardModule, ButtonModule, TableModule, RadioButtonModule, 
            MenubarModule,RouterOutlet,ProgressSpinnerModule, CommonModule,BlockUIModule],
  templateUrl: './management.html',
  styleUrl: './management.css',
})
export class Management implements OnInit 
{
    EmployeeManagementVm: EmployeeManagementVm;
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;
    menuItems: MenuItem[] = [];

    private Request: ApiRequestDto<ListEmployeeRequestDto>;

    constructor(private EmployeeService:EmployeeService,
                private cd: ChangeDetectorRef)
    {
        this.Request = 
        {
            Data:
            {
                Area:0,
                DocumentNumber:"",
                LastName:"",
                Name:"",
                Paginator:
                {
                    PageIndex:0,
                    PageSize:0
                },
                Position:0,
                Rol:0
            },
            LoggedUser:
            {
                Rol:"",
                User:""
            },
            Timestamp:1,
            Token:""
        };
        this.EmployeeManagementVm = 
        {
            SearchEmployee:
            {
                AllPositions : [],
                Areas: [],
                DocumentNumber: "",
                LastName: "",
                Name: "",
                Positions: [],
                Roles: [],
                SelectedArea: 
                {
                    Label:"",
                    Value:0
                },
                SelectedPosition:
                {
                    Label:"",
                    Value:0
                },
                SelectedRol: 
                {
                    Label:"",
                    Value:0
                },
                BlockedScreen:false
            },
            GridSearchEmployee: [],
            SelectedEmployee: 
            {
                Area: "",
                IdEmployee:0,
                IsSelected:false,
                LastName:"",
                Name:"",
                Position:"",
                Rol:""
            }
        };
    }

    LoadLists()
    {
        this.LoadAreas();
        this.LoadRoles();
        this.LoadAllPositions();
    }

    private LoadRoles()
    {
        this.EmployeeManagementVm.SearchEmployee.Roles = 
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
        this.EmployeeManagementVm.SearchEmployee.AllPositions = 
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

    private LoadAreas()
    {
        this.EmployeeManagementVm.SearchEmployee.Areas = 
        [
            { Label: 'Financial', Value: 1 },
            { Label: 'Commercial', Value: 2 },
            { Label: 'Human Resources', Value: 3 },
            { Label: 'Software Development', Value: 4 }
        ];
    }

    ChangeArea()
    {
        this.EmployeeManagementVm.SearchEmployee.Positions = this.EmployeeManagementVm.SearchEmployee.AllPositions?.filter(x=>x.Parent == this.EmployeeManagementVm.SearchEmployee.SelectedArea.Value);       
    }

    CleanForm()
    {
        this.EmployeeManagementVm.SearchEmployee.Name = "";
        this.EmployeeManagementVm.SearchEmployee.LastName = "";
        this.EmployeeManagementVm.SearchEmployee.DocumentNumber = "";
        this.EmployeeManagementVm.SearchEmployee.SelectedArea =  
        {
            Label: "",
            Value:0
        };
        this.EmployeeManagementVm.SearchEmployee.SelectedPosition =  
        {
            Label: "",
            Value:0
        };
        this.EmployeeManagementVm.SearchEmployee.SelectedRol =  
        {
            Label: "",
            Value:0
        };

        this.EmployeeManagementVm.SearchEmployee.Positions = [];
    }

    ngOnInit() 
    {
        this.LoadLists();

        this.items = 
        [
          {
              label: 'Employees',
              icon: 'pi pi-folder'
          },
          {
              label: 'Management',
              icon: 'pi pi-id-card'
          }];
        this.home = { icon: 'pi pi-home' };

        this.BuildMenu();
    }

    toggleSelection(employee: GridSearchEmployeeVm) 
    {
        if (!this.EmployeeManagementVm) return;

        if (this.EmployeeManagementVm.SelectedEmployee === employee) 
            {
            this.EmployeeManagementVm.SelectedEmployee = undefined as any;
        } 
        else 
        {
            this.EmployeeManagementVm.SelectedEmployee = employee;
        }

        this.BuildMenu();
    }

    create() 
    {
        console.log('Create clicked');
    }

    edit() {
    console.log('Edit', this.EmployeeManagementVm?.SelectedEmployee);
    }

    delete() {
    console.log('Delete', this.EmployeeManagementVm?.SelectedEmployee);
    }

    skills() {
    console.log('Skills', this.EmployeeManagementVm?.SelectedEmployee);
    }

    private BuildMenu() 
    {
        const hasSelection = this.EmployeeManagementVm?.SelectedEmployee != null;

        this.menuItems = [
            {
            label: 'Create',
            icon: 'pi pi-plus',
            routerLink: ['/main/employees/management/create-employee']
            },
            {
            label: 'Edit',
            icon: 'pi pi-pencil',
            visible: hasSelection,
            command: () => this.edit()
            },
            {
            label: 'Delete',
            icon: 'pi pi-trash',
            visible: hasSelection,
            command: () => this.delete()
            },
            {
            label: 'Skills',
            icon: 'pi pi-star',
            visible: hasSelection,
            command: () => this.skills()
            }
        ];
    }

    Search() 
    {
        this.BuildSearchRequest();
        this.EmployeeManagementVm.SearchEmployee.BlockedScreen = true;

        this.EmployeeService.GetListEmployees(this.Request)
            .pipe(finalize(() => 
            {
                this.cd.detectChanges();
                this.EmployeeManagementVm.SearchEmployee.BlockedScreen = false;
            }))
            .subscribe(response => 
            {
                this.BuildGrid(response);
            });
}

    private BuildGrid(response: PaginatorResponseDto<ListEmployeeResponseDto>)
    {
        let i=0;
        this.EmployeeManagementVm.GridSearchEmployee = [];
        response.Records.forEach(record => 
        {
            const vm = new GridSearchEmployeeVm();

            vm.IdEmployee = record.Id;
            vm.Name = record.Name;
            vm.LastName = record.LastName;
            vm.Area = record.Area;
            vm.Position = record.Position;
            vm.Rol = record.Rol;
            vm.IsSelected = false;

            this.EmployeeManagementVm.GridSearchEmployee.push(vm);
            i++;
        });
    }

    private BuildSearchRequest()
    {
        this.Request =
        {
            Data: 
            {
                Area: this.EmployeeManagementVm.SearchEmployee.SelectedArea.Value,
                DocumentNumber: this.EmployeeManagementVm.SearchEmployee.DocumentNumber,
                LastName: this.EmployeeManagementVm.SearchEmployee.LastName,
                Name: this.EmployeeManagementVm.SearchEmployee.Name,
                Paginator: 
                {
                    PageIndex: 1,
                    PageSize: 20
                },
                Position: this.EmployeeManagementVm.SearchEmployee.SelectedPosition.Value,
                Rol: this.EmployeeManagementVm.SearchEmployee.SelectedRol.Value
            },
            LoggedUser: 
            {
                Rol:"",
                User:""
            },
            Timestamp:15151515,
            Token:""
        };
    }
}