import { ApiRequestDto } from "../../Dto/ApiRequestDto";
import { DropdownVm } from "../Common/DropdownVm";

export interface SearchEmployeeVm
{
    Name: string;
    LastName: string;
    DocumentNumber: string;
    Areas:DropdownVm[];

    AllPositions:DropdownVm[];
    Positions:DropdownVm[];
    Roles:DropdownVm[];

    SelectedArea:DropdownVm;
    SelectedRol:DropdownVm;
    SelectedPosition:DropdownVm;

    BlockedScreen:boolean;
    
}