import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {  BreadcrumbModule } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { CreateEmployeeVm } from '../../../../../ViewModels/Employee/CreateEmployeeVm';
import { PersonalInformation } from "../../../../components/employee/personal-information/personal-information";
import { CorporateInformation } from "../../../../components/employee/corporate-information/corporate-information";
import { WorkExperience } from "../../../../components/employee/work-experience/work-experience";
import { Education } from "../../../../components/employee/education/education";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  imports: [BreadcrumbModule, RouterModule, CardModule, TabsModule, PersonalInformation, CorporateInformation, WorkExperience, Education, FormsModule],
  standalone:true,
  templateUrl: './create-employee.html',
  styleUrl: './create-employee.css',
})
export class CreateEmployee implements OnInit
{
    BreadCrumb: MenuItem[] = [];
    Home: MenuItem | undefined;

    ViewModel: CreateEmployeeVm;

    constructor()
    {
        this.ViewModel = 
        {
            ActiveTab: 0,

            CliksOnCi: 0,
            CliksOnEd: 0,
            CliksOnPi: 0,
            CliksOnWe:0,

            DisabledCi:true,
            DisabledEd:true,
            DisabledWe:true,

            IdEmployee:0
        };
    }

    ngOnInit() {
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
