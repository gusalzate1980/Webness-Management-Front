import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { PersonalInormationVm } from '../../../../ViewModels/Employee/PersonalInformationVm';
import { DatePickerModule } from "primeng/datepicker";

@Component({
  selector: 'app-personal-information',
  imports: [ButtonModule, InputTextModule, SelectModule, FormsModule, DatePickerModule],
  templateUrl: './personal-information.html',
  styleUrl: './personal-information.css',
})

export class PersonalInformation 
{
    PersonalInformation:PersonalInormationVm;


    constructor(private cd: ChangeDetectorRef) 
    {
        this.PersonalInformation = 
        {
            DocumentTypes:[],
            Name:"",
            SelectedDocumentType:
            {
                Label:"",
                Value:0
            },
            DocumentValue:"",
            ImagePreview:"images/default/people.png",
            LastName:"",
            Roles:[],
            SelectedRol:
            {
              Label:"",
              Value:0
            },
            SelectedFile: null
        };
        this.LoadDocumentTypes();
        this.LoadRoles();
    }

    private LoadRoles()
    {
        this.PersonalInformation.Roles = 
        [
            { Label: 'App Admin', Value: 1 },
            { Label: 'Client Admin', Value: 2 },
            { Label: 'Client Human Resources', Value: 3 },
            { Label: 'Client Tech Manager', Value: 4 },
            { Label: 'Engineer', Value: 5 },
            { Label: 'Financial', Value: 6 },
            { Label: 'Human Resources', Value: 6 },
            { Label: 'Key Account Manager', Value: 8 },
            { Label: 'Software Manager', Value: 9 }
        ];
    }

    OnFileSelected(event: any): void 
    {
        const input = event.target as HTMLInputElement;

        if (!input.files || input.files.length === 0) return;

        const file = input.files[0];

        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

        if (!allowedTypes.includes(file.type)) 
        {
            alert('Only PNG, JPG or JPEG files are allowed');
            input.value = '';   // reset
            return;
        }

        this.PersonalInformation.SelectedFile = file;

        const reader = new FileReader();

        reader.onload = () => 
        {
            this.PersonalInformation.ImagePreview = reader.result as string;
            this.cd.detectChanges();
        };

        reader.readAsDataURL(file);

        input.value = '';
    }

    private LoadDocumentTypes()
    {
        this.PersonalInformation.DocumentTypes = 
        [
            { Label: 'Cédula de Ciudadania', Value: 1 },
            { Label: 'Cédula de Extranjeria', Value: 2 },
            { Label: 'Pasaporte', Value: 3 }
        ];
    }
}