export interface AddCorporateInformationRequestDto
{
    IdEmployee: number;
    IdArea: number;
    IdPosition: number;
    IdSeniority: number;
    Salary: number;
    StartDate: string;
    EndDate: string | null;
    IdBoss: number | null;    
}