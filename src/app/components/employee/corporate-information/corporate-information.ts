import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { SelectModule } from "primeng/select";
import { FormsModule } from '@angular/forms';
import { CorporateInormationVm } from '../../../../ViewModels/Employee/CorporateInformationVm';
import { Lists } from '../../../../Constants/Lists';
import { DatePickerModule } from "primeng/datepicker";
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SalaryPolicyService } from '../../../../services/salaryPolicy.service';
import { finalize } from 'rxjs';
import { GetSalaryByPositionAndSeniorityRequestDto } from '../../../../Dto/GetSalaryByPositionAndSeniorityRequestDto';
import { ApiRequestDto } from '../../../../Dto/ApiRequestDto';
import { EmployeeService } from '../../../../services/employee.service';
import { WildCardDto } from '../../../../Dto/WildCardDto';
import { MessageService } from 'primeng/api';
import { MessageModule } from "primeng/message";
import { AddCorporateInformationRequestDto } from '../../../../Dto/AddCorporateInformationRequestDto';
import { ToastModule } from "primeng/toast";

@Component({
  selector: 'app-corporate-information',
  imports: [SelectModule, FormsModule, DatePickerModule, ToggleSwitchModule, FileUploadModule, ButtonModule, InputTextModule, BlockUIModule,
    ProgressSpinnerModule, MessageModule, ToastModule],
  templateUrl: './corporate-information.html',
  providers:[MessageService],
  styleUrl: './corporate-information.css',
})
export class CorporateInformation 
{
    @Input() IdEmployee:number = 0;
    CorporateInformation:CorporateInormationVm;
    
    constructor(private salaryPolicyService: SalaryPolicyService,
                private cd: ChangeDetectorRef,
                private employeeService: EmployeeService,
                private messageService: MessageService)
    {
        this.CorporateInformation = 
        {
            Areas: Lists.Areas,
            SelectedArea: 
            {
                Label: "",
                Value: 0
            },

            Positions: [],
            SelectedPosition:
            {
                Label: "",
                Value: 0
            },

            Seniorities: Lists.Seniorities,
            SelectedSeniority:
            {
                Label: "",
                Value: 0
            },

            Salary:0,
            BlockedScreen: false,

            StartDate:"",
            EndDate:"",
            EnableEndDate: false,
            HasEndDateChecked: false,
            HasBossChecked: false,

            DisableBossDropdown: true,
            BossList: [],
            SelectedBoss:
            {
                Label: "",
                Value: 0
            },

            FormIsOk: false,

            ShowAreaError: false,
            ShowPositionError: false,
            ShowSeniorityError: false,
            ShowStartDateError: false,
            ShowEndDateError: false,
            ShowBossError: false
        };
    }

    SetPositions()
    {
        this.CorporateInformation.SelectedPosition =
        {
            Label: "",
            Value: 0
        };
        this.CorporateInformation.Positions = Lists.AllPositions.filter(x=>x.Parent == this.CorporateInformation.SelectedArea.Value);
    }

    ChangeArea()
    {
        this.CorporateInformation.Positions = Lists.AllPositions.filter(x=>x.Parent == this.CorporateInformation.SelectedArea.Value);       
    }

    SetRequestGetSalaryByPositionAndSeniority()
    {
        let request: ApiRequestDto<GetSalaryByPositionAndSeniorityRequestDto> =
        {
            Data:
            {
                IdPosition: this.CorporateInformation.SelectedPosition.Value,
                IdSeniority: this.CorporateInformation.SelectedSeniority.Value
            },
            LoggedUser:
            {
                User:"",
                Rol:""
            },
            Timestamp:1,
            Token:""
        }
        return request;    
    }   

    GetSalary(changeEvent:number)
    {
        if(this.CorporateInformation.SelectedPosition.Value != 0 && this.CorporateInformation.SelectedSeniority.Value != 0)
        {
            this.CorporateInformation.BlockedScreen = true;
            

            this.salaryPolicyService.GetSalaryByPositionAndSeniority(this.SetRequestGetSalaryByPositionAndSeniority())
            .pipe(finalize(() => 
                    {
                        this.cd.detectChanges();
                        this.CorporateInformation.BlockedScreen = false;

                        if(changeEvent == 1)
                            this.GetBossesByPosition();
                    }))
                .subscribe((response) =>
                {
                    if(response.ResponseValue != null)
                        this.CorporateInformation.Salary = parseInt(response.ResponseValue.Data);    
                });
        }
    }

    HasEndDateCheckedChange(event:any)
    {
        this.CorporateInformation.HasEndDateChecked = event.checked;
        if(event.checked)
            this.CorporateInformation.EnableEndDate = true;
        else
            this.CorporateInformation.EnableEndDate = false;
    }

    HasBossCheckedChange(event:any)
    {
        this.CorporateInformation.HasBossChecked = event.checked;
        if(event.checked)
        {
            this.CorporateInformation.DisableBossDropdown = false;
            if(this.CorporateInformation.SelectedPosition.Value != 0)
                this.GetBossesByPosition();
        }
        else
            this.CorporateInformation.DisableBossDropdown = true;
    }

    SetRequestGetBossesByPosition()
    {
        let request: ApiRequestDto<WildCardDto> =
        {
            Data:
            {
                Data: this.CorporateInformation.SelectedPosition.Value.toString(),
            },
            LoggedUser:
            {
                User:"",
                Rol:""
            },
            Timestamp:1,
            Token:""
        }
        return request;    
    } 

    GetBossesByPosition()
    {
        this.CorporateInformation.BlockedScreen = true;
        this.employeeService.GetBossesByPosition(this.SetRequestGetBossesByPosition())
            .pipe(finalize(() => 
                    {
                        this.cd.detectChanges();
                        this.CorporateInformation.BlockedScreen = false;
                    }))
                .subscribe((response) =>
                {
                    if(response.ResponseValue != null)
                        this.CorporateInformation.BossList = response.ResponseValue;    
                });
    }

    private ValidateForm()
    {
        this.CorporateInformation.FormIsOk = true;
        this.ValidateArea();
        this.ValidatePosition();
        this.ValidateSeniority();
        this.ValidateStartDate();
        this.ValidateEndDate();
        this.ValidateBoss();
    }

    private ValidateArea()
    {
        if(this.CorporateInformation.SelectedArea.Value == 0)
        {
            this.CorporateInformation.ShowAreaError = true;
            this.CorporateInformation.FormIsOk = false;
        }
        else
        {
            this.CorporateInformation.ShowAreaError = false;
        }
    }

    private ValidatePosition()
    {
        if(this.CorporateInformation.SelectedPosition.Value == 0)
        {
            this.CorporateInformation.ShowPositionError = true;
            this.CorporateInformation.FormIsOk = false;
        }
        else
        {
            this.CorporateInformation.ShowPositionError = false;
        }
    }

    private ValidateSeniority()
    {
        if(this.CorporateInformation.SelectedSeniority.Value == 0)
        {
            this.CorporateInformation.ShowSeniorityError = true;
            this.CorporateInformation.FormIsOk = false;
        }
        else
        {
            this.CorporateInformation.ShowSeniorityError = false;
        }
    }

    private ValidateStartDate()
    {
        if(this.CorporateInformation.StartDate == "")   
        {
            this.CorporateInformation.ShowStartDateError = true;
            this.CorporateInformation.FormIsOk = false;
        }
        else        
        {
            this.CorporateInformation.ShowStartDateError = false;
        }
    }

    private ValidateEndDate()
    {
        if(this.CorporateInformation.HasEndDateChecked && this.CorporateInformation.EndDate == "")   
        {
            this.CorporateInformation.ShowEndDateError = true;
        }
        else        
        {
            this.CorporateInformation.ShowEndDateError = false;
            this.CorporateInformation.FormIsOk = true;
        }
    }

    private ValidateBoss()
    {
        if(this.CorporateInformation.HasBossChecked && this.CorporateInformation.SelectedBoss.Value == 0)   
        {
            this.CorporateInformation.ShowBossError = true;
            this.CorporateInformation.FormIsOk = false;
        }
        else        
        {
            this.CorporateInformation.ShowBossError = false;
        }
    }

    private SetAddCorporateInformationRequest()
    {
        let request: ApiRequestDto<AddCorporateInformationRequestDto> = 
        {
            LoggedUser:
            {
                User:"",
                Rol:""
            },
            Timestamp:1,
            Token:"",
            Data:{
                IdEmployee: this.IdEmployee,
                IdArea: this.CorporateInformation.SelectedArea.Value,
                IdPosition: this.CorporateInformation.SelectedPosition.Value,
                IdSeniority: this.CorporateInformation.SelectedSeniority.Value,
                Salary: this.CorporateInformation.Salary,
                StartDate: new Date(this.CorporateInformation.StartDate).toISOString().split('T')[0],
                EndDate: this.CorporateInformation.HasEndDateChecked ? new Date(this.CorporateInformation.EndDate).toISOString().split('T')[0] : null,
                IdBoss: this.CorporateInformation.HasBossChecked ? this.CorporateInformation.SelectedBoss.Value : null
            }
        };
        
        return request;
          
    }

    AddCorporateInformation()
    {
        this.ValidateForm();

        if(this.CorporateInformation.FormIsOk)
        {
            this.CorporateInformation.BlockedScreen = true;
            this.employeeService.AddCorporateInformation(this.SetAddCorporateInformationRequest())
                                .subscribe(
                                {
                                    next: (response) => 
                                    {
                                        this.cd.detectChanges();
                                        this.CorporateInformation.BlockedScreen = false;

                                        if (response.ExecutionOk)
                                        {
                                            this.messageService.add({
                                                                        severity: 'success',
                                                                        summary: 'Corporate Information Creation',
                                                                        detail: 'The corporate information has been created successfully',
                                                                        key: 'ce',
                                                                        life: 3000
                                                                    }); 
                                        }
                                        else
                                        {
                                            this.messageService.add({
                                                severity: 'error',
                                                summary: 'Corporate Information Creation',
                                                detail: response.Errors.join(', '),
                                                key: 'ce',
                                                life: 3000
                                            });
                                        }
                                        
                                    },
                                    error: err => {
                                        this.messageService.add({
                                            severity: 'error',
                                            summary: 'Corporate Information Creation',
                                            detail: 'There was an error creating the corporate information',
                                            key: 'ce',
                                            life: 3000
                                        });
                                    }
                                });
        }
    }
}
