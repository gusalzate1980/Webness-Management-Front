import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
import { ListEmployeeResponseDto} from '../Dto/ListEmployeeresponseDto'
import { PaginatorResponseDto} from '../Dto/PaginatorResponseDto'
import { ApiRequestDto } from '../Dto/ApiRequestDto';
import { ListEmployeeRequestDto } from '../Dto/ListEmployeeRequestDto';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService 
{
    private ApiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    GetListEmployees(request: ApiRequestDto<ListEmployeeRequestDto>): Observable<PaginatorResponseDto<ListEmployeeResponseDto>> 
    {
        const url = `${this.ApiUrl}Employee/GetListEmployees`;

        return this.http.post<PaginatorResponseDto<ListEmployeeResponseDto>>(url, request);
  }    
}