import { CreateDirectionDto } from './create-direction.dto';
import { Company } from 'src/company/entities/company.entity';
import { Indicator } from 'src/indicator/entities/indicator.entity';
declare const UpdateDirectionDto_base: import("@nestjs/mapped-types").MappedType<import("@nestjs/mapped-types/dist/types/remove-fields-with-type.type").RemoveFieldsWithType<Partial<CreateDirectionDto>, Function>>;
export declare class UpdateDirectionDto extends UpdateDirectionDto_base {
    companies?: Company[];
    indicators?: Indicator[];
}
export {};
