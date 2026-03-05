import { Component } from '@angular/core';
import { SelectModule } from "primeng/select";
import { FormsModule } from '@angular/forms';
import { CorporateInormationVm } from '../../../../ViewModels/Employee/CorporateInformationVm';
import { Lists } from '../../../../Constants/Lists';
import { DatePickerModule } from "primeng/datepicker";
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-corporate-information',
  imports: [SelectModule, FormsModule, DatePickerModule, ToggleSwitchModule, FileUploadModule, ButtonModule,InputTextModule],
  templateUrl: './corporate-information.html',
  styleUrl: './corporate-information.css',
})
export class CorporateInformation 
{
    CorporateInformation:CorporateInormationVm;

    constructor()
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
      };
    }

    ChangeArea()
    {
        this.CorporateInformation.Positions = Lists.AllPositions.filter(x=>x.Parent == this.CorporateInformation.SelectedArea.Value);       
    }
}
