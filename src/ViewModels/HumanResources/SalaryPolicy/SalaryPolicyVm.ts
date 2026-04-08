import { SalaryPolicyDto } from "../../../Dto/SalaryPolicyDto";

export interface SalaryPolicyVm
{
    Policies: SalaryPolicyDto;
    BlockedScreen: boolean;
}