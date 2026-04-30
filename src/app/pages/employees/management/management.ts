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
import { ApiResponseDto } from '../../../../Dto/ApiResponseDto';

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
    ViewModel: EmployeeManagementVm;
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;
    GridRowOptions: MenuItem[] = [];

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
                Role:0
            },
            LoggedUser:
            {
                Role:"",
                User:""
            },
            Timestamp:1,
            Token:""
        };
        this.ViewModel = 
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
                    IsEmployeeRole:true
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
                Role:""
            },
            PaginatorIsHidden:true
        };
    }

    LoadLists()
    {
        this.LoadAreas();
        this.LoadRoles();
    }

    private LoadRoles()
    {
        this.ViewModel.SearchEmployee.Roles = Lists.Roles.filter(x=>x.IsEmployeeRole);
    }

    private LoadAreas()
    {
        this.ViewModel.SearchEmployee.Areas = Lists.Areas;
    }

    ChangeArea()
    {
        this.ViewModel.SearchEmployee.Positions = Lists.AllPositions.filter(x=>x.Parent == this.ViewModel.SearchEmployee.SelectedArea.Value);       
    }

    CleanForm()
    {
        this.ViewModel.SearchEmployee.Name = "";
        this.ViewModel.SearchEmployee.LastName = "";
        this.ViewModel.SearchEmployee.DocumentNumber = "";
        this.ViewModel.SearchEmployee.SelectedArea =  
        {
            Label: "",
            Value:0
        };
        this.ViewModel.SearchEmployee.SelectedPosition =  
        {
            Label: "",
            Value:0
        };
        this.ViewModel.SearchEmployee.SelectedRol =  
        {
            Name: "",
            Id:0,
            IsEmployeeRole:true
        };

        this.ViewModel.SearchEmployee.Positions = [];
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

    OnSelectEmployee(employee: GridSearchEmployeeVm) 
    {
        if (!this.ViewModel) return;

        if (this.ViewModel.SelectedEmployee === employee) 
        {
            this.ViewModel.SelectedEmployee = undefined as any;
        } 
        else 
        {
            this.ViewModel.SelectedEmployee = employee;
        }

        this.BuildMenu();
    }

    create() 
    {
        console.log('Create clicked');
    }

    delete() {
    console.log('Delete', this.ViewModel?.SelectedEmployee);
    }

    Assignation() {
    
    }

    private BuildMenu() 
    {
        const hasSelection = this.ViewModel.SelectedEmployee.IdEmployee == 0 ? false:true;
        
        this.GridRowOptions = [
            {
                label: 'Create',
                icon: 'pi pi-plus',
                routerLink: ['/main/employees/management/create-employee']
            },
            {
                label: 'Edit',
                icon: 'pi pi-pencil',
                visible: hasSelection,
                routerLink: ['/main/employees/management/update-employee/'+this.ViewModel.SelectedEmployee.IdEmployee]
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
        this.ViewModel.SearchEmployee.BlockedScreen = true;
        this.BuildSearchRequest();
        
        this.EmployeeService.GetListEmployees(this.Request)
            .pipe(finalize(() => 
            {
                this.ViewModel.SearchEmployee.BlockedScreen = false;
                this.cd.detectChanges();
            }))
            .subscribe(response => 
            {
                this.BuildGrid(response);
            });
    }

    private BuildGrid(response: ApiResponseDto<PaginatorResponseDto<ListEmployeeResponseDto>>)
    {
        let i=0;
        this.ViewModel.GridSearchEmployee = [];

        if (response.ExecutionOk && (response.ResponseValue?.Records?.length ?? 0) > 0)
        {
            this.ViewModel.PaginatorIsHidden = false;

            response.ResponseValue?.Records.forEach(record => 
            {
                const vm = new GridSearchEmployeeVm();

                vm.IdEmployee = record.Id;
                vm.Name = record.Name;
                vm.LastName = record.LastName;
                vm.CorporateEmail = record.CorporateEmail;
                vm.Area = record.Area;
                vm.Position = record.Position;
                vm.Role = record.Role;
                vm.IsSelected = false;

                this.ViewModel.GridSearchEmployee.push(vm);
                i++;
            });

            
        }
    }

    private BuildSearchRequest()
    {
        this.Request =
        {
            Data: 
            {
                Area: this.ViewModel.SearchEmployee.SelectedArea.Value,
                DocumentNumber: this.ViewModel.SearchEmployee.DocumentNumber,
                LastName: this.ViewModel.SearchEmployee.LastName,
                Name: this.ViewModel.SearchEmployee.Name,
                Paginator: 
                {
                    PageIndex: this.CurrentPage,
                    PageSize: this.RecordsPerPage
                },
                Position: this.ViewModel.SearchEmployee.SelectedPosition.Value,
                Role: this.ViewModel.SearchEmployee.SelectedRol.Id
            },
            LoggedUser: 
            {
                Role:"",
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