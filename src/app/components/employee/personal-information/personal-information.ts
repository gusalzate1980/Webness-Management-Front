import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { CreateEmployeeRequest } from '../../../../Dto/CreateEmployeeRequest';
import { EmployeeService } from '../../../../services/employee.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ApiRequestDto } from '../../../../Dto/ApiRequestDto';
import { BlockUI } from "primeng/blockui";
import { ProgressSpinner } from "primeng/progressspinner";
import { finalize } from 'rxjs';
import { GetPersonalInformationResponseDto } from '../../../../Dto/GetPersonalInformationResponseDto';
import { WildCardDto } from '../../../../Dto/WildCardDto';
import { ApiResponseDto } from '../../../../Dto/ApiResponseDto';

@Component({
  selector: 'app-personal-information',
  standalone:true,
  imports: [ButtonModule, InputTextModule, SelectModule, FormsModule, DatePickerModule, MessageModule, ToastModule, BlockUI, ProgressSpinner],
  providers:[MessageService],
  templateUrl: './personal-information.html',
  styleUrl: './personal-information.css',
})

export class PersonalInformation implements OnInit
{
    @Output() OnEmployeeCreated = new EventEmitter<number>();
    @Input() IdEmployee:number = 0;

    ViewModel:PersonalInormationVm;

    constructor(private cd: ChangeDetectorRef,
                private employeeService: EmployeeService,
                private messageService: MessageService) 
    {
        this.ViewModel = 
        {
            BlockedScreen:false,
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
            Roles:Lists.Roles.filter(x=>x.IsEmployeeRole),
            SelectedRole:
            {
              Name:"",
              Id:0,
              IsEmployeeRole:true
            },
            ShowErrorRole:false,
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
            ShowMandatoryProfilePicture:false,

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
            
            ButtonSaveText:"Create Employee"
        };
    }
    ngOnInit(): void 
    {
        if(this.IdEmployee > 0)
        {
            this.ViewModel.ButtonSaveText = "Update Employee";
            this.GetPersonalInformationByEmployee();
        }
    }

    SetPersonalInformationViewModel(response:ApiResponseDto<GetPersonalInformationResponseDto>)
    {
        if(response.ResponseValue != null)
        {
            let personal: GetPersonalInformationResponseDto =   response.ResponseValue;
            this.ViewModel.Name = personal.Name;
            this.ViewModel.ContactAddress = personal.ContactAddress;
            this.ViewModel.ContactPersonName = personal.ContactPerson;
            this.ViewModel.ContactPersonPhone = personal.ContactPhone;
            this.ViewModel.CorporateEmail = personal.CorporateEmail;
            this.ViewModel.CorporatePhone = personal.CorporatePhone != null ? personal.CorporatePhone : "";
            this.ViewModel.DateOfBirth = personal.DateOfBirth;
            this.ViewModel.DocumentValue = personal.DocumentValue;
            this.ViewModel.ImagePreview = `data:image/jpeg;base64,${response.ResponseValue?.ProfilePicture}`;
            this.ViewModel.LastName = personal.LastName;
            this.ViewModel.Name = personal.Name;
            this.ViewModel.PersonalEmail = personal.PersonalEmail;
            this.ViewModel.PersonalPhone = personal.PersonalPhone;
            this.ViewModel.SelectedDocumentType = this.ViewModel.DocumentTypes.filter(x=>x.Value == personal.DocumentType)[0];
            this.ViewModel.SelectedRole = this.ViewModel.Roles.filter(x=>x.Id == personal.IdRole)[0];
        }
        
    }

    GetPersonalInformationByEmployee()
    {
        this.ViewModel.BlockedScreen = true;
            this.employeeService.GetPersonalInformationByEmployee(this.SetRequestGetPersonalInformationByEmployee())
                                .pipe(finalize(() => 
                                    {
                                        this.ViewModel.BlockedScreen = false;
                                        this.cd.detectChanges();
                                    }))
                                .subscribe(
                                {
                                    next: (response) => 
                                    {
                                        if (response.ExecutionOk)
                                        {
                                            this.SetPersonalInformationViewModel(response)    
                                        }
                                        else
                                        {
                                            this.messageService.add({
                                                severity: 'error',
                                                summary: 'Employee Personal Information',
                                                detail: response.Errors.join(', '),
                                                key: 'ce',
                                                life: 3000
                                            });
                                        }
                                        
                                    },
                                    error: err => {
                                        this.messageService.add({
                                            severity: 'error',
                                            summary: 'Employee Creation',
                                            detail: 'There was an error creating the employee',
                                            key: 'ce',
                                            life: 3000
                                        });
                                    }
                                });    
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
        if(this.ViewModel.SelectedFile == null)
        {
            this.ViewModel.ShowMandatoryProfilePicture = true;
            this.ViewModel.FormIsOk= false;
        }
        else        
        {
            this.ViewModel.ShowMandatoryProfilePicture = false;
        }
    }

    private SetRequestObject(): ApiRequestDto<CreateEmployeeRequest>
    {
        let request: ApiRequestDto<CreateEmployeeRequest> = 
        {
            Data : 
            {
                ContactAddress : this.ViewModel.ContactAddress,
                ContactPersonName : this.ViewModel.ContactPersonName,
                ContactPersonPhone : this.ViewModel.ContactPersonPhone,
                CorporateEmail : this.ViewModel.CorporateEmail,
                CorporatePhone : this.ViewModel.CorporatePhone,
                DateOfBirth : new Date(this.ViewModel.DateOfBirth).toISOString().split('T')[0],
                DocumentType : this.ViewModel.SelectedDocumentType.Value,
                DocumentValue : this.ViewModel.DocumentValue,
                LastName : this.ViewModel.LastName,
                Name : this.ViewModel.Name,
                PersonalEmail : this.ViewModel.PersonalEmail,
                PersonalPhone : this.ViewModel.PersonalPhone,
                Role:this.ViewModel.SelectedRole.Id
            },
            LoggedUser: 
            {
                Role:"UN ROLE",
                User:"UN USER"
            },
            Timestamp:505050,
            Token:"UN TOKEN"
        };
        
        
        if (this.ViewModel.SelectedFile) 
        {
            request.Data.ProfilePicture = this.ViewModel.SelectedFile;
        }

        return request;
    }

    private SetRequestGetPersonalInformationByEmployee(): ApiRequestDto<WildCardDto>
    {
        let request: ApiRequestDto<WildCardDto> = 
        {
            Data : 
            {
                Data : this.IdEmployee.toString()
            },
            LoggedUser: 
            {
                Role:"UN ROLE",
                User:"UN USER"
            },
            Timestamp:505050,
            Token:"UN TOKEN"
        };
        
        return request;
    }

    SaveClicked() 
    {
        this.ViewModel.FormIsOk = true;
        this.Validations();
        
        if(this.ViewModel.FormIsOk)
        {
            this.ViewModel.BlockedScreen = true;
            this.employeeService.CreateEmployee(this.SetRequestObject())
                                .pipe(finalize(() => 
                                    {
                                        this.ViewModel.BlockedScreen = false;
                                        this.cd.detectChanges();
                                    }))
                                .subscribe(
                                {
                                    next: (response) => 
                                    {
                                        if (response.ExecutionOk)
                                        {
                                            this.messageService.add({
                                                                        severity: 'success',
                                                                        summary: 'Employee Creation',
                                                                        detail: 'The employee has been successfully',
                                                                        key: 'ce',
                                                                        life: 3000
                                                                    });
                                            this.IdEmployee = response.ResponseValue.IdPerson;
                                            this.ViewModel.ButtonSaveText = "Update Employee";
                                            this.OnEmployeeCreated.emit(response.ResponseValue);   
                                        }
                                        else
                                        {
                                            this.messageService.add({
                                                severity: 'error',
                                                summary: 'Employee Creation',
                                                detail: response.Errors.join(', '),
                                                key: 'ce',
                                                life: 3000
                                            });
                                        }
                                        
                                    },
                                    error: err => {
                                        this.messageService.add({
                                            severity: 'error',
                                            summary: 'Employee Creation',
                                            detail: 'There was an error creating the employee',
                                            key: 'ce',
                                            life: 3000
                                        });
                                    }
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
        if(this.ViewModel.SelectedRole.Id == 0)
        {
            this.ViewModel.ShowErrorRole = true;
            this.ViewModel.FormIsOk= false;
        }
        else
        {
            this.ViewModel.ShowErrorRole = false;
        }
    }
}