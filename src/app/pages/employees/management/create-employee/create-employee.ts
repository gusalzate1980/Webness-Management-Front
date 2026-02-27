import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {  BreadcrumbModule } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  imports: [BreadcrumbModule, RouterModule],
  standalone:true,
  templateUrl: './create-employee.html',
  styleUrl: './create-employee.css',
})
export class CreateEmployee implements OnInit
{
    BreadCrumb: MenuItem[] = [];
    Home: MenuItem | undefined;

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
}
