import { Type } from "class-transformer";
import { IsBoolean, IsEmail, IsNumber, IsString, MinLength } from "class-validator";
import { IsNull } from "typeorm";

export class CreateUserDto {

    @IsString ()
    @MinLength (1)
    name: string;

    @IsString ()
    @MinLength (1)
    lastname: string;

    @IsString ()
    @MinLength (4)
    password: string

    @IsEmail ()
    email: string

    @IsString ()
    @MinLength (1)
    role: string
  
    @Type (() => Number)
    @IsNumber ()
    direction: number;
}
