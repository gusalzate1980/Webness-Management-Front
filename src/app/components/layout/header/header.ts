import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  @Output() menuClick = new EventEmitter<void>();

  openMenu() {
    this.menuClick.emit();
  }
}