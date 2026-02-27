import { GridSearchEmployeeVm } from "./GridSearchEmployeeVm";
import { SearchEmployeeVm } from "./SearchEmployeeVm";

export class EmployeeManagementVm
{
    SearchEmployee: SearchEmployeeVm = new SearchEmployeeVm();
    GridSearchEmployee: GridSearchEmployeeVm[] = [];
    SelectedEmployee: GridSearchEmployeeVm | undefined;
}