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

@Component({
  selector: 'app-corporate-information',
  imports: [SelectModule, FormsModule, DatePickerModule, ToggleSwitchModule, FileUploadModule, ButtonModule,InputTextModule, BlockUIModule, ProgressSpinnerModule],
  templateUrl: './corporate-information.html',
  styleUrl: './corporate-information.css',
})
export class CorporateInformation 
{
    @Input() IdEmployee:number = 0;
    CorporateInformation:CorporateInormationVm;
    
    constructor(private salaryPolicyService: SalaryPolicyService,
                private cd: ChangeDetectorRef)
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
            BlockedScreen: false
        };
    }

    SetPositions()
    {
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
    GetSalary()
    {
        this.CorporateInformation.BlockedScreen = true;
        this.salaryPolicyService.GetSalaryByPositionAndSeniority(this.SetRequestGetSalaryByPositionAndSeniority())
        .pipe(finalize(() => 
                {
                    this.cd.detectChanges();
                    this.CorporateInformation.BlockedScreen = false;
                }))
            .subscribe((response) =>
            {
                if(response.ResponseValue != null)
                    this.CorporateInformation.Salary = parseInt(response.ResponseValue.Data);    
            });
    }
}
