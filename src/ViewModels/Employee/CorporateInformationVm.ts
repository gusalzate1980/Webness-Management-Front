import { DropdownVm } from "../Common/DropdownVm";

export interface CorporateInormationVm
{
    //SelectedFile: File|null;
    
    Areas:DropdownVm[];
    SelectedArea:DropdownVm;

    Positions:DropdownVm[];
    SelectedPosition:DropdownVm;

    Seniorities:DropdownVm[];
    SelectedSeniority:DropdownVm;
}