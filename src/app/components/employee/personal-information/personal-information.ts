import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { PersonalInormationVm } from '../../../../ViewModels/Employee/PersonalInformationVm';
import { DatePickerModule } from "primeng/datepicker";
import { MessageModule } from "primeng/message";
import { Lists } from '../../../../Constants/Lists';
import { Validation } from '../../../../common/Validation';
import { CreateEmployee } from '../../../pages/employees/management/create-employee/create-employee';
import { CreateEmployeeRequest } from '../../../../Dto/CreateEmployeeRequest';
import { EmployeeService } from '../../../../services/employee.service';

@Component({
  selector: 'app-personal-information',
  standalone:true,
  imports: [ButtonModule, InputTextModule, SelectModule, FormsModule, DatePickerModule,MessageModule],
  templateUrl: './personal-information.html',
  styleUrl: './personal-information.css',
})

export class PersonalInformation 
{
    ViewModel:PersonalInormationVm;

    constructor(private cd: ChangeDetectorRef,
                private employeeService: EmployeeService) 
    {
        this.ViewModel = 
        {
            DocumentTypes:Lists.DocumentTypes,
            Name:"",
            SelectedDocumentType:
            {
                Label:"",
                Value:0
            },
            DocumentValue:"",
            ImagePreview:"images/default/people.png",
            LastName:"",
            Roles:Lists.Roles,
            SelectedRol:
            {
              Label:"",
              Value:0
            },
            ShowErrorRol:false,
            SelectedFile: null,

            ErrorsName:[],
            ShowErrorName:false,
            
            ErrorsLastName:[],
            ShowErrorLastName:false,

            ShowErrorDocumentType:false,

            ErrorsDocumentValue:[],
            ShowErrorDocumentValue:false,

            PersonalEmail:"",
            ShowErrorPersonalEmail:false,
            ErrorsPersonalEmail:[],

            CorporateEmail:"",
            ShowErrorCorporateEmail:false,
            ErrorsCorporateEmail:[],

            PersonalPhone:"",
            ShowErrorPersonalPhone:false,
            ErrorsPersonalPhone:[],

            ShowErrorProfilePicture:false,

            FormIsOk:true,

            CorporatePhone:"",
            ShowErrorCorporatePhone:false,
            ErrorsCorporatePhone:[],

            ContactAddress:"",
            ShowErrorContactAddress:false,
            ErrorsContactAddress:[],

            DateOfBirth:"",
            ShowErrorDateOfBirth:false,
            ErrorsDateOfBirth:[],

            ContactPersonName:"",
            ShowErrorContactPersonName:false,
            ErrorsContactPersonName:[],

            ContactPersonPhone:"",
            ShowErrorContactPersonPhone:false,
            ErrorsContactPersonPhone:[],


        };
    }

    OnFileSelected(event: any): void 
    {
        const input = event.target as HTMLInputElement;

        if (!input.files || input.files.length === 0) return;

        const file = input.files[0];

        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

        if (!allowedTypes.includes(file.type)) 
        {
            this.ViewModel.ShowErrorProfilePicture = true;
            input.value = '';   // reset
            return;
        }

        this.ViewModel.ShowErrorProfilePicture = false;

        this.ViewModel.SelectedFile = file;

        const reader = new FileReader();

        reader.onload = () => 
        {
            this.ViewModel.ImagePreview = reader.result as string;
            this.cd.detectChanges();
        };

        reader.readAsDataURL(file);

        input.value = '';
    }

    private Validations()
    {
        this.ValidateName();
        this.ValidateLastName();
        this.ValidateDocumentType();
        this.ValidateDocumentValue();
        this.ValidatePersonalEmail();
        this.ValidateCorporateEmail();
        this.ValidatePersonalPhone();
        this.ValidateCorporatePhone();
        this.ValidateContactAddress();
        this.ValidateDateOfBirth();
        this.ValidateContactPersonName();
        this.ValidateContactPersonPhone();
        this.ValidateRol();
    }

    private SetRequestObject(): CreateEmployeeRequest
    {
        let request: CreateEmployeeRequest = new CreateEmployeeRequest();
        request.ContactAddress = this.ViewModel.ContactAddress;
        request.ContactPersonName = this.ViewModel.ContactPersonName;
        request.ContactPersonPhone = this.ViewModel.ContactPersonPhone;
        request.CorporateEmail = this.ViewModel.CorporateEmail;
        request.CorporatePhone = this.ViewModel.CorporatePhone;
        request.DateOfBirth = this.ViewModel.DateOfBirth;
        request.DocumentType = this.ViewModel.SelectedDocumentType.Value;
        request.DocumentValue = this.ViewModel.DocumentValue;
        request.LastName = this.ViewModel.LastName;
        request.Name = this.ViewModel.Name;
        request.PersonalEmail = this.ViewModel.PersonalEmail;
        request.PersonalPhone = this.ViewModel.PersonalPhone;
        
        if (this.ViewModel.SelectedFile) 
        {
            request.ProfilePicture = this.ViewModel.SelectedFile;
        }

        request.Rol = this.ViewModel.SelectedRol.Value;

        return request;
    }

    SaveClicked() 
    {
        this.Validations();
        
        if(this.ViewModel.FormIsOk)
        {
            this.employeeService.CreateEmployee(this.SetRequestObject())
                                .subscribe(
                                {
                                    next: () => console.log('Empleado creado'),
                                    error: err => console.error(err)
                                });
        }    
    }

    private ValidateName()
    {
        let validator:Validation = new Validation();
        let ok = validator.IsvalidCustomizedString(this.ViewModel.Name,false,false,3,50,true,false,false);

        if(!ok)
        {
            this.ViewModel.ShowErrorName = true;
            this.ViewModel.ErrorsName = validator.Errors;
            this.ViewModel.FormIsOk= false;
        }
        else
        {
            this.ViewModel.ShowErrorName = false;
            this.ViewModel.ErrorsName = [];
        }
    }

    private ValidateLastName()
    {
        let validator:Validation = new Validation();
        let ok = validator.IsvalidCustomizedString(this.ViewModel.LastName,false,false,3,50,true,false,false);

        if(!ok)
        {
            this.ViewModel.ShowErrorLastName = true;
            this.ViewModel.ErrorsLastName = validator.Errors;
            this.ViewModel.FormIsOk= false;
        }
        else
        {
            this.ViewModel.ShowErrorLastName = false;
            this.ViewModel.ErrorsLastName = [];
        }
    }

    private ValidateDocumentType()
    {
        if(this.ViewModel.SelectedDocumentType.Value == 0)
        {
            this.ViewModel.ShowErrorDocumentType = true;
            this.ViewModel.FormIsOk= false;
        }
        else
        {
            this.ViewModel.ShowErrorDocumentType = false;
        }
    }

    private ValidateDocumentValue()
    {
        let validator:Validation = new Validation();
        let ok = validator.IsvalidCustomizedString(this.ViewModel.DocumentValue,true,false,6,10,false,false,false);

        if(!ok)
        {
            this.ViewModel.ShowErrorDocumentValue = true;
            this.ViewModel.ErrorsDocumentValue = validator.Errors;
            this.ViewModel.FormIsOk= false;
        }
        else
        {
            this.ViewModel.ShowErrorDocumentValue = false;
            this.ViewModel.ErrorsDocumentValue = [];
        }
    }

    private ValidatePersonalEmail()
    {
        let validator:Validation = new Validation();
        let ok = validator.IsvalidCustomizedString(this.ViewModel.PersonalEmail,false,true,0,0,false,false,false);

        if(!ok)
        {
            this.ViewModel.ShowErrorPersonalEmail = true;
            this.ViewModel.ErrorsPersonalEmail = validator.Errors;
            this.ViewModel.FormIsOk= false;
        }
        else
        {
            this.ViewModel.ShowErrorPersonalEmail = false;
            this.ViewModel.ErrorsPersonalEmail = [];
        }
    }

    private ValidateCorporateEmail()
    {
        let validator:Validation = new Validation();
        let ok = validator.IsvalidCustomizedString(this.ViewModel.CorporateEmail,false,true,0,0,false,false,false);

        if(!ok)
        {
            this.ViewModel.ShowErrorCorporateEmail = true;
            this.ViewModel.ErrorsCorporateEmail = validator.Errors;
            this.ViewModel.FormIsOk= false;
        }
        else
        {
            this.ViewModel.ShowErrorCorporateEmail = false;
            this.ViewModel.ErrorsCorporateEmail = [];
        }
    }

    private ValidatePersonalPhone()
    {
        let validator:Validation = new Validation();
        let ok = validator.IsvalidCustomizedString(this.ViewModel.PersonalPhone,true,false,10,10,false,false,false);

        if(!ok)
        {
            this.ViewModel.ShowErrorPersonalPhone = true;
            this.ViewModel.ErrorsPersonalPhone = validator.Errors;
            this.ViewModel.FormIsOk= false;
        }
        else
        {
            this.ViewModel.ShowErrorPersonalPhone = false;
            this.ViewModel.ErrorsPersonalPhone = [];
        }
    }

    private ValidateCorporatePhone()
    {
        if (this.ViewModel.CorporatePhone.length > 0)
        {
            let validator:Validation = new Validation();
            let ok = validator.IsvalidCustomizedString(this.ViewModel.CorporatePhone,true,false,10,10,false,false,false);

            if(!ok)
            {
                this.ViewModel.ShowErrorCorporatePhone = true;
                this.ViewModel.ErrorsCorporatePhone = validator.Errors;
                this.ViewModel.FormIsOk= false;
            }
            else
            {
                this.ViewModel.ShowErrorCorporatePhone = false;
                this.ViewModel.ErrorsCorporatePhone = [];
            }
        }
    }

    private ValidateContactAddress()
    {
        let validator:Validation = new Validation();
        let ok = validator.IsvalidCustomizedString(this.ViewModel.ContactAddress,false,false,10,100,true,true,true);

        if(!ok)
        {
            this.ViewModel.ShowErrorContactAddress = true;
            this.ViewModel.ErrorsContactAddress = validator.Errors;
            this.ViewModel.FormIsOk= false;
        }
        else
        {
            this.ViewModel.ShowErrorContactAddress = false;
            this.ViewModel.ErrorsContactAddress = [];
        }
    }

    private ValidateDateOfBirth()
    {
        if (this.ViewModel.DateOfBirth.length == 0)
        {
            this.ViewModel.ShowErrorDateOfBirth = true;
            this.ViewModel.ErrorsDateOfBirth.push("This field is mandatory");
            this.ViewModel.FormIsOk= false;    
        }
    }

    private ValidateContactPersonName()
    {
        let validator:Validation = new Validation();
        let ok = validator.IsvalidCustomizedString(this.ViewModel.ContactPersonName,false,false,3,50,true,false,false);

        if(!ok)
        {
            this.ViewModel.ShowErrorContactPersonName = true;
            this.ViewModel.ErrorsContactPersonName = validator.Errors;
            this.ViewModel.FormIsOk= false;
        }
        else
        {
            this.ViewModel.ShowErrorContactPersonName = false;
            this.ViewModel.ErrorsName = [];
        }
    }

    private ValidateContactPersonPhone()
    {
        let validator:Validation = new Validation();
        let ok = validator.IsvalidCustomizedString(this.ViewModel.ContactPersonPhone,true,false,10,10,false,false,false);

        if(!ok)
        {
            this.ViewModel.ShowErrorContactPersonPhone = true;
            this.ViewModel.ErrorsContactPersonPhone= validator.Errors;
            this.ViewModel.FormIsOk= false;
        }
        else
        {
            this.ViewModel.ShowErrorContactPersonPhone = false;
            this.ViewModel.ErrorsContactPersonPhone = [];
        }
    }

    private ValidateRol()
    {
        if(this.ViewModel.SelectedRol.Value == 0)
        {
            this.ViewModel.ShowErrorRol = true;
            this.ViewModel.FormIsOk= false;
        }
        else
        {
            this.ViewModel.ShowErrorRol = false;
        }
    }
}