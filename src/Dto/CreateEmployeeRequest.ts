export class CreateEmployeeRequest 
{
    Name: string = "";
    LastName: string = "";
    DocumentType: number = 0;
    DocumentValue: string = "";
    PersonalEmail: string = "";
    CorporateEmail: string = "";
    PersonalPhone: string = "";
    CorporatePhone: string = "";
    ContactAddress: string = "";
    DateOfBirth: string = "";
    ContactPersonName: string = "";
    ContactPersonPhone: string = "";
    Rol: number=0;
    ProfilePicture?: File;
}