import { PaginatorRequestDto } from "./PaginatorRequestDto";

export interface ListEmployeeRequestDto
{
    Name: string;
    LastName : string;
    DocumentNumber: string;
    Area: number;
    Position: number;
    Rol: number;
    Paginator: PaginatorRequestDto;
}