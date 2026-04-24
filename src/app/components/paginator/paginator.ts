import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginatorNavigationVm } from '../../../ViewModels/Paginator/PaginatorNavigationVm';
import { PaginatorPageVm } from '../../../ViewModels/Paginator/PaginatorPageVm';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-paginator',
  imports: [CommonModule,FormsModule, SelectModule],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css',
})
export class Paginator implements OnInit
{
    @Input() TotalPages: number=0;
    @Input() TotalRecords: number=0;
    @Output() OnPaginatorNavigation = new EventEmitter<PaginatorNavigationVm>();
    
    ViewModel: PaginatorPageVm;

    constructor()
    {
        this.ViewModel = 
        {
            EndPageRecord:0,
            StartPageRecord:1,
            TotalRecords:this.TotalRecords,
            RecordsPerPage:20,
            SelectedPage:1,
            RecordsPerPageOptions:[10,20,30,40,50,100]
        };
    }

    ngOnInit(): void 
    {
        this.ViewModel.EndPageRecord  = this.TotalRecords <= 20 ? this.TotalRecords : 20;
        this.ViewModel.TotalRecords   = this.TotalRecords;
    }

    GoToPage(selectedPage: number)
    {
        let page:PaginatorNavigationVm = 
        {
            RecordsPerPage : this.ViewModel.RecordsPerPage,
            SelectedPage : this.ViewModel.SelectedPage
        };
        
        this.OnPaginatorNavigation.emit(page);
    }

    OnPageSizeChange()
    {
        this.ViewModel.SelectedPage = 1;
        this.GoToPage(this.ViewModel.SelectedPage);
    }

    GetPages(): number[] 
    {
        return Array.from({ length: this.TotalPages }, (_, i) => i + 1);
    }
}