import { Component, OnInit } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [BreadcrumbModule],
  templateUrl: './management.html',
  styleUrl: './management.css',
})
export class Management implements OnInit {
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;

    ngOnInit() {
        this.items = 
        [
          {
              label: 'Employees',
              icon: 'pi pi-folder'
          },
          {
              label: 'Employees',
              icon: 'pi pi-id-card'
          }];
        this.home = { icon: 'pi pi-home' };
    }
}
