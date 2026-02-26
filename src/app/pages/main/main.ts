import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [RouterOutlet, DrawerModule, ButtonModule, PanelMenuModule],
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class MainMenu {
  visible: boolean = false;
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/main/dashboard' },
      { label: 'Usuarios', icon: 'pi pi-users', routerLink: '/main/users' },
      { label: 'Reportes', icon: 'pi pi-chart-line', routerLink: '/main/reports' }
    ];
  }

  toggleDrawer() {
    this.visible = !this.visible;
  }
}