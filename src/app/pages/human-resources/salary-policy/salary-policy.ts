import { Component, OnInit } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { SalaryPolicyVm } from '../../../../ViewModels/HumanResources/SalaryPolicy/SalaryPolicyVm';
import { SalaryPolicyService } from '../../../../services/salaryPolicy.service';
import { WildCardDto } from '../../../../Dto/WildCardDto';
import { ApiRequestDto } from '../../../../Dto/ApiRequestDto';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PolicyBySeniorityDto } from '../../../../Dto/PolicyBySeniorityDto';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { ChangeDetectorRef } from '@angular/core';
import { finalize } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api'
import { UpdateSalaryPolicyRequestDto } from '../../../../Dto/UpdateSalaryPolicyRequestDto';

@Component({
  selector: 'app-salary-policy',
  imports: [AccordionModule, Breadcrumb, CardModule, TableModule, ButtonModule, FormsModule, InputTextModule, ProgressSpinnerModule, BlockUIModule,
              ToastModule],
  providers:[MessageService],
  standalone:true,
  templateUrl: './salary-policy.html',
  styleUrl: './salary-policy.css',
})
export class SalaryPolicy  implements OnInit
{
    BreadCrumb: MenuItem[] = [];
    Home: MenuItem | undefined;
    ViewModel: SalaryPolicyVm;
    private RequestGetSalaryPolicies: ApiRequestDto<WildCardDto>;
    private RequestUpdateSalaryPolicy: ApiRequestDto<UpdateSalaryPolicyRequestDto>;

    constructor(private salaryPolicyService: SalaryPolicyService,
                private cd: ChangeDetectorRef,
                private messageService: MessageService) 
    {
        this.ViewModel =
        {
            Policies: 
            {
                Positions: []
            },
            BlockedScreen: false
        };

        this.RequestGetSalaryPolicies = 
        {
            Data:
            {
                Data:""
            },
            LoggedUser:
            {
                Role:"",
                User:""
            },
            Timestamp:1,
            Token:""
        };

        this.RequestUpdateSalaryPolicy =
        {
            Data:
            {
                Id:0,
                Salary:0
            },
            LoggedUser:
            {
                Role:"",
                User:""
            },
            Timestamp:1,
            Token:""
        };
    }

    GetSalaryPolicies()
    {
        this.ViewModel.BlockedScreen = true;
        this.salaryPolicyService.GetSalaryPolicies(this.RequestGetSalaryPolicies)
        .pipe(finalize(() => 
              {
                  this.cd.detectChanges();
                  this.ViewModel.BlockedScreen = false;
              }))
          .subscribe((response) =>
          {
              if(response.ExecutionOk)            
              {
                  if(response.ResponseValue != null)
                  {
                      this.ViewModel!.Policies.Positions = response.ResponseValue.Positions;
                  }
              }
          });
    }

    ngOnInit() 
    {
        this.GetSalaryPolicies();
        this.BreadCrumb = 
        [
          {
              label: 'Human Resources',
              icon: 'pi pi-folder'
          },
          {
              label: 'Salary Policy',
              icon: 'pi pi-wallet'
          }];
        this.Home = { icon: 'pi pi-home' };
    }

    SetRequestUpdateSalaryPolicy(policy:PolicyBySeniorityDto)
    {
        this.RequestUpdateSalaryPolicy.Data.Id = policy.IdPolicy;
        this.RequestUpdateSalaryPolicy.Data.Salary = policy.Salary;
    }

    SaveSalaryPolicy(seniorityPolicy:PolicyBySeniorityDto, positionName:string)
    {
        this.ViewModel.BlockedScreen = true;
        this.SetRequestUpdateSalaryPolicy(seniorityPolicy);
        this.salaryPolicyService.UpdateSalaryPolicy(this.RequestUpdateSalaryPolicy)
        .pipe(finalize(() => 
              {
                  this.cd.detectChanges();
                  this.ViewModel.BlockedScreen = false;
              }))
          .subscribe((response) =>
          {
              this.messageService.add({
                                          severity: 'success',
                                          summary: 'Salary Policy',
                                          detail: 'The policy was updated successfully for ' + positionName+ ' ('+seniorityPolicy.Name+').',
                                          key: 'ce',
                                          life: 3000
                                      });
          });    
    }
}
