import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
import { WildCardDto} from '../Dto/WildCardDto'
import { GetSalaryByPositionAndSeniorityRequestDto} from '../Dto/GetSalaryByPositionAndSeniorityRequestDto';
import { ApiResponseDto } from '../Dto/ApiResponseDto';
import { SalaryPolicyDto } from '../Dto/SalaryPolicyDto';
import { ApiRequestDto } from '../Dto/ApiRequestDto';
import { UpdateSalaryPolicyRequestDto } from '../Dto/UpdateSalaryPolicyRequestDto';

@Injectable({
  providedIn: 'root'
})

export class SalaryPolicyService 
{
    private ApiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    GetSalaryByPositionAndSeniority(request: GetSalaryByPositionAndSeniorityRequestDto) : Observable<ApiResponseDto<WildCardDto>>
    {
        const url = `${this.ApiUrl}SalaryPolicy/GetSalaryByPositionAndSeniority`;
        return this.http.post<ApiResponseDto<WildCardDto>>(url, request);
    }

    GetSalaryPolicies(request:ApiRequestDto<WildCardDto>) : Observable<ApiResponseDto<SalaryPolicyDto>>
    {
        const url = `${this.ApiUrl}SalaryPolicy/GetSalaryPolicies`;
        return this.http.post<ApiResponseDto<SalaryPolicyDto>>(url, request);  
    }

    UpdateSalaryPolicy(request:ApiRequestDto<UpdateSalaryPolicyRequestDto>) : Observable<ApiResponseDto<WildCardDto>>
    {
        const url = `${this.ApiUrl}SalaryPolicy/UpdateSalaryPolicy`;
        return this.http.post<ApiResponseDto<WildCardDto>>(url, request);  
    }
}