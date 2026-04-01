import { Component, Input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { TreeModule } from 'primeng/tree';
import { Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode } from 'primeng/api';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,AvatarModule, ButtonModule, DrawerModule, TreeModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar 
{
    files: TreeNode[] = [
    {
        label: 'Employees',
        icon: 'pi pi-folder',
        expanded: false,
        children: [
        {
            label: 'Management',
            icon: 'pi pi-id-card',
            expanded: false,
            data: { url: '/main/employees/management' }
        },
        {
            label: 'Career',
            icon: 'pi pi-gauge',
            expanded: false,
            children: [
            {
                label: 'Give Feedback',
                icon: 'pi pi-arrow-right',
                data: { url: '/main/employees/career/give-feedback' }
            },
            {
                label: 'My Feedback',
                icon: 'pi pi-arrow-left',
                data: { url: '/main/employees/career/my-feedback' }
            },
            {
                label: 'One on One',
                icon: 'pi pi-comments',
                data: { url: '/main/employees/career/one-on-one' }
            }]
        }]
    },
    {
        label: 'Human Resources',
        icon: 'pi pi-folder',
        expanded: false,
        children: [
        {
            label: 'Salary Policy',
            icon: 'pi pi-wallet',
            data: { url: '/main/human-resources/salary-policy' }
        }]
    },
    {
        label: 'Positions',
        icon: 'pi pi-folder',
        expanded: false,
        children: [
        {
            label: 'Open Positions',
            icon: 'pi pi-folder-open',
            data: { url: '/dashboard' }
        },
        {
            label: 'Candidates',
            icon: 'pi pi-users',
            data: { url: '/dashboard' }
        },
        {
            label: 'Oportunities',
            icon: 'pi pi-verified',
            data: { url: '/dashboard' }
        }]
    },
    {
        label: 'Assessments',
        icon: 'pi pi-folder',
        expanded: false,
        children: [
        {
            label: 'Register Assessment',
            icon: 'pi pi-pen-to-square',
            expanded: false,
            data: { url: '/dashboard' }
        },
        {
            label: 'My Assessments',
            icon: 'pi pi-list-check',
            expanded: false,
            data: { url: '/dashboard' }
        }]
    },
    {
        label: 'Financial',
        icon: 'pi pi-folder',
        expanded: false,
        children: [
        {
            label: 'Billing',
            icon: 'pi pi-receipt',
            expanded: false,
            children: [
            {
                label: 'Purchase Orders',
                icon: 'pi pi-file',
                expanded: false,
                data: { url: '/dashboard' }
            },
            {
                label: 'Billing',
                icon: 'pi pi-dollar',
                expanded: false,
                data: { url: '/dashboard' }
            },
            {
                label: 'Payments',
                icon: 'pi pi-money-bill',
                expanded: false,
                data: { url: '/dashboard' }
            }]
        },
        {
              label: 'Payroll',
              icon: 'pi pi-calculator',
              expanded: false,
              children: [
              {
                  label: 'Vacations',
                  icon: 'pi pi-sun',
                  expanded: false,
                  children: [
                  {
                      label: 'Request Time Off',
                      icon: 'pi pi-clock',
                      expanded: false,
                      data: { url: '/dashboard' }
                  },
                  {
                      label: 'Time Off Requests',
                      icon: 'pi pi-calendar-clock',
                      expanded: false,
                      data: { url: '/dashboard' }
                  }]
              },
              {
                  label: 'Payments',
                  icon: 'pi pi-building-columns',
                  expanded: false,
                  data: { url: '/dashboard' }
              },
              {
                  label: 'Contracts',
                  icon: 'pi pi-envelope',
                  expanded: false,
                  data: { url: '/dashboard' }
              }]
        }]
    },
    {
        label: 'Clients',
        icon: 'pi pi-folder',
        expanded: false,  
        children: 
        [
            {
                label: 'Management',
                icon: 'pi pi-address-book',
                expanded: false,
                data: { url: '/dashboard' }
            },
            {
                label: 'Users',
                icon: 'pi pi-users',
                expanded: false,
                data: { url: '/dashboard' }
            }    
        ]
    }
  ];

  // Control externo de visibilidad
  @Input() visible: boolean = false;

  // Evento para notificar cierre
  @Output() DrawerClosed = new EventEmitter<void>();

  // Método que dispara el evento
  closeCallback(): void {
    console.log('Cerrando drawer desde Sidebar');
    this.DrawerClosed.emit();
  }
}