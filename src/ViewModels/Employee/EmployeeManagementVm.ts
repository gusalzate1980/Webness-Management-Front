import { GridSearchEmployeeVm } from "./GridSearchEmployeeVm";
import { SearchEmployeeVm } from "./SearchEmployeeVm";

export interface EmployeeManagementVm
{
    SearchEmployee: SearchEmployeeVm;
    GridSearchEmployee: GridSearchEmployeeVm[];
    SelectedEmployee: GridSearchEmployeeVm;
}