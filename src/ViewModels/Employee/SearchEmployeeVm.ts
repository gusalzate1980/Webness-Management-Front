import { ApiRequestDto } from "../../Dto/ApiRequestDto";
import { UserRolDto } from "../../Dto/UserRolDto";
import { DropdownVm } from "../Common/DropdownVm";

export interface SearchEmployeeVm
{
    Name: string;
    LastName: string;
    DocumentNumber: string;
    Areas:DropdownVm[];

    AllPositions:DropdownVm[];
    Positions:DropdownVm[];
    Roles:UserRolDto[];

    SelectedArea:DropdownVm;
    SelectedRol:UserRolDto;
    SelectedPosition:DropdownVm;

    BlockedScreen:boolean;
    
}