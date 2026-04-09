import { DropdownVm } from "../Common/DropdownVm";

export interface CorporateInormationVm
{
    Areas:DropdownVm[];
    SelectedArea:DropdownVm;

    Positions:DropdownVm[];
    SelectedPosition:DropdownVm;

    Seniorities:DropdownVm[];
    SelectedSeniority:DropdownVm;

    Salary:number;

    BlockedScreen:boolean;

    StartDate:string;
    EnableEndDate:boolean;
    EndDate:string;

    HasEndDateChecked:boolean;
    HasBossChecked:boolean;

    DisableBossDropdown:boolean;

    BossList:DropdownVm[];
    SelectedBoss:DropdownVm;

    FormIsOk:boolean;

    ShowAreaError:boolean;
    ShowPositionError:boolean;
    ShowSeniorityError:boolean;
    ShowStartDateError:boolean;
    ShowEndDateError:boolean;
    ShowBossError:boolean;
}