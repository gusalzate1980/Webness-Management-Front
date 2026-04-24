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
import { Lists } from '../../../../Constants/Lists';
import { Paginator } from "../../../components/paginator/paginator";
import { PaginatorNavigationVm } from '../../../../ViewModels/Paginator/PaginatorNavigationVm';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [BreadcrumbModule, InputTextModule, SelectModule, FormsModule, CardModule, ButtonModule, TableModule, RadioButtonModule,
    MenubarModule, RouterOutlet, ProgressSpinnerModule, CommonModule, BlockUIModule, Paginator],
  templateUrl: './management.html',
  styleUrl: './management.css',
})
export class Management implements OnInit 
{
    EmployeeManagementVm: EmployeeManagementVm;
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;
    menuItems: MenuItem[] = [];

    RecordsPerPage:number=20;
    CurrentPage:number=1;

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
                    Name:"",
                    Id:0,
                    IsEmployeeRol:true
                },
                BlockedScreen:false
            },
            GridSearchEmployee: [],
            SelectedEmployee: 
            {
                Area: "",
                CorporateEmail:"",
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
    }

    private LoadRoles()
    {
        this.EmployeeManagementVm.SearchEmployee.Roles = Lists.Roles.filter(x=>x.IsEmployeeRol);
    }

    private LoadAreas()
    {
        this.EmployeeManagementVm.SearchEmployee.Areas = Lists.Areas;
    }

    ChangeArea()
    {
        this.EmployeeManagementVm.SearchEmployee.Positions = Lists.AllPositions.filter(x=>x.Parent == this.EmployeeManagementVm.SearchEmployee.SelectedArea.Value);       
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
            Name: "",
            Id:0,
            IsEmployeeRol:true
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

    Assignation() {
    
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
                label: 'Assignation',
                icon: 'pi pi-briefcase',
                visible: hasSelection,
                command: () => this.Assignation()
            },
            {
                label: 'End Contract',
                icon: 'pi pi-ban',
                visible: hasSelection,
                command: () => this.Assignation()
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
            vm.CorporateEmail = record.CorporateEmail;
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
                    PageIndex: this.CurrentPage,
                    PageSize: this.RecordsPerPage
                },
                Position: this.EmployeeManagementVm.SearchEmployee.SelectedPosition.Value,
                Rol: this.EmployeeManagementVm.SearchEmployee.SelectedRol.Id
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

    PaginatorChange(event: PaginatorNavigationVm) 
    {
        this.CurrentPage = event.SelectedPage;
        this.RecordsPerPage = event.RecordsPerPage;

        this.Search();
    }

    ClickSearch() 
    {
        this.CurrentPage = 1;
        
        this.Search();
    }
}