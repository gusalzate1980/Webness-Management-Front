import { DropdownVm } from "../Common/DropdownVm";

export interface PersonalInormationVm
{
    SelectedFile: File|null;
    
    ImagePreview: string;

    Name:string;
    LastName:string;
    
    DocumentTypes:DropdownVm[];
    SelectedDocumentType:DropdownVm;
    DocumentValue:string;

    Roles:DropdownVm[];
    SelectedRol:DropdownVm;
}