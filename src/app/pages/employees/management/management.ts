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

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [BreadcrumbModule, InputTextModule, SelectModule, FormsModule, CardModule, ButtonModule, TableModule, RadioButtonModule, MenubarModule],
  templateUrl: './management.html',
  styleUrl: './management.css',
})
export class Management implements OnInit {
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;
    cities: City[] | undefined;
    selectedCity: City | undefined;
    employees: Employee[] = [];    
    selectedEmployee?: Employee;
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

        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];

        this.employees = [
            { name: 'Gustavo', lastName: 'Alzate', area: 'Development', position: 'Software Manager', role: 'Software Manager' },
            { name: 'Emilio', lastName: 'Zambrano', area: 'Development', position: 'Senior Java Engineer', role: 'Engineer' },
            { name: 'Lorena', lastName: 'Quiceno', area: 'Accounting', position: 'Accounting Manager', role: 'Financial' },
            { name: 'Cecilia', lastName: 'Jaramillo', area: 'Development', position: 'Business Analyst', role: 'Engineer' }
            ];

            this.buildMenu();
    }

    toggleSelection(employee: Employee) {
        if (this.selectedEmployee === employee) {
            this.selectedEmployee = undefined as any;
        } else {
            this.selectedEmployee = employee;
        }

        this.buildMenu();
    }

    

    create() {
        console.log('Create clicked');
        }

        edit() {
        console.log('Edit', this.selectedEmployee);
        }

        delete() {
        console.log('Delete', this.selectedEmployee);
        }

        skills() {
        console.log('Skills', this.selectedEmployee);
        }

        private buildMenu() {
        const hasSelection = this.selectedEmployee != null;

        this.menuItems = [
            {
            label: 'Create',
            icon: 'pi pi-plus',
            command: () => this.create()
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

interface City {
    name: string;
    code: string;
}

interface Employee {
  name: string;
  lastName: string;
  area: string;
  position: string;
  role: string;
}
function menuItems() {
    throw new Error('Function not implemented.');
}

