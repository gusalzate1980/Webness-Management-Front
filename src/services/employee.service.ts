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
import { GetPersonalInformationResponseDto } from '../Dto/GetPersonalInformationResponseDto';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService 
{
    private ApiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    GetListEmployees(request: ApiRequestDto<ListEmployeeRequestDto>): Observable<ApiResponseDto<PaginatorResponseDto<ListEmployeeResponseDto>>> 
    {
        const url = `${this.ApiUrl}Employee/GetListEmployees`;

        return this.http.post<ApiResponseDto<PaginatorResponseDto<ListEmployeeResponseDto>>>(url, request);
    }
    
    CreateEmployee(request: ApiRequestDto<CreateEmployeeRequest>) : Observable<ApiResponseDto<any>>
    {
        const formData = new FormData();

        formData.append('Timestamp', request.Timestamp.toString());
        formData.append('Token', request.Token);
        formData.append('LoggedUser.User', request.LoggedUser.User);
        formData.append('LoggedUser.Role', request.LoggedUser.Role);
        formData.append('Data.Name', request.Data.Name);
        formData.append('Data.LastName', request.Data.LastName);
        formData.append('Data.DocumentType', request.Data.DocumentType.toString());
        formData.append('Data.DocumentValue', request.Data.DocumentValue);
        formData.append('Data.PersonalEmail', request.Data.PersonalEmail);
        formData.append('Data.CorporateEmail', request.Data.CorporateEmail);
        formData.append('Data.PersonalPhone', request.Data.PersonalPhone);
        formData.append('Data.CorporatePhone', request.Data.CorporatePhone);
        formData.append('Data.ContactAddress', request.Data.ContactAddress);
        formData.append('Data.DateOfBirth', request.Data.DateOfBirth);
        formData.append('Data.ContactPersonName', request.Data.ContactPersonName);
        formData.append('Data.ContactPersonPhone', request.Data.ContactPersonPhone);
        formData.append('Data.Role', request.Data.Role.toString());

        if (request.Data.ProfilePicture) 
        {
          formData.append('Data.ProfilePicture', request.Data.ProfilePicture);
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

    GetPersonalInformationByEmployee(request: ApiRequestDto<WildCardDto>): Observable<ApiResponseDto<GetPersonalInformationResponseDto>> 
    {
        const url = `${this.ApiUrl}Employee/GetPersonalInformationByEmployee`;

        return this.http.post<ApiResponseDto<GetPersonalInformationResponseDto>>(url, request);
    }
}