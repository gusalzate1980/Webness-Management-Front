import { PolicyBySeniorityDto } from "./PolicyBySeniorityDto";
export interface PolicyByPositionDto
{
    IdPosition: number;
    Name:string;
    Seniorities: PolicyBySeniorityDto[];
}