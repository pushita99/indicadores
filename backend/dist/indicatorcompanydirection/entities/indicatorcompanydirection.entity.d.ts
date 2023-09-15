import { Company } from "src/company/entities/company.entity";
import { Direction } from "src/direction/entities/direction.entity";
import { Indicator } from "src/indicator/entities/indicator.entity";
export declare class Indicatorcompanydirection {
    id: number;
    value: number;
    date: Date;
    indicator: Indicator;
    company: Company;
    direction: Direction;
}
