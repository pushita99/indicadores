import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';


export class UpdateUserDto extends PartialType(CreateUserDto) {
    @Type (() => Number)
    @IsNumber ()
    id: number;
}
