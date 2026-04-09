import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
import { ListEmployeeResponseDto} from '../Dto/ListEmployeeresponseDto'
import { PaginatorResponseDto} from '../Dto/PaginatorResponseDto'
import { ApiRequestDto } from '../Dto/ApiRequestDto';
import { ListEmployeeRequestDto } from '../Dto/ListEmployeeRequestDto';
import { ApiResponseDto } from '../Dto/ApiResponseDto';
import { CreateEmployeeRequest } from '../Dto/CreateEmployeeRequest';
import { WildCardDto } from '../Dto/WildCardDto';
import { DropdownVm } from '../ViewModels/Common/DropdownVm';
import { AddCorporateInformationRequestDto } from '../Dto/AddCorporateInformationRequestDto';

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
    
    CreateEmployee(request: CreateEmployeeRequest) : Observable<ApiResponseDto<any>>
    {
      const formData = new FormData();

      formData.append('Name', request.Name);
      formData.append('LastName', request.LastName);
      formData.append('DocumentType', request.DocumentType.toString());
      formData.append('DocumentValue', request.DocumentValue);
      formData.append('PersonalEmail', request.PersonalEmail);
      formData.append('CorporateEmail', request.CorporateEmail);
      formData.append('PersonalPhone', request.PersonalPhone);
      formData.append('CorporatePhone', request.CorporatePhone);
      formData.append('ContactAddress', request.ContactAddress);
      formData.append('DateOfBirth', request.DateOfBirth);
      formData.append('ContactPersonName', request.ContactPersonName);
      formData.append('ContactPersonPhone', request.ContactPersonPhone);
      formData.append('Rol', request.Rol.toString());

      if (request.ProfilePicture) 
      {
        formData.append('ProfilePicture', request.ProfilePicture);
      }

      const url = `${this.ApiUrl}Employee/AddEmployee`;
      return this.http.post<ApiResponseDto<any>>(url, formData);
  }

  GetBossesByPosition(request: ApiRequestDto<WildCardDto>): Observable<ApiResponseDto<DropdownVm[]>> 
  {
      const url = `${this.ApiUrl}Employee/GetBossesByPosition`;

      return this.http.post<ApiResponseDto<DropdownVm[]>>(url, request);
  }

  AddCorporateInformation(request: ApiRequestDto<AddCorporateInformationRequestDto>): Observable<ApiResponseDto<WildCardDto>> 
  {
      const url = `${this.ApiUrl}Employee/AddCorporateInformation`;

      return this.http.post<ApiResponseDto<WildCardDto>>(url, request);
  }
}