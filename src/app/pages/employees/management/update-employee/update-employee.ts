import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import {  BreadcrumbModule } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { EmployeeMainContainerVm } from '../../../../../ViewModels/Employee/EmployeeMainContainerVm';
import { PersonalInformation } from "../../../../components/employee/personal-information/personal-information";
import { CorporateInformation } from "../../../../components/employee/corporate-information/corporate-information";
import { WorkExperience } from "../../../../components/employee/work-experience/work-experience";
import { Education } from "../../../../components/employee/education/education";
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Toast } from "primeng/toast";

@Component({
  selector: 'app-update-employee',
  imports: [BreadcrumbModule, RouterModule, CardModule, TabsModule, PersonalInformation, CorporateInformation, WorkExperience, Education, FormsModule, Toast],
  providers:[MessageService],
  standalone:true,
  templateUrl: './update-employee.html',
  styleUrl: './update-employee.css',
})
export class UpdateEmployee implements OnInit
{
    BreadCrumb: MenuItem[] = [];
    Home: MenuItem | undefined;

    ViewModel: EmployeeMainContainerVm;

    constructor(private Route: ActivatedRoute,
                private MessageService: MessageService
    )
    {
        this.ViewModel = 
        {
            ActiveTab: "PI",

            CliksOnCi: 0,
            CliksOnEd: 0,
            CliksOnPi: 0,
            CliksOnWe:0,

            DisabledCi:false,
            DisabledEd:false,
            DisabledWe:false,

            IdEmployee:0
        };
    }

    private HandleEmployeeIdParam()
    {
        const param = this.Route.snapshot.paramMap.get('id');
        if (param && !isNaN(Number(param)) && Number(param) != 0) 
        {
            this.ViewModel.IdEmployee = Number(param);
        } 
        else 
        {
            this.MessageService.add({
                                      severity: 'error',
                                      summary: 'Update Employee',
                                      detail: "Invalid parameter value",
                                      key: 'ce',
                                      life: 3000
                                  });  
        }
    }

    ngOnInit() 
    {
        this.HandleEmployeeIdParam();
        this.BreadCrumb = 
        [
          {
              label: 'Employees',
              icon: 'pi pi-folder'
          },
          {
              label: 'Management',
              icon: 'pi pi-id-card',
              routerLink: '/main/employees/management'
          },
          {
              label: 'Create Employee',
              icon: 'pi pi-plus'
          }];
        this.Home = { icon: 'pi pi-home' };
    }

    OnTabChange(tab: any) 
    {
        switch(tab)
        {
            case "PI": this.ViewModel.CliksOnPi++; break;
            case "CI": this.ViewModel.CliksOnCi++; break;
            case "WE": this.ViewModel.CliksOnWe++; break;
            case "ED": this.ViewModel.CliksOnEd++; break;
        }
    }

    ActivateTabs(employeeId:number)
    {
        this.ViewModel.IdEmployee = employeeId;
        this.ViewModel.DisabledCi = false;
        this.ViewModel.DisabledWe = false;
        this.ViewModel.DisabledEd = false;
    }
}
