import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [BreadcrumbModule, InputTextModule, SelectModule, FormsModule, CardModule, ButtonModule, TableModule, RadioButtonModule, MenubarModule,RouterOutlet],
  templateUrl: './management.html',
  styleUrl: './management.css',
})
export class Management implements OnInit 
{
    EmployeeManagementVm: EmployeeManagementVm = new EmployeeManagementVm();
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;
    menuItems: MenuItem[] = [];

    ngOnInit() {
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

        this.EmployeeManagementVm.SearchEmployee.LoadLists();

            this.buildMenu();
    }

    toggleSelection(employee: GridSearchEmployeeVm) {
        if (this.EmployeeManagementVm.SelectedEmployee === employee) 
        {
            this.EmployeeManagementVm.SelectedEmployee = undefined as any;
        } 
        else 
        {
            this.EmployeeManagementVm.SelectedEmployee = employee;
        }

        this.buildMenu();
    }

    create() {
        console.log('Create clicked');
        }

        edit() {
        console.log('Edit', this.EmployeeManagementVm.SelectedEmployee);
        }

        delete() {
        console.log('Delete', this.EmployeeManagementVm.SelectedEmployee);
        }

        skills() {
        console.log('Skills', this.EmployeeManagementVm.SelectedEmployee);
        }

        private buildMenu() {
        const hasSelection = this.EmployeeManagementVm.SelectedEmployee != null;

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
}