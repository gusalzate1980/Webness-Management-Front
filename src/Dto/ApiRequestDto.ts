import { LoggedUserRequestDto } from "./LoggedUserRequestDto";

export interface ApiRequestDto<T>
{
    Timestamp: number;
    Token: string;
    LoggedUser: LoggedUserRequestDto;
    Data:T;
}