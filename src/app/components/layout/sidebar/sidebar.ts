import { Component, Input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { TreeModule } from 'primeng/tree';
import { Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AvatarModule, ButtonModule, DrawerModule, TreeModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar 
{
    files: TreeNode[] = [
    {
        label: 'Employees',
        icon: 'pi pi-folder',
        expanded: true,
        children: [
        {
            label: 'Management',
            icon: 'pi pi-id-card',
            expanded: true
        },
        {
            label: 'Career',
            icon: 'pi pi-gauge',
            expanded: true,
            children: [
            {
                label: 'Give Feedback',
                icon: 'pi pi-arrow-right'
            },
            {
                label: 'My Feedback',
                icon: 'pi pi-arrow-left'
            },
            {
                label: 'One on One',
                icon: 'pi pi-comments'
            }]
        }]
    },
    {
        label: 'Positions',
        icon: 'pi pi-folder',
        expanded: true,
        children: [
        {
            label: 'Open Positions',
            icon: 'pi pi-folder-open'
        },
        {
            label: 'Candidates',
            icon: 'pi pi-users'
        },
        {
            label: 'Oportunities',
            icon: 'pi pi-verified'
        }]
    },
    {
        label: 'Assessments',
        icon: 'pi pi-folder',
        expanded: true,
        children: [
        {
            label: 'Register Assessment',
            icon: 'pi pi-pen-to-square',
            expanded: true
        },
        {
            label: 'My Assessments',
            icon: 'pi pi-list-check',
            expanded: true
        }]
    },
    {
        label: 'Financial',
        icon: 'pi pi-folder',
        expanded: true,
        children: [
        {
            label: 'Billing',
            icon: 'pi pi-receipt',
            expanded: true,
            children: [
            {
                label: 'Purchase Orders',
                icon: 'pi pi-file',
                expanded: true
            },
            {
                label: 'Billing',
                icon: 'pi pi-dollar',
                expanded: true
            },
            {
                label: 'Payments',
                icon: 'pi pi-money-bill',
                expanded: true
            }]
        },
        {
              label: 'Payroll',
              icon: 'pi pi-calculator',
              expanded: true,
              children: [
              {
                  label: 'Vacations',
                  icon: 'pi pi-sun',
                  expanded: true,
                  children: [
                  {
                      label: 'Request Time Off',
                      icon: 'pi pi-clock',
                      expanded: true
                  },
                  {
                      label: 'Time Off Requests',
                      icon: 'pi pi-calendar-clock',
                      expanded: true
                  }]
              },
              {
                  label: 'Payments',
                  icon: 'pi pi-building-columns',
                  expanded: true
              },
              {
                  label: 'Contracts',
                  icon: 'pi pi-envelope',
                  expanded: true
              }]
        }]
    },
    {
        label: 'Clients',
        icon: 'pi pi-folder',
        expanded: true,  
        children: 
        [
            {
                label: 'Management',
                icon: 'pi pi-address-book',
                expanded: true
            },
            {
                label: 'Users',
                icon: 'pi pi-users',
                expanded: true
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