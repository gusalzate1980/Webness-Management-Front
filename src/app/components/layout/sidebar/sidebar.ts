import { Component, Input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { RippleModule } from 'primeng/ripple';
import { Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AvatarModule, ButtonModule, DrawerModule, RippleModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar 
{
    ButtonVisible: boolean = true;      
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