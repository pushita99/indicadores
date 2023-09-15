import { CreateIndicatorDto } from './create-indicator.dto';
declare const UpdateIndicatorDto_base: import("@nestjs/mapped-types").MappedType<import("@nestjs/mapped-types/dist/types/remove-fields-with-type.type").RemoveFieldsWithType<Partial<CreateIndicatorDto>, Function>>;
export declare class UpdateIndicatorDto extends UpdateIndicatorDto_base {
    id: number;
}
export {};
