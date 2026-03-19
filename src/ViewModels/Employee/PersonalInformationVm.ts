import { DropdownVm } from "../Common/DropdownVm";

export interface PersonalInormationVm
{
    SelectedFile: File|null;
    ShowErrorProfilePicture:boolean;
    
    ImagePreview: string;

    Name:string;
    ShowErrorName:boolean;
    ErrorsName:string[];

    LastName:string;
    ShowErrorLastName:boolean;
    ErrorsLastName:string[];
    
    DocumentTypes:DropdownVm[];
    ShowErrorDocumentType:boolean;
    SelectedDocumentType:DropdownVm;

    DocumentValue:string;
    ShowErrorDocumentValue:boolean;
    ErrorsDocumentValue:string[];

    PersonalEmail:string;
    ShowErrorPersonalEmail:boolean;
    ErrorsPersonalEmail:string[];

    CorporateEmail:string;
    ShowErrorCorporateEmail:boolean;
    ErrorsCorporateEmail:string[];

    PersonalPhone:string;
    ShowErrorPersonalPhone:boolean;
    ErrorsPersonalPhone:string[];

    CorporatePhone:string;
    ShowErrorCorporatePhone:boolean;
    ErrorsCorporatePhone:string[];

    ContactAddress:string;
    ShowErrorContactAddress:boolean;
    ErrorsContactAddress:string[];

    DateOfBirth:string;
    ShowErrorDateOfBirth:boolean;
    ErrorsDateOfBirth:string[];

    ContactPersonName:string;
    ShowErrorContactPersonName:boolean;
    ErrorsContactPersonName:string[];

    ContactPersonPhone:string;
    ShowErrorContactPersonPhone:boolean;
    ErrorsContactPersonPhone:string[];

    Roles:DropdownVm[];
    SelectedRol:DropdownVm;
    ShowErrorRol:boolean;

    FormIsOk:boolean;
}