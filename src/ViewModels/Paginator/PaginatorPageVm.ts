export interface PaginatorPageVm
{
    TotalRecords:number;
    StartPageRecord: number;
    EndPageRecord:number;

    RecordsPerPage: number;
    SelectedPage:number;
}