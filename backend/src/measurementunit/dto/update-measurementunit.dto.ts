import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { CreateMeasurementunitDto } from './create-measurementunit.dto';

export class UpdateMeasurementunitDto extends PartialType(CreateMeasurementunitDto) {
    
    @Type (() => Number)
    @IsNumber ()
    id: number;
}
