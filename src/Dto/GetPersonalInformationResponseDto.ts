export interface GetPersonalInformationResponseDto
{
    Id: number;
    Name: string;
    LastName: string;
    DocumentType: number;
    DocumentValue: string;
    PersonalEmail: string;
    CorporateEmail: string;
    PersonalPhone: string;
    CorporatePhone: string;
    ContactAddress: string;
    DateOfBirth: string;
    ContactPerson: string;
    ContactPhone: string;
    IdRole: number;
    ProfilePicture: Uint8Array;
}